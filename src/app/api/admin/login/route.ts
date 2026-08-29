import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/rsvp/schema";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, sessionCookieOptions, verifyAdminPassword } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "رمز عبور را وارد کنید" }, { status: 400 });
  }

  let passwordOk: boolean;
  try {
    passwordOk = verifyAdminPassword(parsed.data.password);
  } catch {
    return NextResponse.json({ error: "مشکلی پیش اومد. لطفاً دوباره امتحان کنین." }, { status: 500 });
  }

  if (!passwordOk) {
    return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
