import { useEffect, useState } from "react";

export function usePresence(isOpen: boolean, duration = 240) {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      const frame = window.requestAnimationFrame(() => setIsMounted(true));

      return () => window.cancelAnimationFrame(frame);
    }

    if (!isMounted) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      setIsMounted(false);
    }, reducedMotion ? 0 : duration);

    return () => window.clearTimeout(timeout);
  }, [duration, isMounted, isOpen]);

  return {
    isClosing: !isOpen && isMounted,
    isMounted: isOpen || isMounted,
  };
}
