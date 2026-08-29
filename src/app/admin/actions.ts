"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { removeRsvp } from "@/lib/rsvp/service";

export async function deleteRsvpAction(id: string): Promise<{ ok: boolean; error?: string }> {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { ok: false, error: "دسترسی غیرمجاز" };
  }
  if (!id) {
    return { ok: false, error: "شناسه نامعتبر است" };
  }

  try {
    await removeRsvp(id);
  } catch {
    return { ok: false, error: "حذف با مشکل مواجه شد" };
  }

  revalidatePath("/admin");
  return { ok: true };
}
