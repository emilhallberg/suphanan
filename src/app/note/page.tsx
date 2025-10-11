"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";

import { Anton, Homemade_Apple } from "next/font/google";
import Form from "next/form";

import { sendNote } from "@/app/note/actions";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const handwritten = Homemade_Apple({ weight: "400", subsets: ["latin"] });

const MAX = 150;
const BG_OPTIONS = ["#fff6e1", "#dff3f1", "#f7e2e8", "#f5ead4"] as const;

export default function NotePage() {
  const [message, setMessage] = useState("");
  const [bg, setBg] = useState<string>(BG_OPTIONS[0]);
  const [notes, setNotes] = useState<
    { message: string; background?: string; createdAt?: string }[]
  >([]);
  const [, action, pending] = useActionState<{ error: boolean }, FormData>(
    sendNote,
    { error: false },
  );

  const remaining = useMemo(() => Math.max(0, MAX - message.length), [message]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/notes", { cache: "no-store" });
        const j = await r.json();
        setNotes(Array.isArray(j.notes) ? j.notes : []);
      } catch {}
    };
    load();
  }, [pending]);

  return (
    <div className="min-h-screen w-svw lg:w-[640px] mx-auto px-[5vw] py-10">
      <h1
        className={`${anton.className} text-[44px] leading-tight text-accent mb-8`}
      >
        Skicka en grattishälsning!
      </h1>

      <Form
        ref={formRef}
        action={action}
        aria-busy={pending}
        className="grid gap-8"
      >
        {/* Note input */}
        <div>
          <div
            className="rounded-md border-2 border-neutral-700 bg-white/70 backdrop-blur-sm shadow-sm"
            style={{ background: bg }}
          >
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
              maxLength={MAX}
              placeholder="Skriv din anteckning här…"
              rows={6}
              className={`${handwritten.className} w-full resize-none outline-none border-0 bg-transparent placeholder-neutral-400 text-[26px] leading-[1.4] p-4 text-neutral-900`}
            />
          </div>
          <div className="mt-2 text-right">
            <span
              className={`${handwritten.className} text-neutral-700 text-[18px]`}
            >
              {MAX - remaining}/{MAX} tecken
            </span>
          </div>
        </div>

        {/* Background selector */}
        <div className="grid gap-3">
          <div className="flex items-center gap-5">
            {BG_OPTIONS.map((c, idx) => (
              <button
                key={c}
                type="button"
                onClick={() => setBg(c)}
                aria-label={`Välj bakgrund ${idx + 1}`}
                className="relative h-10 w-10 rounded-full border border-neutral-700"
                style={{ background: c }}
              >
                {bg === c && (
                  <span
                    className="absolute inset-0 grid place-items-center"
                    aria-hidden
                  >
                    <span className="h-7 w-7 rounded-full border-2 border-neutral-700" />
                    <span className="sr-only">Vald</span>
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Hidden field for background to reach the server action */}
          <input type="hidden" name="background" value={bg} />
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={pending || message.trim().length === 0}
            className={`${anton.className} w-full max-w-[520px] mx-auto block uppercase tracking-wider px-6 py-3 rounded-full border border-neutral-700 text-neutral-900 hover:bg-neutral-100 disabled:opacity-60`}
          >
            {pending ? "Skickar…" : "Skicka"}
          </button>
        </div>
      </Form>

      {/* List notes */}
      <div className="mt-12">
        <div className="grid gap-4">
          {notes.map((n, i) => (
            <div
              key={(n.createdAt ?? "") + i}
              className="rounded-md border border-neutral-700 bg-white/70 backdrop-blur-sm shadow-sm p-4"
              style={{ background: n.background || "#fff6e1" }}
            >
              <div
                className={`${handwritten.className} text-[22px] text-neutral-900 whitespace-pre-wrap`}
              >
                {n.message}
              </div>
              {n.createdAt && (
                <div className="mt-2 text-[12px] tracking-widest text-neutral-700">
                  {new Date(n.createdAt).toLocaleString("sv-SE")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
