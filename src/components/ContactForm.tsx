"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-bordure bg-white px-4 py-3 text-ecorce outline-none transition-all duration-200 focus:border-ecorce focus:shadow-[0_0_0_4px_rgba(176,96,59,0.12)]";
const label = "mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brou";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Envoi impossible.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-olive/30 bg-olive/10 p-6 text-brou">
        Merci, votre message est parti. Nous vous répondons sous 2 à 3 jours
        ouvrés.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Ne pas remplir</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className={label}>Votre nom</label>
        <input id="name" name="name" required minLength={2} className={field} />
      </div>

      <div>
        <label htmlFor="email" className={label}>Votre email</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>

      <div>
        <label htmlFor="message" className={label}>Votre message</label>
        <textarea id="message" name="message" required minLength={10} rows={6} className={field} />
      </div>

      {error && (
        <p className="rounded-xl bg-chene/10 px-4 py-2.5 text-sm text-chene-fonce">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
