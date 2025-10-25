"use client";

import { useEffect, useState } from "react";

import { Kranky } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Note = {
  id: string;
  text: string;
  color: string;
};

// Soft beige → gray → pink scale inspired by provided image
const NOTE_COLORS = ["#C70C12", "#871629", "#FFAEC8"];
const NOTE_ROTATIONS = [-4, 4, -2.5, 5, -1.5, 3.5, -3];
const NOTE_W = 224; // 56 * 4
const NOTE_H = 224;

const handwritten = Kranky({ weight: "400", subsets: ["latin"] });

export default function NotePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState(NOTE_COLORS[0]);

  // Restore state via API (server lists blobs)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/notes", { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const payload = (await res.json()) as Note[];
        setNotes(payload);
      } catch (e) {
        console.error("Failed to load notes", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addNote = async () => {
    if (!draft.trim()) return setOpen(false);
    const n: Note = {
      id: Math.random().toString(36).slice(2),
      text: draft.trim(),
      color: draftColor,
    };
    setNotes((prev) => [n, ...prev]);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n.id, text: n.text, color: n.color }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error("Failed to save note", e);
    }
    setDraft("");
    setDraftColor(NOTE_COLORS[0]);
    setOpen(false);
  };

  const clampToSixRows = (v: string) => {
    const lines = v.split(/\r?\n/);
    return lines.slice(0, 6).join("\n");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24">
      {/* Back button */}
      <button
        aria-label="Go back"
        onClick={() => router.back()}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center cursor-pointer"
        style={{ color: "var(--accent)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 12H4" />
          <path d="M12 19l-8-7 8-7" />
        </svg>
      </button>
      {/* Header */}
      <div className="mx-auto pt-15 flex justify-center">
        <Image
          src="/note-header.png"
          alt="frame"
          height={700}
          width={500}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Hint */}
      <div className="flex justify-center pb-10">
        <button
          aria-label="Leave a message"
          className="mx-auto mt-12 text-black/40 hover:text-black/60 transition-all hover:scale-105  flex gap-1 sm:gap-2 cursor-pointer whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          <Image
            src="/click.png"
            alt="frame"
            height={500}
            width={500}
            style={{ objectFit: "contain" }}
          />
        </button>
      </div>

      {/* Notes wall */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {loading && (
          <p className="col-span-full text-center text-black/50">
            Loading notes…
          </p>
        )}
        {!loading &&
          notes.map((n, idx) => (
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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-black/60 rotate-[-7deg] shadow-sm z-10" />

              {/* note */}
              <div
                className="absolute inset-0 shadow-lg p-4 z-0"
                style={{ background: n.color }}
              >
                <p
                  className={`h-full w-full whitespace-pre-wrap break-words text-white text-lg leading-tight ${handwritten.className} text-left overflow-hidden`}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: "vertical" as any,
                  }}
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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-black/60 rotate-[-6deg] shadow-sm z-10" />
              <div
                className="absolute inset-0 shadow-xl p-4"
                style={{ background: draftColor }}
              >
                <textarea
                  value={draft}
                  rows={8}
                  onChange={(e) => setDraft(clampToSixRows(e.target.value))}
                  placeholder="Write something..."
                  maxLength={180}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const lines = (e.currentTarget.value || "").split(
                        /\r?\n/,
                      );
                      if (lines.length >= 8) e.preventDefault();
                    }
                  }}
                  className={`h-full w-full placeholder:text-white/80 resize-none bg-transparent outline-none text-white text-lg leading-tight ${handwritten.className} text-left overflow-hidden`}
                />
              </div>
              <span className="absolute bottom-1 right-2 text-xs text-black/50 select-none">
                {draft.length}/180
              </span>
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
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
