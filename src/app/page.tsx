"use client";

import { Anton } from "next/font/google";
import { Homemade_Apple } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <div className="min-h-screen flex flex-col justify-start items-center h-svh w-svw max-w-[640px] mx-auto relative">
          <div className="absolute bottom-40 z-10">
            <Image
              src="/foreground.png"
              alt="Foreground overlay"
              width={774}
              height={780}
              priority
              className="z-10 px-10"
            />
            <div className="absolute -top-25 left-0 right-0 flex flex-col justify-center -z-1 px-[5vw] text-center">
              <p className="uppercase text-black font-bold">
                Let’s celebrate life and MY B-daY
              </p>
              <AutoFitText
                className={`${anton.className} text-accent uppercase`}
                max={240}
              >
                SUPPIS 30
              </AutoFitText>
            </div>
          </div>
          <div
            id="countdown"
            className="absolute bottom-22 w-full right-0 flex flex-col justify-center z-0 px-[5vw]"
          >
            <Countdown className={`${anton.className} text-accent`} />
          </div>
        </div>
        <div
          id="calendar"
          className="mt-16 min-h-screen flex flex-col justify-start items-center w-svw lg:w-[640px] mx-auto relative bg-transparent"
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
                    <div className="absolute pt-3 -right-12 rotate-20">
                      <Image
                        src="/flower.png"
                        alt="Flower"
                        height={100}
                        width={80}
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
                      {/* Use mask to tint the PNG with the accent color */}
                      <div
                        aria-hidden
                        className="w-[210px] h-[210px] bg-accent bg-[var(--color-accent)] [mask-image:url('/circle.png')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/circle.png')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
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
                      className={`${handwritten.className} absolute font-bold right-1 bottom-8 origin-bottom-right -rotate-45 -translate-y-12 text-accent text-xl tracking-normal pointer-events-none text-accent`}
                    >
                      Upptaget
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <section className="grid justify-center relative h-[50svh] grid-cols-2 max-w-[640px] self-center py-10 lg:gap-10">
        <div className="ml-5">
          <Link href="/note">
            <Image
              src="/note.png"
              alt="note"
              height={300}
              width={300}
              className="hover:scale-105 transition-all"
            />
          </Link>
        </div>
        <div className="transition-all">
          <Image
            src="/stripe.png"
            alt="stripe"
            height={400}
            width={250}
            className="pointer-events-none"
          />
        </div>
      </section>
      {/* Footer with Instagram link (sticky bottom) */}
      <footer className="w-full flex justify-center items-center py-8 flex-col text-center">
        <p className="text-black uppercase font-bold text-sm pb-3">
          FOLLOW MY B-DAY WEEK
        </p>
        <Link
          href="https://www.instagram.com/scuperwoman/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center hover:scale-105 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="84"
            height="84"
            aria-hidden="true"
            className="text-accent hover:opacity-80 transition-opacity"
          >
            <path
              fill="currentColor"
              d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
            />
          </svg>
        </Link>
      </footer>
    </div>
  );
}
