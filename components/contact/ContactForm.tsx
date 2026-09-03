"use client";

import { Check, Send } from "lucide-react";
import { useActionState } from "react";

import { sendMessage, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const fieldClasses =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-fg outline-none transition-all duration-300 placeholder:text-faint focus:border-accent/60 focus:bg-bg";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initialState);
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status" aria-live="polite">
        <span className="grid size-12 place-items-center rounded-full bg-live/15 text-live">
          <Check className="size-5" />
        </span>
        <h3 className="text-2xl font-semibold tracking-tight">Message sent.</h3>
        <p className="max-w-md text-muted">
          Thanks for reaching out. I read everything and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values?.name}
            placeholder="Your name"
            aria-invalid={Boolean(errors?.name)}
            className={cn(fieldClasses, errors?.name && "border-red-500/60")}
          />
        </Field>
        <Field label="Email" name="email" error={errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors?.email)}
            className={cn(fieldClasses, errors?.email && "border-red-500/60")}
          />
        </Field>
      </div>

      <Field label="Message" name="message" error={errors?.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={values?.message}
          placeholder="What are you working on?"
          aria-invalid={Boolean(errors?.message)}
          className={cn(fieldClasses, "resize-y", errors?.message && "border-red-500/60")}
        />
      </Field>

      {/* Honeypot: hidden from people, attractive to bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="rounded-xl border border-line bg-accent-soft px-4 py-3 text-sm text-muted">
          {state.message}{" "}
          {state.unconfigured && (
            <>
              Please email me at{" "}
              <a href={`mailto:${site.email}`} className="link-underline text-fg">
                {site.email}
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-faint">No newsletters, no spam. Just a reply from me.</p>
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
          <Send className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="mono-label block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
