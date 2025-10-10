"use server";

import mail from "nodemailer";

const transport = mail.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  logger: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function signUp(_: { error: boolean }, formData: FormData) {
  console.info("Placing sign-up");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const day = formData.get("day") as string;
  const other = formData.get("other") as string;

  if (!name || !email) {
    return { error: true };
  }

  const now = Date.now();

  const subject = `BDW [${now}] - ${name} - ${day}`;

  const text = `
    ${name} har anmält sig till Suppis Birthday Week!
    
    Dag: ${day}
    Övriga önskemål: ${other}
  `;

  const result = await transport.sendMail({
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject,
    text,
  });

  if (result.rejected.length) {
    console.info("Sign-up not placed");
    return { error: true };
  }

  console.info("Sign-up placed");
  return { error: false };
}
