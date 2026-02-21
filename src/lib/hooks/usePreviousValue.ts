import { useEffect, useRef } from "react";

const usePreviousValue = <TValue>(value?: TValue): TValue | undefined => {
  const prevValue = useRef<TValue | undefined>(undefined);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

export default usePreviousValue;
