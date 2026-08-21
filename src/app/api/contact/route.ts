import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 20_000) {
    return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 413 });
  }
  const expectedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
  const origin = request.headers.get("origin");
  if (origin && origin !== expectedOrigin && !origin.startsWith("http://localhost:")) {
    return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 403 });
  }
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success || Date.now() - Number(parsed.data?.startedAt || 0) < 2500) {
      return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 503 });
    }
    const data = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || "Sonar Studio <forms@sonarstudio.net>",
      to: process.env.CONTACT_TO || "hello@sonarstudio.net",
      replyTo: data.email,
      subject: `New teardown request from ${data.businessName}`,
      text: [
        `Name: ${data.name}`, `Business: ${data.businessName}`, `Email: ${data.email}`,
        `Phone: ${data.phone || "Not supplied"}`, `Location: ${data.city}, ${data.country}`,
        `Business type: ${data.businessType}`, `Website: ${data.website || "Not supplied"}`,
        `Budget: ${data.budget}`, `Selected scope: ${data.tier || "Not selected"}`, "", "What they need:", data.need,
      ].join("\n"),
    });
    if (result.error) throw result.error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 500 });
  }
}
