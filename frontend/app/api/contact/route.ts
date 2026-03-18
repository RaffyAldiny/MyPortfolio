import { NextRequest, NextResponse } from "next/server";
import { storeContactSubmission } from "@/lib/contactSubmission";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const attachmentValue = formData.get("attachment");
    const attachment = attachmentValue instanceof File ? attachmentValue : null;

    const result = await storeContactSubmission({
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      timeline: String(formData.get("timeline") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      turnstileToken: String(formData.get("cf-turnstile-response") || ""),
      attachment,
      ipAddress: getClientIp(request),
    });

    return NextResponse.json({
      ok: true,
      attachmentUrl: result.attachmentUrl,
      message: "Brief received and stored successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit your message right now.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
