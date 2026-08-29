import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "ورود مدیریت",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();
  if (authenticated) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-ivory-200 px-6">
      <h1 className="text-lg font-semibold text-ink-900">ورود به پنل مدیریت</h1>
      <LoginForm />
    </main>
  );
}
