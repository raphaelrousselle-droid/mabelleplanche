import { NextResponse } from "next/server";
import { z } from "zod";

import {
  FROM_EMAIL,
  NOTIFICATION_EMAIL,
  resend,
} from "@/lib/email/resend";
import { ContactNotificationEmail } from "@/lib/email/ContactNotificationEmail";
import { getSiteSettings } from "@/lib/store";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  message: z.string().trim().min(10, "Message trop court").max(4000),
  // Champ piège anti-spam : doit rester vide.
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." },
      { status: 400 },
    );
  }
  if (parsed.data.company) {
    // Bot détecté : on répond OK sans rien envoyer.
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;
  const settings = await getSiteSettings();
  const to = NOTIFICATION_EMAIL || settings.notificationEmail;

  if (!resend || !to) {
    console.warn("[contact] Email non configuré, message reçu :", { name, email, message });
    return NextResponse.json(
      { error: "L'envoi est momentanément indisponible. Écrivez-nous directement par email." },
      { status: 503 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: email,
      subject: `Message de ${name} — mabelleplanche.fr`,
      react: ContactNotificationEmail({ name, email, message }),
    });
    if (error) {
      console.error("[contact] Resend a refusé l'envoi", error);
      return NextResponse.json(
        { error: "L'envoi a échoué (configuration email). Réessayez plus tard." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Envoi échoué", err);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez." }, { status: 502 });
  }
}
