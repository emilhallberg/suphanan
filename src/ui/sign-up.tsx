"use client";

import { useActionState, useState } from "react";

import { Anton, Homemade_Apple } from "next/font/google";
import Form from "next/form";

import { signUp } from "@/ui/actions";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const handwritten = Homemade_Apple({ weight: "400", subsets: ["latin"] });

export const OPTIONS = [
  { day: 1, dow: "MÅNDAG" },
  { day: 2, dow: "TISDAG" },
  { day: 3, dow: "ONSDAG" },
  { day: 4, dow: "TORSDAG" },
  { day: 5, dow: "FREDAG", occupied: true },
  { day: 6, dow: "LÖRDAG" },
  { day: 7, dow: "SÖNDAG", circled: true },
] satisfies {
  day: number;
  dow: string;
  circled?: boolean;
  occupied?: boolean;
}[];

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<{ error: boolean }, FormData>(
    async (state, payload) => {
      const res = await signUp(state, payload);

      if (res.error) {
        setOpen(true);
        return state;
      }

      setOpen(false);
      return state;
    },
    { error: false },
  );

  return (
    <div className="pt-6 pb-12 grid place-items-center">
      {/* Open form button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${anton.className} uppercase tracking-wider text-[18px] px-6 py-3 border border-neutral-700 rounded-sm text-neutral-900 hover:bg-neutral-100 transition-colors`}
          style={{ color: "#ff6ec7" }}
        >
          Anmäl dig här!
        </button>
      )}

      {/* Animated form container (always mounted for smooth open/close) */}
      <div
        aria-hidden={!open}
        className={
          `${
            open
              ? "grid-rows-[1fr] opacity-100 scale-100 mt-4"
              : "grid-rows-[0fr] opacity-0 scale-[0.98] pointer-events-none"
          } grid transition-all duration-300 ease-out w-[min(92vw,520px)]`
        }
      >
        <div className="min-h-0 overflow-hidden">
          <Form
            action={action}
            aria-busy={pending}
            className="border border-neutral-700 rounded-md bg-white/70 backdrop-blur-sm shadow-sm p-4"
          >
            <div className="flex items-start justify-between">
              <div
                className={`${handwritten.className} text-[28px] leading-none`}
              >
                Anmälan
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-neutral-700 hover:text-neutral-900"
                aria-label="Stäng"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-4">
              <label className="block text-[12px] tracking-widest text-neutral-700">
                Namn
                <input
                  type="text"
                  name="name"
                  required
                  disabled={pending}
                  className="mt-1 w-full border border-neutral-700 rounded-sm bg-transparent px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6ec7]"
                />
              </label>

              <label className="block text-[12px] tracking-widest text-neutral-700">
                Vilken dag önskar du?
                <select
                  name="day"
                  defaultValue=""
                  disabled={pending}
                  className="mt-1 w-full border border-neutral-700 rounded-sm bg-transparent px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff6ec7]"
                >
                  <option value="" />
                  <option value="-1">Spelar ingen roll!</option>
                  {OPTIONS.map(({ day, occupied, circled }) => (
                    <option key={day} value={day} disabled={occupied || circled}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-[12px] tracking-widest text-neutral-700">
                Önskemål eller andra frågor?
                <textarea
                  name="other"
                  rows={4}
                  disabled={pending}
                  className="mt-1 w-full border border-neutral-700 rounded-sm bg-transparent px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6ec7]"
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                disabled={pending}
              >
                Avbryt
              </button>
              <button
                type="submit"
                disabled={pending}
                className={`${anton.className} uppercase tracking-wider px-5 py-2 border border-neutral-700 rounded-sm text-neutral-900 hover:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed relative flex items-center gap-2`}
                style={{ color: "#ff6ec7" }}
              >
                {pending && (
                  <span
                    className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                    aria-hidden
                  />
                )}
                {pending ? "Skickar…" : "Skicka in"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
