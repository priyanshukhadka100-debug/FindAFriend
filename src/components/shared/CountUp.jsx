import { useEffect, useRef, useState } from 'react';
import useReveal from '../../hooks/useReveal';

export default function CountUp({ end, duration = 1400, suffix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useReveal();
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * end));
              if (progress < 1) requestAnimationFrame(tick);
              else setValue(end);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref} className="stat-num">
      {value}
      {suffix}
    </span>
  );
}
