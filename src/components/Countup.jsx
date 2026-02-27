import { useEffect, useRef, useState } from "react";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false); // ref to track if animation has run
  const ref = useRef(null);

  useEffect(() => {
    const animate = () => {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animate();
          animatedRef.current = true; // mark as animated
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]); // effect re-runs only when end or duration changes

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
