"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

import { Anton } from "next/font/google";
import Image from "next/image";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

type Player = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  alive: boolean;
};

const PLAYER_COUNT = 22;

const createPlayers = () =>
  Array.from({ length: PLAYER_COUNT }, (_, index) => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    const size = 58 + (index % 5) * 9;
    const speed = 1.15 + (index % 7) * 0.18;
    const directionX = index % 2 === 0 ? 1 : -1;
    const directionY = index % 3 === 0 ? 1 : -1;

    return {
      id: index,
      x: 24 + column * 86,
      y: 28 + row * 98,
      vx: speed * directionX,
      vy: (speed + 0.32) * directionY,
      size,
      rotation: (index % 9) * 7 - 28,
      alive: true,
    };
  });

const splitTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);

  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    centiseconds: Math.floor((milliseconds % 1000) / 10),
  };
};

function NumberFlowTime({
  milliseconds,
  className,
}: {
  milliseconds: number;
  className?: string;
}) {
  const { minutes, seconds, centiseconds } = splitTime(milliseconds);

  return (
    <NumberFlowGroup>
      <span className={className}>
        <NumberFlow value={minutes} willChange />
        <span>:</span>
        <NumberFlow
          value={seconds}
          format={{ minimumIntegerDigits: 2, useGrouping: false }}
          willChange
        />
        <span>.</span>
        <NumberFlow
          value={centiseconds}
          format={{ minimumIntegerDigits: 2, useGrouping: false }}
          willChange
        />
      </span>
    </NumberFlowGroup>
  );
}

