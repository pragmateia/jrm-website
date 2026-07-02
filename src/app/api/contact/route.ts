import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Coerce to a trimmed string, capped at maxLen; null if not a string. */
function cleanString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    // Best-effort abuse limiting: 5 submissions per IP per 10 minutes
    if (!checkRateLimit(`contact:${getClientIp(req)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = cleanString(body.name, 200);
    const email = cleanString(body.email, 254);
    const organization = cleanString(body.organization, 300) ?? "";
    const message = cleanString(body.message, 5000);
    const type = body.type === "ambassador" ? "ambassador" : "outreach";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Strip CR/LF from values interpolated into the subject header
    const safeName = name.replace(/[\r\n]+/g, " ");
    const safeOrg = organization.replace(/[\r\n]+/g, " ");

    const subject =
      type === "ambassador"
        ? `[Ambassador Interest] ${safeName} — ${safeOrg || "Individual"}`
        : `[Outreach Inquiry] ${safeName} — ${safeOrg || "Individual"}`;

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      await transporter.sendMail({
        from: `"Jesus Rules Website" <${gmailUser}>`,
        to: "info@jesusrules.co",
        replyTo: email,
        subject,
        text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\n\n${message}`,
      });
    } else {
      console.log("Contact form submission (GMAIL not configured):", {
        subject,
        name,
        email,
        organization,
        message,
        type,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
