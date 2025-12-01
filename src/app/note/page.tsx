"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Roboto } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ThankYouBurst from "@/ui/thank-you-burst";

type Note = {
  id: string;
  text: string;
  color: string;
};

// Soft beige → gray → pink scale inspired by provided image
const NOTE_COLORS = ["#C70C12", "#871629", "#A62F2F", "#FFAEC8"];
const NOTE_ROTATIONS = [-4, 4, -2.5, 5, -1.5, 3.5, -3];
const NOTE_W = 224; // 56 * 4
const NOTE_H = 224;
const NOTE_TEXT_W = NOTE_W - 32; // p-4 padding (16px * 2)

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function NotePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState(NOTE_COLORS[0]);
  const [burst, setBurst] = useState(false);

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

  // Mount modal for fade-in/out
  useEffect(() => {
    if (open) {
      setModalVisible(true);
      return;
    }
    // delay unmount to allow fade-out animation
    const t = setTimeout(() => setModalVisible(false), 300);
    return () => clearTimeout(t);
  }, [open]);

  const addNote = async () => {
    if (!draft.trim()) return setOpen(false);
    const n: Note = {
      id: Math.random().toString(36).slice(2),
      text: draft.trim(),
      color: draftColor,
    };
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
    // Smooth close with fade before unmount and show burst above
    setBurst(true);
    setClosing(true);
    setTimeout(() => {
      // Update the wall after fade to avoid jank
      setNotes((prev) => [n, ...prev]);
      setOpen(false);
      setClosing(false);
    }, 320);
  };

  // Hidden measurement element for calculating line wrapping
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [maxChars, setMaxChars] = useState(180);

  const getLineCount = (text: string) => {
    const el = measureRef.current;
    if (!el) return 0;
    el.textContent = text || "";
    const styles = window.getComputedStyle(el);
    const lh = parseFloat(styles.lineHeight || "0") || 1;
    const lines = Math.max(1, Math.round(el.scrollHeight / lh));
    return lines;
  };

  const clampToSevenRows = (v: string) => {
    // First, hard-limit explicit newline rows
    let s = v.split(/\r?\n/).slice(0, 7).join("\n");
    // Then trim characters until wrapped line count ≤ 7
    while (s && getLineCount(s) > 7) s = s.slice(0, -1);
    return s;
  };

  const recomputeBudget = useCallback((base: string) => {
    // Find how many additional 'a' chars still fit within 7 lines
    const fits = (extra: number) => getLineCount(base + "a".repeat(extra)) <= 7;
    let low = 0;
    let high = 1;
    while (fits(high) && high < 2000) high *= 2;
    while (low < high) {
      const mid = Math.floor((low + high + 1) / 2);
      if (fits(mid)) low = mid;
      else high = mid - 1;
    }
    setMaxChars(base.length + low);
  }, []);

  // Recompute character budget when modal becomes visible or draft changes
  useEffect(() => {
    if (!modalVisible) return;
    recomputeBudget(draft);
    const onResize = () => recomputeBudget(draft);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [modalVisible, draft, recomputeBudget]);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24">
      {/* Success burst overlay for note send (uses heart image) */}
      <ThankYouBurst
        show={burst}
        onClose={() => setBurst(false)}
        sources={["/heart.png"]}
        message={null}
        count={14}
        spriteAspect={68 / 74}
      />
      {/* Back button */}
      <button
        aria-label="Go back"
        onClick={() => router.back()}
        className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105 transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 12H6" />
          <path d="M12 18l-6-6 6-6" />
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
          <div className="col-span-full grid place-items-center py-6">
            <div className="relative w-16 h-16">
              <Image
                src="/heart.png"
                alt="Loading"
                fill
                sizes="64px"
                className="object-contain animate-pulse"
                priority
              />
            </div>
          </div>
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
                  className={`h-full w-full whitespace-pre-wrap break-words text-white text-md leading-tight ${roboto.className} text-left overflow-hidden`}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 7,
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
      {(modalVisible || closing) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-250 ease-out ${
            open && !closing
              ? "bg-black/30 opacity-100"
              : "bg-black/30 opacity-0 pointer-events-none"
          }`}
          onClick={() => open && !closing && setOpen(false)}
          style={{ willChange: "opacity, transform" }}
        >
          <div
            className={`relative w-full max-w-lg transition-all duration-250 ease-out ${
              open && !closing
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[0.98]"
            }`}
            onClick={(e) => e.stopPropagation()}
            aria-hidden={!open}
            style={{ willChange: "opacity, transform" }}
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
                  rows={7}
                  onChange={(e) => {
                    const next = clampToSevenRows(e.target.value);
                    setDraft(next);
                    recomputeBudget(next);
                  }}
                  placeholder="Write something..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const lines = (e.currentTarget.value || "").split(
                        /\r?\n/,
                      );
                      if (lines.length >= 7) e.preventDefault();
                    }
                  }}
                  className={`h-full w-full placeholder:text-white/80 resize-none bg-transparent outline-none text-white text-lg leading-tight ${roboto.className} text-left overflow-hidden`}
                />
              </div>
              <span className="absolute bottom-1 right-2 text-xs text-black/50 select-none">
                {draft.length}/{maxChars}
              </span>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c}
                    aria-label={`Choose ${c}`}
                    className="h-7 w-7 rounded-full ring-1 ring-white"
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
                  onClick={() => {
                    const v = clampToSevenRows(draft);
                    setDraft(v);
                    recomputeBudget(v);
                    addNote();
                  }}
                  disabled={!draft.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hidden measurement element for line/character budgeting */}
      <div
        ref={measureRef}
        aria-hidden
        className={`${roboto.className} text-lg leading-tight whitespace-pre-wrap break-words fixed -z-10 opacity-0 pointer-events-none`}
        style={{
          width: NOTE_TEXT_W,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word" as any,
        }}
      />
    </div>
  );
}
