"use client";

import { Anton } from "next/font/google";
import Image from "next/image";

import AutoFitText from "@/ui/auto-fit-text";
import Countdown from "@/ui/countdown";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-start items-center aspect-[3/2] h-svh w-svw lg:w-[640px] mx-auto relative">
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
          className="absolute bottom-15 w-full right-0 flex flex-col justify-center z-0 px-[5vw]"
        >
          <Countdown className={`${anton.className} text-[#ff6ec7]`} />
        </div>
      </div>
      <div
        id="calendar"
        className="min-h-screen flex flex-col justify-start items-center aspect-[3/2] w-svw lg:w-[640px] mx-auto relative bg-transparent"
      >
        {/* Header */}
        <div className="w-full text-center mb-6 mt-6">
          <span
            className={`${anton.className} text-[#ff6ec7] text-3xl sm:text-4xl italic`}
          >
            Birthday Week Calendar
          </span>
        </div>
        <div className="w-full grid grid-cols-1 place-items-center pb-8">
          {(
            [
              { day: 1, dow: "SUNDAY" },
              { day: 2, dow: "MONDAY" },
              { day: 3, dow: "TUESDAY" },
              { day: 4, dow: "WEDNESDAY" },
              { day: 5, dow: "THURSDAY" },
              { day: 6, dow: "FRIDAY" },
              { day: 7, dow: "SATURDAY", circled: true },
            ] as const
          ).map(({ day, dow, circled, label }) => (
            <div
              key={day}
              className="w-50 flex flex-col items-stretch border-t last:border-b border-x"
            >
              {/* Day cell with internal header */}
              <div className="relative flex items-center justify-center h-55 sm:h-60 lg:h-56 border-neutral-700 overflow-hidden bg-transparent">
                {/* Header inside box: day of week + month */}
                <div className="absolute top-0 left-0 right-0 pt-2 text-center leading-3">
                  <div className="text-[12px] tracking-widest text-neutral-700">
                    {dow}
                  </div>
                  <div className="mx-auto my-2 w-full border-t border-neutral-700"></div>
                  <div className="text-[10px] tracking-widest text-neutral-700">
                    DECEMBER
                  </div>
                </div>
                {/* Brush circle behind number */}
                {circled ? (
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 m-auto w-[98%] h-[85%] z-0"
                    viewBox="0 0 100 70"
                  >
                    <g
                      fill="none"
                      stroke="#ff6ec7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* rounder base ellipse */}
                      <path
                        d="M8 35 C 20 10, 80 10, 92 35 C 80 60, 20 60, 8 35"
                        strokeWidth="8"
                        opacity="0.5"
                      />
                      {/* broken, varied strokes for brush texture */}
                      <path
                        d="M10 36 C 24 14, 76 14, 90 36"
                        strokeWidth="6"
                        opacity="0.9"
                        strokeDasharray="26 10 12 14"
                      />
                      <path
                        d="M12 33 C 28 16, 72 16, 88 33"
                        strokeWidth="3.5"
                        opacity="0.85"
                        strokeDasharray="12 8 8 12 16 10"
                      />
                      {/* tapered accents */}
                      <path
                        d="M12 36 Q 10 34, 13 30"
                        strokeWidth="6"
                        opacity="0.8"
                      />
                      <path
                        d="M88 34 Q 94 38, 90 46"
                        strokeWidth="6"
                        opacity="0.8"
                      />
                    </g>
                  </svg>
                ) : null}

                <span
                  className={`${anton.className} pt-8 text-8xl sm:text-8xl text-neutral-900 select-none relative z-10`}
                >
                  {day}
                </span>

                {label ? (
                  <span className="absolute bottom-2 left-2 rounded-full bg-neutral-900 text-neutral-50 text-xs px-2 py-1 tracking-wide">
                    {label}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
