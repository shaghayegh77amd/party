import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/rsvp/service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { fieldErrors: {}, formError: "درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const userAgent = request.headers.get("user-agent");
  const result = await submitRsvp(body, { userAgent });

  if (result.ok) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const hasFieldErrors = Object.keys(result.fieldErrors).length > 0;
  if (hasFieldErrors) {
    return NextResponse.json({ fieldErrors: result.fieldErrors }, { status: 400 });
  }

  return NextResponse.json(
    { fieldErrors: {}, formError: result.formError ?? "مشکلی پیش اومد" },
    { status: 500 }
  );
}
