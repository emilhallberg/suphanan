"use server";

export async function signUp(state: { error: boolean }, formData: FormData) {
  // Here you can handle the form submission, e.g., save to a database or send an email
  console.log("Form submitted:", {
    name: formData.get("name"),
    day: formData.get("day"),
    other: formData.get("other"),
  });

  return { error: false };
}
