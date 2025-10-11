import { get } from "@vercel/edge-config";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = ((await get("notes")) as any[]) || [];
    return NextResponse.json(
      { notes },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ notes: [] }, { status: 200 });
  }
}