function BackgroundTimer({
  finished,
  getElapsed,
  isRunning,
  started,
}: {
  finished: boolean;
  getElapsed: () => number;
  isRunning: () => boolean;
  started: boolean;
}) {
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let lastTick = 0;

    const tick = (now: number) => {
      if (isRunning()) {
        if (now - lastTick >= 80) {
          lastTick = now;
          setMilliseconds(getElapsed());
        }
      } else {
        setMilliseconds(getElapsed());
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [getElapsed, isRunning]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 grid select-none place-items-center transition-[background-color,opacity,transform,color] duration-700 ease-out [&_*]:pointer-events-none ${
        finished
          ? "z-40 translate-y-[13vh] text-[#e0cc5f]"
          : "z-0 text-[#d78e9e]/35"
      }`}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3">
        <NumberFlowTime
          milliseconds={milliseconds}
          className={`flex items-center font-mono transition-[font-size,letter-spacing,filter] duration-700 ease-out ${
            finished
              ? `${anton.className} text-[clamp(34px,8vw,92px)]`
              : "text-[clamp(48px,14vw,170px)]"
          }`}
        />
        <p
          className={`${anton.className} text-center text-[clamp(22px,5vw,56px)] uppercase tracking-wide text-[#d78e9e]/35 transition-all duration-500 ${
            started || finished
              ? "-translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Klicka bort alla Suppis
        </p>
      </div>
    </div>
  );
}

export default function GamePage() {
  const initialPlayers = useMemo(() => createPlayers(), []);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const playerRefs = useRef(new Map<number, HTMLButtonElement>());
  const playersRef = useRef(initialPlayers.map((player) => ({ ...player })));
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const finalElapsedRef = useRef(0);
  const remainingRef = useRef(PLAYER_COUNT);

  const getElapsed = useCallback(() => {
    if (finishedRef.current) return finalElapsedRef.current;
    if (!startedRef.current || startTimeRef.current === null) return 0;

    return performance.now() - startTimeRef.current;
  }, []);

  const isTimerRunning = useCallback(
    () => startedRef.current && !finishedRef.current,
    [],
  );

  const startTimer = useCallback(() => {
    if (startedRef.current || finishedRef.current) return;
    startedRef.current = true;
    startTimeRef.current = performance.now();
    setStarted(true);
  }, []);

  const createBubblePop = useCallback((player: Player) => {
    const arena = arenaRef.current;
    if (!arena) return;

    const pop = document.createElement("span");
    pop.className = "bubble-pop";
    pop.style.left = `${player.x + player.size / 2}px`;
    pop.style.top = `${player.y + player.size / 2}px`;
    pop.style.width = `${player.size * 1.45}px`;
    pop.style.height = `${player.size * 1.45}px`;
    arena.appendChild(pop);
    window.setTimeout(() => pop.remove(), 560);
  }, []);

  const removePlayer = useCallback(
    (id: number) => {
      startTimer();

      const player = playersRef.current.find((item) => item.id === id);
      const element = playerRefs.current.get(id);
      if (!element || element.dataset.removed === "true") return;

      if (player) {
        player.alive = false;
        createBubblePop(player);
      }

      element.dataset.removed = "true";
      element.style.opacity = "0";
      element.style.pointerEvents = "none";
      remainingRef.current -= 1;

      if (remainingRef.current === 0 && !finishedRef.current) {
        const now = performance.now();
        const start = startTimeRef.current ?? now;
        const elapsed = now - start;

        finishedRef.current = true;
        finalElapsedRef.current = elapsed;
        setFinished(true);
      }
    },
    [createBubblePop, startTimer],
  );

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const arena = arenaRef.current;
      if (arena) {
        const rect = arena.getBoundingClientRect();
        const delta = Math.min((now - lastTime) / 16.67, 2);
        lastTime = now;

        for (const player of playersRef.current) {
          if (!player.alive) continue;

          player.x += player.vx * delta;
          player.y += player.vy * delta;

          const maxX = Math.max(rect.width - player.size, 0);
          const maxY = Math.max(rect.height - player.size, 0);

          if (player.x <= 0 || player.x >= maxX) {
            player.vx *= -1;
            player.x = Math.min(Math.max(player.x, 0), maxX);
          }

          if (player.y <= 0 || player.y >= maxY) {
            player.vy *= -1;
            player.y = Math.min(Math.max(player.y, 0), maxY);
          }

          const element = playerRefs.current.get(player.id);
          if (element) {
            element.style.transform = `translate3d(${player.x}px, ${player.y}px, 0) rotate(${player.rotation}deg)`;
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main
      className={`game-cursor min-h-svh overflow-hidden bg-[#fff2a8] ${anton.className}`}
      onPointerDown={startTimer}
    >
      <section
        ref={arenaRef}
        className="relative isolate h-svh w-full overflow-hidden border-[10px] border-[#e0cc5f] bg-[#fff2a8] sm:border-[16px]"
        aria-label="Klicka bort alla bilder"
      >
        <BackgroundTimer
          finished={finished}
          getElapsed={getElapsed}
          isRunning={isTimerRunning}
          started={started}
        />

        {initialPlayers.map((player) => (
          <button
            key={player.id}
            ref={(element) => {
              if (element) {
                playerRefs.current.set(player.id, element);
              } else {
                playerRefs.current.delete(player.id);
              }
            }}
            type="button"
            className="game-cursor absolute left-0 top-0 z-10 touch-none rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#c8132f]/50"
            style={{
              height: player.size,
              width: player.size,
              transform: `translate3d(${player.x}px, ${player.y}px, 0) rotate(${player.rotation}deg)`,
              contain: "layout paint style",
              willChange: "transform",
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              event.preventDefault();
              removePlayer(player.id);
            }}
            aria-label="Ta bort bilden"
          >
            <Image
              src="/game.png"
              alt=""
              fill
              sizes="96px"
              className="pointer-events-none select-none rounded-full object-cover shadow-[0_10px_22px_rgba(198,19,47,0.28)]"
              priority={player.id < 8}
            />
          </button>
        ))}

        {finished ? (
          <div className="completion-overlay absolute inset-0 z-30 grid place-items-center bg-[#fff2a8]/82 px-5 text-center backdrop-blur-[2px]">
            <div className="completion-card max-w-[760px] -translate-y-[7vh]">
              <p
                className={`${anton.className} text-balance text-4xl font-normal uppercase leading-tight tracking-wide text-[#e0cc5f] sm:text-7xl`}
              >
                REBECKA, VILL DU BLI MIN TÄRNA?
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <style jsx global>{`
        .game-cursor,
        .game-cursor * {
          cursor:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'%3E%3Cpath fill='%23d61131' stroke='white' stroke-width='2' d='M21 36S5 26.5 5 14.5C5 8.8 8.7 5 13.8 5c3.1 0 5.5 1.7 7.2 4.1C22.7 6.7 25.1 5 28.2 5 33.3 5 37 8.8 37 14.5 37 26.5 21 36 21 36Z'/%3E%3C/svg%3E")
              21 18,
            pointer;
        }

        .completion-overlay {
          animation: completion-fade 700ms ease-out both;
        }

        .completion-card {
          animation: completion-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .bubble-pop {
          position: absolute;
          z-index: 20;
          border: 2px solid rgba(255, 255, 255, 0.92);
          border-radius: 9999px;
          background:
            radial-gradient(
              circle at 30% 25%,
              rgba(255, 255, 255, 0.95) 0 7%,
              transparent 8%
            ),
            radial-gradient(
              circle at 62% 70%,
              rgba(215, 142, 158, 0.28) 0 8%,
              transparent 9%
            ),
            rgba(255, 255, 255, 0.16);
          box-shadow:
            18px -14px 0 -7px rgba(255, 255, 255, 0.9),
            -22px 10px 0 -8px rgba(255, 255, 255, 0.78),
            6px 24px 0 -9px rgba(215, 142, 158, 0.5),
            -4px -28px 0 -10px rgba(255, 255, 255, 0.76);
          pointer-events: none;
          transform: translate3d(-50%, -50%, 0) scale(0.24);
          animation: bubble-burst 540ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .bubble-pop::before,
        .bubble-pop::after {
          position: absolute;
          inset: 50%;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          content: "";
        }

        .bubble-pop::before {
          box-shadow:
            34px 2px 0 -2px rgba(255, 255, 255, 0.85),
            -30px -8px 0 -3px rgba(255, 255, 255, 0.72),
            12px -34px 0 -3px rgba(215, 142, 158, 0.48),
            -10px 32px 0 -4px rgba(255, 255, 255, 0.78);
          animation: bubble-sparks-a 540ms ease-out forwards;
        }

        .bubble-pop::after {
          box-shadow:
            28px 24px 0 -3px rgba(255, 255, 255, 0.8),
            -34px 20px 0 -4px rgba(215, 142, 158, 0.42),
            4px -30px 0 -4px rgba(255, 255, 255, 0.72),
            -22px -24px 0 -3px rgba(255, 255, 255, 0.82);
          animation: bubble-sparks-b 540ms ease-out forwards;
        }

        @keyframes completion-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes completion-rise {
          from {
            opacity: 0;
            transform: translate3d(0, 28px, 0) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate3d(0, -7vh, 0) scale(1);
          }
        }

        @keyframes bubble-burst {
          0% {
            opacity: 0.95;
            transform: translate3d(-50%, -50%, 0) scale(0.2);
          }
          48% {
            opacity: 0.78;
            transform: translate3d(-50%, -50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(-50%, -50%, 0) scale(1.55);
          }
        }

        @keyframes bubble-sparks-a {
          to {
            opacity: 0;
            transform: translate3d(18px, -12px, 0) scale(0.5);
          }
        }

        @keyframes bubble-sparks-b {
          to {
            opacity: 0;
            transform: translate3d(-14px, 16px, 0) scale(0.45);
          }
        }
      `}</style>
    </main>
  );
}
