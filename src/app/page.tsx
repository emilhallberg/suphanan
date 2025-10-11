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
              className={`${anton.className} text-accent uppercase`}
              max={220}
            >
              SUPPIS
            </AutoFitText>
            <AutoFitText
              className={`${anton.className} text-accent uppercase mt-5`}
              max={220}
            >
              30 ÅR
            </AutoFitText>
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
      <section className="w-full overflow-hidden py-10">
        {/* Auto-scrolling image gallery */}
        <div className="relative w-full">
          <div className="gallery-marquee w-svw lg:w-[640px] mx-auto">
            <div className="gallery-track">
              {[
                "/gallery/1.jpeg",
                "/gallery/2.jpeg",
                "/gallery/3.jpeg",
                "/gallery/4.jpeg",
                "/gallery/1.jpeg",
                "/gallery/2.jpeg",
                "/gallery/3.jpeg",
                "/gallery/4.jpeg",
                "/gallery/1.jpeg",
                "/gallery/2.jpeg",
                "/gallery/3.jpeg",
                "/gallery/4.jpeg",
              ].map((src, index) => {
                return (
                  <div key={`a-${src}-${index}`} className="polaroid">
                    <span className="photoWrap">
                      <Image
                        src={src}
                        alt="Polaroid photo"
                        fill
                        sizes="(max-width: 640px) 90vw, 640px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style jsx>{`
          .gallery-marquee {
            overflow: hidden;
            position: relative;
          }

          .gallery-track {
            display: flex;
            width: max-content;
            height: 100%;
            animation: gallery-scroll 60s linear infinite;
            will-change: transform;
          }

          .polaroid {
            height: 25vh;
            aspect-ratio: 2 / 2; /* Portrait Polaroid card shape */
            background: rgba(0, 0, 0, 0.9);
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.08);
            padding: 12px 6px 12px 6px; /* thicker bottom like Polaroid */
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .photoWrap {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #f1f1f1;
          }

          @keyframes gallery-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>
      <footer className="w-full flex justify-center items-center py-8">
        <Link
          href="https://www.instagram.com/scuperwoman/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="42"
            height="42"
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
