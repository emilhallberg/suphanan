"use client";

import { useEffect, useMemo, useState } from "react";

import { Square_Peg } from "next/font/google";
import Image from "next/image";

type Note = {
  id: string;
  text: string;
  color: string;
};

const SLIDES = [
  { src: "/slideshow/1.jpg", alt: "1" },
  { src: "/slideshow/2.jpg", alt: "2" },
  { src: "/slideshow/3.jpg", alt: "3" },
  { src: "/slideshow/4.jpg", alt: "4" },
];

const NOTE_COLORS = ["#f8c9d1", "#ffeb99", "#c7f9cc", "#bde0fe", "#f1c0e8"];
const NOTE_ROTATIONS = [-4, 4, -2.5, 5, -1.5, 3.5, -3];
const NOTE_W = 224; // 56 * 4
const NOTE_H = 224;

const handwritten = Square_Peg({ weight: "400", subsets: ["latin"] });

export default function NotePage() {
  const [slide, setSlide] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState(NOTE_COLORS[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 300);
    return () => clearInterval(id);
  }, []);

  const addNote = () => {
    if (!draft.trim()) return setOpen(false);
    const n: Note = {
      id: Math.random().toString(36).slice(2),
      text: draft.trim(),
      color: draftColor,
    };
    setNotes((prev) => [n, ...prev]);
    setDraft("");
    setDraftColor(NOTE_COLORS[0]);
    setOpen(false);
  };

  const subtleHint = useMemo(
    () => (
      <button
        aria-label="Leave a message"
        className="mx-auto mt-12 text-sm text-black/40 hover:text-black/60 transition-colors"
        onClick={() => setOpen(true)}
      >
        click to leave a message
      </button>
    ),
    [],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24">
      {/* Header */}
      <div
        className="grid items-center justify-center gap-4 pt-10"
        style={{ gridTemplateColumns: "1fr max-content 1fr" }}
      >
        <h1
          className="text-right text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          B-DAY
        </h1>

        <div
          className="relative overflow-hidden ring-2 ring-white shadow-md h-18 w-15"
          style={{ aspectRatio: "2 / 3" }}
        >
          <Image
            key={SLIDES[slide].src}
            src={SLIDES[slide].src}
            alt={SLIDES[slide].alt}
            fill
            className="object-cover grayscale"
            priority
          />
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          WISHES
        </h1>
      </div>

      {/* Hint */}
      <div className="flex justify-center">{subtleHint}</div>

      {/* Notes wall */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {notes.map((n, idx) => (
          <div
            key={n.id}
            className="relative"
            style={{
              width: NOTE_W,
              height: NOTE_H,
              transform: `rotate(${NOTE_ROTATIONS[idx % NOTE_ROTATIONS.length]}deg)`,
            }}
          >
            {/* tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-[#FFAEC8] rotate-[-7deg] shadow-sm z-10" />

            {/* note */}
            <div
              className="absolute inset-0 rounded-md shadow-lg p-4 z-0"
              style={{ background: n.color }}
            >
              <p
                className={`h-full w-full whitespace-pre-wrap break-words text-black/80 text-2xl leading-tight ${handwritten.className} text-left overflow-auto`}
              >
                {n.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Note preview card */}
            <div
              className="relative mx-auto"
              style={{ width: NOTE_W, height: NOTE_H }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-[#FFAEC8] rotate-[-6deg] shadow-sm z-10" />
              <div
                className="absolute inset-0 rounded-md shadow-xl p-4"
                style={{ background: draftColor }}
              >
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write your wish..."
                  maxLength={150}
                  className={`h-full w-full resize-none bg-transparent outline-none placeholder-black/40 text-black/80 text-2xl leading-tight ${handwritten.className} text-left`}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c}
                    aria-label={`Choose ${c}`}
                    className="h-7 w-7 rounded-full ring-1 ring-black/10"
                    style={{
                      background: c,
                      outlineOffset: 2,
                      boxShadow:
                        draftColor === c ? "0 0 0 2px #00000040" : "none",
                    }}
                    onClick={() => setDraftColor(c)}
                  />
                ))}
              </div>

              <div className=" flex gap-2">
                <button
                  className="rounded-md bg-white/70 px-3 py-1 text-sm shadow hover:bg-white"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-black text-white px-3 py-1 text-sm shadow disabled:opacity-40"
                  onClick={addNote}
                  disabled={!draft.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
