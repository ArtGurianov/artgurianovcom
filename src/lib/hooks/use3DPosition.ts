import { useEffect, useSyncExternalStore } from "react";

export interface Coordinates3D {
  x: number;
  y: number;
}

interface MotionMetaSnapshot {
  isInitialized: boolean;
  isMobile: boolean;
  isPermissionGranted: boolean;
  shouldRequestPermission: boolean;
}

interface InputSample extends Coordinates3D {
  t: number;
}

type InputSource = "mouse" | "gyro";

const MOBILE_REGEXP = /iPhone|iPad|iPod|Android/i;

const BACKSLIDE_DELAY_MS = 500;
const BACKSLIDE_FACTOR = 0.99;
const REST_THRESHOLD = 0.01;
const INPUT_SCALE = 2;
const MAX_POSITION_ABS = 1;

const REACTIVE_PUBLISH_INTERVAL_MS = 32;
const REACTIVE_MIN_DELTA = 0.001;

const ORIENTATION_SETTLE_MS = 150;
const GYRO_DEAD_ZONE_MIN = 0.008;
const GYRO_DEAD_ZONE_MAX = 0.02;
const GYRO_OUTLIER_DELTA = 0.5;
const GYRO_MAX_APPLIED_DELTA = 0.12;
const NOMINAL_FRAME_MS = 16.67;

const ZERO_COORDINATES: Coordinates3D = { x: 0, y: 0 };
const DEFAULT_META: MotionMetaSnapshot = {
  isInitialized: false,
  isMobile: false,
  isPermissionGranted: false,
  shouldRequestPermission: false,
};

const framePositionRef: { current: Coordinates3D } = {
  current: { ...ZERO_COORDINATES },
};

let reactiveSnapshot: Coordinates3D = { ...ZERO_COORDINATES };
let metaSnapshot: MotionMetaSnapshot = { ...DEFAULT_META };

const reactiveSubscribers = new Set<() => void>();
const metaSubscribers = new Set<() => void>();

let previousMouseInput: InputSample | null = null;
let previousGyroInput: InputSample | null = null;
let gyroNeutralInput: Coordinates3D | null = null;
let lastRawGyroInput: Coordinates3D | null = null;
let backslideTimeoutId: number | null = null;
let backslideAnimationFrameId: number | null = null;
let lastReactivePublishMs = 0;
let lastOrientationChangeAtMs = 0;
let isStoreInitialized = false;
const NEUTRAL_BLEND_FACTOR_AT_REST = 0.05;

const getNowMs = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const clamp = (value: number, minValue: number, maxValue: number) => {
  if (value < minValue) {
    return minValue;
  }

  if (value > maxValue) {
    return maxValue;
  }

  return value;
};

const clampToUnitRange = (value: number) => {
  if (value > MAX_POSITION_ABS) {
    return MAX_POSITION_ABS;
  }
  if (value < -MAX_POSITION_ABS) {
    return -MAX_POSITION_ABS;
  }
  return value;
};

const getScreenOrientationAngle = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  const angleFromScreenOrientation = window.screen?.orientation?.angle;
  if (typeof angleFromScreenOrientation === "number") {
    return angleFromScreenOrientation;
  }

  const angleFromLegacyOrientation = (
    window as Window & { orientation?: number }
  ).orientation;
  return typeof angleFromLegacyOrientation === "number"
    ? angleFromLegacyOrientation
    : 0;
};

const rotateVector = (x: number, y: number, degrees: number): Coordinates3D => {
  const radians = (degrees * Math.PI) / 180;
  const cosValue = Math.cos(radians);
  const sinValue = Math.sin(radians);

  return {
    x: x * cosValue - y * sinValue,
    y: x * sinValue + y * cosValue,
  };
};

const emitReactiveSnapshot = () => {
  reactiveSubscribers.forEach((listener) => {
    listener();
  });
};

const emitMetaSnapshot = () => {
  metaSubscribers.forEach((listener) => {
    listener();
  });
};

const updateMetaSnapshot = (partial: Partial<MotionMetaSnapshot>) => {
  const nextSnapshot: MotionMetaSnapshot = {
    ...metaSnapshot,
    ...partial,
  };

  const isChanged =
    nextSnapshot.isInitialized !== metaSnapshot.isInitialized ||
    nextSnapshot.isMobile !== metaSnapshot.isMobile ||
    nextSnapshot.isPermissionGranted !== metaSnapshot.isPermissionGranted ||
    nextSnapshot.shouldRequestPermission !== metaSnapshot.shouldRequestPermission;

  if (!isChanged) {
    return;
  }

  metaSnapshot = nextSnapshot;
  emitMetaSnapshot();
};

