"use client";

import { Anton } from "next/font/google";
import { Homemade_Apple } from "next/font/google";
import Image from "next/image";

import AutoFitText from "@/ui/auto-fit-text";
import Countdown from "@/ui/countdown";
import SignUp, { OPTIONS } from "@/ui/sign-up";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const handwritten = Homemade_Apple({
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
        <div className="absolute top-10 left-0 right-0 flex flex-col justify-center z-0 px-[5vw]">
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
          className="absolute bottom-22 w-full right-0 flex flex-col justify-center z-0 px-[5vw]"
        >
          <Countdown className={`${anton.className} text-[#ff6ec7]`} />
        </div>
      </div>
      <div
        id="calendar"
        className="mt-16 min-h-screen flex flex-col justify-start items-center aspect-[3/2] w-svw lg:w-[640px] mx-auto relative bg-transparent"
      >
        {/* Header */}
        <div className="w-full text-center mb-6 mt-6">
          <AutoFitText className={`${handwritten.className} mt-5`} max={50}>
            Birthday
          </AutoFitText>
          <AutoFitText className={`${handwritten.className} mt-5`} max={50}>
            week
          </AutoFitText>
        </div>
        <SignUp />
        <div className="w-full grid grid-cols-1 place-items-center pb-8">
          {OPTIONS.map(({ day, dow, circled, occupied }) => (
            <div
              key={day}
              className="w-50 flex flex-col items-stretch border-t last:border-b border-x"
            >
              {/* Day cell with internal header */}
              <div className="relative flex items-center justify-center h-55 sm:h-60 lg:h-56 border-neutral-700 bg-transparent">
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
                {day === 1 ? (
                  <div className="absolute pt-3 -left-12">
                    <Image
                      src="/cake.png"
                      alt="cake"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : null}
                {day === 3 ? (
                  <div className="absolute pt-3 -right-15 rotate-20">
                    <Image
                      src="/flower.png"
                      alt="Flower"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : null}
                {day === 4 ? (
                  <div className="absolute pt-5 -left-13">
                    <Image
                      src="/redbow.png"
                      alt="bow"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : null}
                {/* Brush circle behind number */}
                {circled ? (
                  <div className="absolute pt-3">
                    <Image
                      src="/circle.png"
                      alt="Circle"
                      height={210}
                      width={210}
                    />
                  </div>
                ) : null}

                <span
                  className={`${anton.className} pt-8 text-8xl sm:text-8xl text-neutral-900 select-none relative z-10`}
                >
                  {day}
                </span>

                {occupied ? (
                  <span
                    className={`${handwritten.className} absolute font-bold right-1 bottom-8 origin-bottom-right -rotate-45 -translate-y-12 text-neutral-900 text-xl tracking-normal pointer-events-none`}
                    style={{ color: "#ff6ec7" }}
                  >
                    Upptaget
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
