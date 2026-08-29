import { z } from "zod";

export const ATTENDANCE_STATUS_VALUES = [
  "COMING_WITH_LOVE",
  "DEFINITELY_COMING",
  "NOT_COMING",
] as const;

export type AttendanceStatusValue = (typeof ATTENDANCE_STATUS_VALUES)[number];

/**
 * Shared validation for public RSVP submissions.
 * hasCompanion is required for anyone attending, and must be absent/null
 * for guests who are not coming (enforced via superRefine, not just typing).
 */
export const createRsvpSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, "لطفاً اسمتون رو کامل بنویسین")
      .max(80, "اسم خیلی طولانیه"),
    attendanceStatus: z.enum(ATTENDANCE_STATUS_VALUES, {
      message: "لطفاً وضعیت حضورتون رو انتخاب کنین",
    }),
    hasCompanion: z.boolean().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const isAttending = data.attendanceStatus !== "NOT_COMING";
    if (isAttending && (data.hasCompanion === undefined || data.hasCompanion === null)) {
      ctx.addIssue({
        code: "custom",
        message: "لطفاً مشخص کنین تنها میاین یا با همراه",
        path: ["hasCompanion"],
      });
    }
  });

export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;

export const adminListQuerySchema = z.object({
  search: z.string().trim().max(80).optional(),
  attendanceStatus: z.enum(ATTENDANCE_STATUS_VALUES).optional(),
  hasCompanion: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export type AdminListQuery = z.infer<typeof adminListQuerySchema>;

export const adminLoginSchema = z.object({
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});
