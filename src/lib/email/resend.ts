import "server-only";

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Ma belle planche <onboarding@resend.dev>";

export const NOTIFICATION_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || "";

export function emailConfigured(): boolean {
  return Boolean(resend);
}
