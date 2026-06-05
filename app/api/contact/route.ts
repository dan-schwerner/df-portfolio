import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Contact endpoint shared by the bottom contact form, the chat-bubble form and
 * the banner email capture. Sends a transactional email via Resend with the
 * visitor's address as Reply-To, so replies go straight back to them.
 *
 * Required env vars (set in `.env.local` for dev, and in Vercel for prod):
 *   RESEND_API_KEY      Your Resend API key.
 *   CONTACT_TO_EMAIL    Where messages are delivered — e.g. your Cloudflare
 *                       forwarded address (Cloudflare then forwards to your inbox).
 *   CONTACT_FROM_EMAIL  A verified Resend sender, e.g.
 *                       "Daniel Falzon <hello@send.danfalzon.com>".
 *                       Falls back to Resend's sandbox sender for local testing
 *                       (the sandbox can only deliver to your own Resend account
 *                       email until you verify a domain).
 */

const FROM = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: Request) {
  // Localize the visitor-facing responses to their chosen UI locale. The owner
  // notification email below stays in Maltese (it's read by the site owner).
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "contactApi" });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: t("invalidRequest") }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, send nothing.
  if (clean(body.company, 1)) {
    return NextResponse.json({ ok: true });
  }

  const source = body.source === "banner" ? "banner" : "contact";
  const email = clean(body.email, 200);
  const name = clean(body.name, 120);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 5000);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: t("invalidEmail") }, { status: 400 });
  }
  if (source === "contact" && !message) {
    return NextResponse.json({ ok: false, error: t("emptyMessage") }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !TO) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.");
    return NextResponse.json(
      { ok: false, error: t("notConfigured") },
      { status: 500 },
    );
  }

  const subjectLine =
    source === "banner"
      ? `Lead ġdid mill-website: ${email}`
      : `Messaġġ ġdid${name ? ` mingħand ${name}` : ""}${subject ? ` — ${subject}` : ""}`;

  const rows: [string, string][] =
    source === "banner"
      ? [["Email", email]]
      : [["Isem", name || "—"], ["Email", email], ["Suġġett", subject || "—"]];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(source === "contact" ? ["", message] : []),
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="color:#4961b0;margin:0 0 16px">${source === "banner" ? "Lead ġdid mill-banner" : "Messaġġ ġdid mill-website"}</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 0;font-weight:bold;width:120px;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      ${source === "contact" ? `<p style="white-space:pre-line;margin-top:16px;padding-top:16px;border-top:1px solid #eee">${escapeHtml(message)}</p>` : ""}
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: subjectLine,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: t("sendFailed") },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed:", e);
    return NextResponse.json(
      { ok: false, error: "Ma rnexxilniex nibagħtu l-messaġġ. Erġa' pprova." },
      { status: 502 },
    );
  }
}
