"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoFitText({
  children,
  className = "",
  min = 12,
  max = 400,
}: {
  children: string;
  className?: string;
  min?: number;
  max?: number;
}) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(min);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let raf1 = 0;
    let raf2 = 0;

    const compute = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const available = parent.clientWidth;
      if (!available) return;

      let lo = min,
        hi = max,
        ans = min;
      for (let i = 0; i < 12; i++) {
        const mid = Math.floor((lo + hi) / 2);
        el.style.fontSize = `${mid}px`;
        const fits = el.scrollWidth <= available;
        if (fits) {
          ans = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      setFontSize(ans);

      // Reveal with fade after the size is applied and layout settles
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
    };

    const run = async () => {
      try {
        // Wait until web fonts are loaded to avoid reflow on font swap
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {}
      compute();
    };

    run();
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("resize", compute);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [min, max]);

  return (
    <div className="w-full">
      <span
        ref={spanRef}
        style={{
          fontSize,
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
        className={`block w-full whitespace-nowrap leading-none ${className}`}
      >
        {children}
      </span>
    </div>
  );
}
