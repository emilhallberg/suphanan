"use client";

import { useEffect, useState } from "react";

import AutoFitText from "./auto-fit-text";

export default function Countdown({ className = "" }: { className?: string }) {
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
