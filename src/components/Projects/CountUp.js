import React, { useEffect, useState } from "react";
import useInView from "./useInView";

function CountUp({ value, suffix = "", duration = 1400 }) {
  const [ref, inView] = useInView(0.4);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

export default CountUp;
