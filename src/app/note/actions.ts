"use server";

export async function sendNote(_: { error: boolean }, formData: FormData) {
  const message = (formData.get("message") as string | null)?.toString() ?? "";
  const background =
    (formData.get("background") as string | null)?.toString() ?? "";

  if (!message?.trim() || !background) {
    return { error: true };
  }

  return { error: false };
}
