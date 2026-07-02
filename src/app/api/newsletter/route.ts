import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    // Best-effort abuse limiting: 5 signups per IP per 10 minutes
    if (!checkRateLimit(`newsletter:${getClientIp(req)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email =
      typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!apiKey || !listId) {
      // Log the signup for manual processing if Mailchimp isn't configured
      console.log("Newsletter signup (Mailchimp not configured):", email);
      return NextResponse.json({ success: true });
    }

    const dc = apiKey.split("-")[1];

    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    if (response.ok || response.status === 400) {
      // 400 = already subscribed, which is fine
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
