"use client";

import { useEffect, useRef } from "react";

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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const fixedTextRef = useRef<HTMLDivElement | null>(null);
  const balloonRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const update = () => {
      tickingRef.current = false;
      const heroRect = el.getBoundingClientRect();
      const heroH = Math.max(heroRect.height, 1);
      const heroScroll = Math.min(Math.max(-heroRect.top, 0), heroH);

      // Fixed text parallax
      const textDy = -heroScroll * 0.25;
      const textEl = fixedTextRef.current;
      if (textEl) {
        textEl.style.willChange = "transform";
        textEl.style.transform = `translate(-50%, calc(-50% + ${textDy}px))`;
      }

      // Balloon parallax
      const bEl = balloonRef.current;
      const balloonDy = -heroScroll * 0.35;
      if (bEl) {
        bEl.style.willChange = "transform";
        bEl.style.transform = `translate3d(0, ${balloonDy}px, 0)`;
      }

      // Cards bounce -> fly-out
      const cEl = cardsRef.current;
      if (cEl) {
        const r = cEl.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const start = vh * 0.9;
        const denom = vh + r.height;
        let p = (start - r.top) / Math.max(denom, 1);
        p = Math.max(0, Math.min(1, p));

        const baseY = -80; // px
        let tx = 0;
        let ty = baseY;
        let rot = 0;
        let opacity = 1;

        const bounceEnd = 0.35;
        if (p <= bounceEnd) {
          const pb = p / Math.max(bounceEnd, 0.0001);
          const amp = 20;
          const wobble = 2.5;
          const decay = 1 - pb;
          ty = baseY + Math.sin(pb * Math.PI * 2) * amp * decay;
          rot = Math.sin(pb * Math.PI * 2) * wobble * decay;
        } else {
          const t = (p - bounceEnd) / (1 - bounceEnd);
          const ease = 1 - Math.pow(1 - t, 3);
          const vw = window.innerWidth || 800;
          tx = vw * 0.6 * ease;
          ty = baseY - 60 - 220 * ease;
          rot = 18 * ease;
          opacity = 1 - 0.9 * ease;
        }
        cEl.style.willChange = "transform, opacity";
        cEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
        cEl.style.opacity = `${opacity}`;
      }
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    // Initial update
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true } as any);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <div
          className="min-h-screen grid place-items-center h-svh max-w-[640px] mx-auto relative pb-24 px-4"
          style={{
            gridTemplateRows: "1fr",
          }}
          ref={heroRef}
        >
          <div className="w-full z-0">
            <div className="relative w-full">
              <div className="min-h-[clamp(72px,20vw,140px)]">
                <AutoFitText
                  className={`${anton.className} text-accent uppercase max-w-full`}
                  max={200}
                >
                  SUPPIS 30
                </AutoFitText>
              </div>
              <div
                id="fixed-text"
                ref={fixedTextRef}
                className="pointer-events-none absolute left-1/2 top-1/2 w-[82%] sm:w-[72%] z-[110]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <AutoFitText
                  className={`${handwritten.className} text-black font-bold text-center`}
                  max={140}
                  min={10}
                >
                  Let’s celebrate life and my birthday
                </AutoFitText>
              </div>
            </div>
            <div className="relative z-[100] w-full max-w-[640px] mx-auto">
              <Image
                src="/foreground.png"
                alt="Foreground overlay"
                priority
                height={600}
                width={600}
                className="w-full h-auto"
              />
              <div
                ref={balloonRef}
                className="absolute right-[15%] bottom-[5%] w-[22%] sm:w-[16%] md:w-[14%]"
                style={{ transform: "translate3d(0,0,0)" }}
                aria-hidden
              >
                <Image
                  src="/baloon.png"
                  alt="Balloon"
                  width={300}
                  height={300}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            <div
              id="countdown"
              className="w-full right-0 flex flex-col justify-center z-0 px-[5vw]"
            >
              <Countdown className={`${anton.className} text-black`} />
            </div>
          </div>
        </div>
        <section className="flex flex-col relative self-center lg:gap-10 px-4">
          <div className="mx-auto">
            <Link href="/note">
              <Image
                src="/mirror.png"
                alt="note"
                height={200}
                width={200}
                className="hover:scale-105 transition-all"
              />
            </Link>
          </div>
          <div
            id="cards"
            ref={cardsRef}
            className="mx-auto"
            style={{
              transform: "translate3d(0, -80px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src="/cards.png"
              alt="stripe"
              height={500}
              width={500}
              className="pointer-events-none"
            />
          </div>
          <div
            id="frame"
            className="origin-top mx-auto"
            style={{
              animation: "frame-hang 3.2s ease-in-out infinite",
              willChange: "transform",
            }}
          >
            <Image
              src="/frame.png"
              alt="stripe"
              height={200}
              width={200}
              className="pointer-events-none"
            />
          </div>
        </section>
        <div
          id="calendar"
          className="mt-16 min-h-screen flex flex-col justify-start items-center w-svw lg:w-[640px] mx-auto relative bg-transparent"
        >
          {/* Header */}
          <div className="text-center mb-6 mt-6 relative w-50 h-50 grid place-content-center">
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <Image
                src="/note-frame.png"
                alt="Balloon"
                fill
                priority={false}
              />
            </div>
            <h1 className={`${handwritten.className} mt-5 text-2xl`}>
              Birthday
            </h1>
            <h1 className={`${handwritten.className} mt-5 text-2xl`}>week</h1>
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
                  {day === 6 ? (
                    <div className="absolute top-10 -right-10">
                      <Image src="/mini.png" alt="bow" height={80} width={80} />
                    </div>
                  ) : null}
                  {/* Brush circle behind number */}
                  {circled ? (
                    <div className="absolute pt-3">
                      {/* Use mask to tint the PNG with the accent color */}
                      <div
                        aria-hidden
                        className="w-[210px] h-[210px] bg-[#C70C12] [mask-image:url('/circle.png')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/circle.png')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
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
                      className={`${handwritten.className} absolute font-bold right-1 bottom-8 origin-bottom-right -rotate-45 -translate-y-12 text-[#C70C12] text-xl tracking-normal pointer-events-none`}
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
      <section className="mx-auto py-6 relative overflow-hidden w-full grid place-content-center">
        <div
          id="vibe"
          className="flex gap-6 absolute top-[40%] left-0 -z-10 whitespace-nowrap"
          style={{ animation: "vibe-marquee 18s linear infinite" }}
        >
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex gap-6">
              {Array.from({ length: 20 }).map((_, index) => (
                <p
                  key={`${dup}-${index}`}
                  className={`${handwritten.className} text-sm sm:text-base md:text-lg`}
                >
                  vibes
                </p>
              ))}
            </div>
          ))}
        </div>

        <Image
          src="/vibes.png"
          alt="stripe"
          height={500}
          width={500}
          className="pointer-events-none"
        />
      </section>
      <style jsx global>{`
        @keyframes vibe-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes frame-hang {
          0% {
            transform-origin: 50% 0%;
            transform: rotate(-2deg) translateY(0px);
          }
          50% {
            transform-origin: 50% 0%;
            transform: rotate(2.75deg) translateY(1px);
          }
          100% {
            transform-origin: 50% 0%;
            transform: rotate(-2deg) translateY(0px);
          }
        }
      `}</style>
      {/* Footer with rotating circular text around Instagram logo */}
      <footer className="w-full flex justify-center items-center py-10 flex-col text-center">
        <div className="relative" style={{ width: 200, height: 200 }}>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="absolute inset-0 text-accent animate-spin"
            style={{ animationDuration: "12s" }}
            aria-hidden
          >
            <defs>
              <path
                id="circlePath"
                d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
              />
            </defs>
            <text
              className={`${handwritten.className} fill-black tracking-[0.15em]`}
              style={{ fontSize: 16 }}
            >
              <textPath href="#circlePath" startOffset="0%">
                Follow my birthday week
              </textPath>
            </text>
          </svg>
          <Link
            href="https://www.instagram.com/scuperwoman/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center hover:scale-105 transition-transform"
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
                d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346 3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
              />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
