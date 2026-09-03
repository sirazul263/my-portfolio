"use server";

import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/content/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "That name is a bit long."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(4000, "Please keep it under 4000 characters."),
});

type Values = { name: string; email: string; message: string };
type FieldErrors = Partial<Record<keyof Values, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      unconfigured?: boolean;
      fieldErrors?: FieldErrors;
      values?: Values;
    };

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: Values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: real users never see this field. Bots that fill it get a quiet "success".
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        name: flat.fieldErrors.name?.[0],
        email: flat.fieldErrors.email?.[0],
        message: flat.fieldErrors.message?.[0],
      },
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      unconfigured: true,
      message: "The contact form is not connected to an email service yet.",
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: parsed.data.email,
    subject: `Portfolio message from ${parsed.data.name}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong while sending. Please email me directly instead.",
      values,
    };
  }

  return { status: "success" };
}