const publishReactiveSnapshot = (force = false) => {
  const now = getNowMs();

  const deltaX = Math.abs(framePositionRef.current.x - reactiveSnapshot.x);
  const deltaY = Math.abs(framePositionRef.current.y - reactiveSnapshot.y);

  if (!force && now - lastReactivePublishMs < REACTIVE_PUBLISH_INTERVAL_MS) {
    return;
  }

  if (!force && deltaX < REACTIVE_MIN_DELTA && deltaY < REACTIVE_MIN_DELTA) {
    return;
  }

  reactiveSnapshot = {
    x: framePositionRef.current.x,
    y: framePositionRef.current.y,
  };
  lastReactivePublishMs = now;
  emitReactiveSnapshot();
};

const clearBackslideAnimation = () => {
  if (backslideAnimationFrameId !== null) {
    window.cancelAnimationFrame(backslideAnimationFrameId);
    backslideAnimationFrameId = null;
  }
};

const runBackslideFrame = () => {
  const currentX = framePositionRef.current.x;
  const currentY = framePositionRef.current.y;

  const nextX = Math.abs(currentX) > REST_THRESHOLD ? currentX * BACKSLIDE_FACTOR : 0;
  const nextY = Math.abs(currentY) > REST_THRESHOLD ? currentY * BACKSLIDE_FACTOR : 0;

  if (nextX !== currentX || nextY !== currentY) {
    framePositionRef.current.x = nextX;
    framePositionRef.current.y = nextY;
    publishReactiveSnapshot();
  }

  if (nextX !== 0 || nextY !== 0) {
    backslideAnimationFrameId = window.requestAnimationFrame(runBackslideFrame);
    return;
  }

  if (metaSnapshot.isMobile && gyroNeutralInput && lastRawGyroInput) {
    gyroNeutralInput = {
      x:
        gyroNeutralInput.x +
        (lastRawGyroInput.x - gyroNeutralInput.x) * NEUTRAL_BLEND_FACTOR_AT_REST,
      y:
        gyroNeutralInput.y +
        (lastRawGyroInput.y - gyroNeutralInput.y) * NEUTRAL_BLEND_FACTOR_AT_REST,
    };
  }

  backslideAnimationFrameId = null;
  publishReactiveSnapshot(true);
};

const scheduleBackslide = () => {
  if (backslideTimeoutId !== null) {
    window.clearTimeout(backslideTimeoutId);
  }

  backslideTimeoutId = window.setTimeout(() => {
    backslideTimeoutId = null;
    clearBackslideAnimation();
    backslideAnimationFrameId = window.requestAnimationFrame(runBackslideFrame);
  }, BACKSLIDE_DELAY_MS);
};

const applyInputDelta = (
  x: number,
  y: number,
  source: InputSource,
  timestampMs = getNowMs()
) => {
  const rawNormalizedX = clampToUnitRange(x);
  const rawNormalizedY = clampToUnitRange(y);

  if (source === "gyro") {
    lastRawGyroInput = {
      x: rawNormalizedX,
      y: rawNormalizedY,
    };

    if (timestampMs - lastOrientationChangeAtMs <= ORIENTATION_SETTLE_MS) {
      return;
    }

    if (!gyroNeutralInput) {
      gyroNeutralInput = { x: rawNormalizedX, y: rawNormalizedY };
      previousGyroInput = null;
      return;
    }
  }

  const normalizedX =
    source === "gyro"
      ? clampToUnitRange(rawNormalizedX - (gyroNeutralInput?.x ?? 0))
      : rawNormalizedX;
  const normalizedY =
    source === "gyro"
      ? clampToUnitRange(rawNormalizedY - (gyroNeutralInput?.y ?? 0))
      : rawNormalizedY;

  const previousSample =
    source === "gyro" ? previousGyroInput : previousMouseInput;

  const updatePreviousSample = () => {
    const nextSample: InputSample = {
      x: normalizedX,
      y: normalizedY,
      t: timestampMs,
    };

    if (source === "gyro") {
      previousGyroInput = nextSample;
      return;
    }

    previousMouseInput = nextSample;
  };

  if (!previousSample) {
    updatePreviousSample();
    return;
  }

  let deltaX = normalizedX - previousSample.x;
  let deltaY = normalizedY - previousSample.y;

  if (source === "gyro") {
    const deltaTimeMs = clamp(timestampMs - previousSample.t, 8, 50);
    const rateScale = clamp(deltaTimeMs / NOMINAL_FRAME_MS, 0.8, 2);
    const deadZone = clamp(
      GYRO_DEAD_ZONE_MIN * rateScale,
      GYRO_DEAD_ZONE_MIN,
      GYRO_DEAD_ZONE_MAX
    );

    if (Math.abs(deltaX) < deadZone && Math.abs(deltaY) < deadZone) {
      updatePreviousSample();
      return;
    }

    if (
      Math.abs(deltaX) > GYRO_OUTLIER_DELTA ||
      Math.abs(deltaY) > GYRO_OUTLIER_DELTA
    ) {
      updatePreviousSample();
      return;
    }

    deltaX = clamp(deltaX, -GYRO_MAX_APPLIED_DELTA, GYRO_MAX_APPLIED_DELTA);
    deltaY = clamp(deltaY, -GYRO_MAX_APPLIED_DELTA, GYRO_MAX_APPLIED_DELTA);
  }

  updatePreviousSample();

  if (deltaX === 0 && deltaY === 0) {
    return;
  }

  const nextX = clampToUnitRange(framePositionRef.current.x + deltaX * INPUT_SCALE);
  const nextY = clampToUnitRange(framePositionRef.current.y + deltaY * INPUT_SCALE);

  const isChanged =
    nextX !== framePositionRef.current.x || nextY !== framePositionRef.current.y;

  if (isChanged) {
    framePositionRef.current.x = nextX;
    framePositionRef.current.y = nextY;
    publishReactiveSnapshot(true);
    clearBackslideAnimation();
    scheduleBackslide();
  }
};

