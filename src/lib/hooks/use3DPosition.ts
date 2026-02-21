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

const MOBILE_REGEXP = /iPhone|iPad|iPod|Android/i;

const BACKSLIDE_DELAY_MS = 500;
const BACKSLIDE_FACTOR = 0.99;
const REST_THRESHOLD = 0.01;
const INPUT_SCALE = 2;
const MAX_POSITION_ABS = 1;

const REACTIVE_PUBLISH_INTERVAL_MS = 32;
const REACTIVE_MIN_DELTA = 0.001;

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

let previousInput: Coordinates3D | null = null;
let backslideTimeoutId: number | null = null;
let backslideAnimationFrameId: number | null = null;
let lastReactivePublishMs = 0;
let isStoreInitialized = false;

const clampToUnitRange = (value: number) => {
  if (value > MAX_POSITION_ABS) {
    return MAX_POSITION_ABS;
  }
  if (value < -MAX_POSITION_ABS) {
    return -MAX_POSITION_ABS;
  }
  return value;
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
  const now =
    typeof performance !== "undefined" ? performance.now() : Date.now();

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

const applyInputDelta = (x: number, y: number) => {
  const normalizedX = clampToUnitRange(x);
  const normalizedY = clampToUnitRange(y);
  const prevX = previousInput ? previousInput.x : normalizedX;
  const prevY = previousInput ? previousInput.y : normalizedY;

  previousInput = { x: normalizedX, y: normalizedY };

  const deltaX = normalizedX - prevX;
  const deltaY = normalizedY - prevY;

  let nextX = framePositionRef.current.x + deltaX * INPUT_SCALE;
  let nextY = framePositionRef.current.y + deltaY * INPUT_SCALE;

  if (Math.abs(deltaX) > 1) {
    nextX = deltaX < 0 ? 1 : -1;
  }
  if (Math.abs(deltaY) > 1) {
    nextY = deltaY < 0 ? 1 : -1;
  }

  nextX = clampToUnitRange(nextX);
  nextY = clampToUnitRange(nextY);

  if (nextX !== framePositionRef.current.x || nextY !== framePositionRef.current.y) {
    framePositionRef.current.x = nextX;
    framePositionRef.current.y = nextY;
    publishReactiveSnapshot(true);
  }

  clearBackslideAnimation();
  scheduleBackslide();
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

  const handleMouseMove = (event: MouseEvent) => {
    if (metaSnapshot.isMobile) {
      return;
    }

    const x = (Math.round(event.clientX * 100) / 100 / window.innerWidth) * 2 - 1;
    const y = (Math.round(event.clientY * 100) / 100 / window.innerHeight) * 2 - 1;

    applyInputDelta(x, y);
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

    const x = (Math.round((event.gamma ?? 0) * 100) / 100) / 90;
    const y = (Math.round((event.beta ?? 0) * 100) / 100) / 180;
    applyInputDelta(x, y);
  };

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
