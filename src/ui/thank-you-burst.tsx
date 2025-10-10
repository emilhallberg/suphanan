"use client";

import { useEffect, useMemo, useState } from "react";

import { Anton } from "next/font/google";
import Image from "next/image";

const anton = Anton({ weight: "400", subsets: ["latin"] });

type Sprite = {
  id: string;
  src: string;
  // percentage based positions around the text container
  top: number; // -30 to 130
  left: number; // -30 to 130
  size: number; // 40 to 90 px base
  rotate: number; // -20 to 20
  duration: number; // 1.2 to 2.4
  delay: number; // 0 to .6
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ThankYouBurst({
  show,
  onClose,
  lifetime = 7000,
}: {
  show: boolean;
  onClose?: () => void;
  lifetime?: number;
}) {
  const [visible, setVisible] = useState(show);

  useEffect(() => setVisible(show), [show]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, lifetime);
    return () => clearTimeout(t);
  }, [visible, lifetime, onClose]);

  const sprites = useMemo<Sprite[]>(() => {
    const sources = ["/cake.png", "/redbow.png", "/flower.png"];
    const count = 12;
    return Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      src: sources[Math.floor(Math.random() * sources.length)],
      top: rand(-30, 130),
      left: rand(-30, 130),
      size: rand(56, 110),
      rotate: rand(-18, 18),
      duration: rand(2.0, 3.5),
      delay: rand(0, 0.9),
    }));
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 grid place-items-center"
      aria-live="polite"
      role="status"
    >
      <div className="relative grid place-items-center text-center min-w-[70vw] min-h-[60vh]">
        <div
          className={`${anton.className} text-[64px] text-[#ff6ec7] drop-shadow-[0_6px_0_#00000020] select-none`}
          style={{ animation: "pop 600ms ease-out 1" }}
        >
          TACK DU ÄR BÄST!
        </div>

        {sprites.map((s) => (
          <div
            key={s.id}
            className="absolute will-change-transform"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              animation: `float ${s.duration}s ease-in-out ${s.delay}s both`,
            }}
          >
            <Image
              src={s.src}
              alt=""
              width={Math.round(s.size)}
              height={Math.round(s.size)}
              className="opacity-90"
              priority
            />
          </div>
        ))}

        <style jsx>{`
          @keyframes pop {
            0% {
              transform: scale(0.85);
              filter: blur(1px);
              opacity: 0;
            }
            60% {
              transform: scale(1.06);
              filter: blur(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes float {
            0% {
              transform: translate(-50%, -50%) var(--r, rotate(0deg)) scale(0.9);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            50% {
              transform: translate(calc(-50% + 14px), calc(-50% - 18px))
                var(--r, rotate(3deg)) scale(1.03);
            }
            100% {
              transform: translate(calc(-50% - 18px), calc(-50% + 24px))
                var(--r, rotate(-2deg)) scale(0.98);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