const start3DPositionStore = () => {
  if (isStoreInitialized || typeof window === "undefined") {
    return;
  }

  isStoreInitialized = true;

  const isMobileDevice = MOBILE_REGEXP.test(window.navigator.userAgent);
  const requestPermissionCandidate = window.DeviceOrientationEvent as
    | (typeof window.DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      })
    | undefined;
  const shouldRequestPermission =
    typeof requestPermissionCandidate?.requestPermission === "function";

  updateMetaSnapshot({
    isInitialized: true,
    isMobile: isMobileDevice,
    shouldRequestPermission,
  });

  const handleOrientationChange = () => {
    lastOrientationChangeAtMs = getNowMs();
    lastRawGyroInput = null;
    gyroNeutralInput = null;
    previousGyroInput = null;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (metaSnapshot.isMobile) {
      return;
    }

    const x = (Math.round(event.clientX * 100) / 100 / window.innerWidth) * 2 - 1;
    const y = (Math.round(event.clientY * 100) / 100 / window.innerHeight) * 2 - 1;

    applyInputDelta(x, y, "mouse");
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    const hasOrientationData =
      event.alpha !== null || event.beta !== null || event.gamma !== null;
    if (hasOrientationData) {
      updateMetaSnapshot({ isPermissionGranted: true });
    }

    if (!metaSnapshot.isMobile) {
      return;
    }

    const rawX = (Math.round((event.gamma ?? 0) * 100) / 100) / 90;
    const rawY = (Math.round((event.beta ?? 0) * 100) / 100) / 180;
    const mappedCoordinates = rotateVector(
      rawX,
      rawY,
      -getScreenOrientationAngle()
    );
    applyInputDelta(mappedCoordinates.x, mappedCoordinates.y, "gyro", getNowMs());
  };

  const screenOrientation = window.screen?.orientation;
  if (screenOrientation?.addEventListener) {
    screenOrientation.addEventListener("change", handleOrientationChange);
  }
  window.addEventListener("orientationchange", handleOrientationChange, {
    passive: true,
  });

  handleOrientationChange();

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("deviceorientation", handleDeviceOrientation, {
    passive: true,
  });
};

const subscribeToReactiveSnapshot = (listener: () => void) => {
  start3DPositionStore();
  reactiveSubscribers.add(listener);
  return () => {
    reactiveSubscribers.delete(listener);
  };
};

const subscribeToMetaSnapshot = (listener: () => void) => {
  start3DPositionStore();
  metaSubscribers.add(listener);
  return () => {
    metaSubscribers.delete(listener);
  };
};

const getReactiveSnapshot = () => reactiveSnapshot;
const getMetaSnapshot = () => metaSnapshot;

const getServerReactiveSnapshot = () => ZERO_COORDINATES;
const getServerMetaSnapshot = () => DEFAULT_META;

export const use3DPositionReactive = (): Coordinates3D =>
  useSyncExternalStore(
    subscribeToReactiveSnapshot,
    getReactiveSnapshot,
    getServerReactiveSnapshot
  );

export const use3DMotionMeta = (): MotionMetaSnapshot =>
  useSyncExternalStore(
    subscribeToMetaSnapshot,
    getMetaSnapshot,
    getServerMetaSnapshot
  );

export const use3DPositionFrameRef = (): { current: Coordinates3D } => {
  useEffect(() => {
    start3DPositionStore();
  }, []);

  return framePositionRef;
};

export const use3DPosition = (): Coordinates3D => {
  return use3DPositionReactive();
};
