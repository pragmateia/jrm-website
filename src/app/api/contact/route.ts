import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, organization, message, type } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const subject =
      type === "ambassador"
        ? `[Ambassador Interest] ${name} — ${organization || "Individual"}`
        : `[Outreach Inquiry] ${name} — ${organization || "Individual"}`;

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
