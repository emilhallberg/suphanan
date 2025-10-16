import { list, put } from "@vercel/blob";

import { NextResponse } from "next/server";

type Note = {
  id: string;
  text: string;
  color: string;
};

const token =
  process.env.SUPHANAN_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "notes/", token });
    if (!blobs?.length) return NextResponse.json([]);

    // Sort newest first by uploadedAt
    const sorted = [...blobs].sort(
      (a, b) => +new Date(b.uploadedAt as any) - +new Date(a.uploadedAt as any),
    );

    const notes = (
      await Promise.all(
        sorted.map(async (b) => {
          try {
            const res = await fetch(b.downloadUrl || b.url);
            const data = (await res.json()) as Note;
            return data;
          } catch {
            return null;
          }
        }),
      )
    ).filter((n): n is Note => Boolean(n));

    return NextResponse.json(notes);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to list notes" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Note>;
    const text = (body.text || "").toString().trim();
    const color = (body.color || "").toString();
    const id = (body.id as string) || Math.random().toString(36).slice(2);

    if (!text)
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    if (!color)
      return NextResponse.json({ error: "Color required" }, { status: 400 });

    const note: Note = { id, text, color };

    await put(`notes/${id}.json`, JSON.stringify(note), {
      access: "public",
      contentType: "application/json",
      token,
    });

    return NextResponse.json(note, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
