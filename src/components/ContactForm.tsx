"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

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
      <div className="rounded-xl border border-olive/30 bg-olive/10 p-6 text-brou">
        Merci, votre message est parti. Nous vous répondons sous 2 à 3 jours ouvrés.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div
        aria-hidden
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="company">Ne pas remplir</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-brou">
          Votre nom
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="w-full rounded-lg border border-bordure bg-white px-3 py-2.5 text-ecorce outline-none focus:border-chene"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-brou">
          Votre email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-bordure bg-white px-3 py-2.5 text-ecorce outline-none focus:border-chene"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-brou">
          Votre message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          className="w-full rounded-lg border border-bordure bg-white px-3 py-2.5 text-ecorce outline-none focus:border-chene"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-chene/10 px-4 py-2.5 text-sm text-chene-fonce">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-chene px-6 py-3 font-medium text-white transition-colors hover:bg-chene-fonce disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
