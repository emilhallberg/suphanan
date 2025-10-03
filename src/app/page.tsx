"use client";
import { useEffect, useRef, useState } from "react";

import { Anton } from "next/font/google";
import Image from "next/image";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

function AutoFitText({
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center aspect-[3/2] min-w-[320px] max-w-[640px] mx-auto relative">
      <Image
        src="/foreground.png"
        alt="Foreground overlay"
        width={843}
        height={780}
        priority
        className="absolute right-[3vw] top-1/2 -translate-y-[10vh] lg:-translate-y-[5vh] max-h-[90%] max-w-[90%] w-auto z-10 pointer-events-none"
      />
      <div className="absolute top-20 left-0 right-0 flex flex-col justify-center z-0 px-[5vw]">
        <AutoFitText
          className={`${anton.className} text-[#ff6ec7] uppercase`}
          max={220}
        >
          SUPPIS
        </AutoFitText>
        <AutoFitText
          className={`${anton.className} text-[#ff6ec7] uppercase mt-5`}
          max={220}
        >
          30 ÅR
        </AutoFitText>
      </div>
      <div
        id="countdown"
        className="absolute bottom-10 w-full right-0 flex flex-col justify-center z-0 px-[5vw]"
      >
        <Countdown className={`${anton.className} text-[#ff6ec7]`} />
      </div>
    </div>
  );
}

function Countdown({ className = "" }: { className?: string }) {
  const [remaining, setRemaining] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const computeTarget = () => {
      const now = new Date();
      const year = now.getFullYear();
      const target = new Date(year, 11, 7, 0, 0, 0); // Dec is month 11
      if (target.getTime() <= now.getTime()) {
        return new Date(year + 1, 11, 7, 0, 0, 0);
      }
      return target;
    };

    const target = computeTarget();

    const fmt = (ms: number) => {
      const total = Math.max(0, Math.floor(ms / 1000));
      const days = Math.floor(total / 86400);
      const hours = Math.floor((total % 86400) / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = total % 60;
      return `${days} DAGAR  ${hours.toString().padStart(2, "0")} TIM  ${minutes
        .toString()
        .padStart(2, "0")} MIN  ${seconds.toString().padStart(2, "0")} SEK`;
    };

    const tick = () => {
      const now = new Date();
      const ms = target.getTime() - now.getTime();
      setRemaining(fmt(ms));
      if (!visible) setVisible(true);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <div className={`w-full ${className}`}>
      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms ease" }}
        className="w-full font-bold uppercase tracking-tight"
      >
        {remaining && (
          <AutoFitText className="leading-none" max={140}>
            {remaining}
          </AutoFitText>
        )}
      </div>
    </div>
  );
}
