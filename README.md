# شقایق و نیما — دعوت‌نامه عروسی

A mobile-first wedding invitation site with a real backend for RSVPs and a
password-protected admin dashboard.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma · Zod

---

## 1. Installation

```bash
npm install
```

## 2. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable         | Description                                                                 |
| ---------------- | ---------------------------------------------------------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string.                                                |
| `ADMIN_PASSWORD` | The password required to access `/admin`. Pick something long and random.   |
| `SESSION_SECRET` | Random secret used to sign the admin session cookie. Generate with `openssl rand -hex 32`. |

## 3. Database setup

You need a PostgreSQL database. Locally, the quickest path is Homebrew:

```bash
brew install postgresql@16
brew services start postgresql@16
createdb wedding_invite
```

Then point `DATABASE_URL` at it, e.g.:

```
DATABASE_URL="postgresql://YOUR_USER@localhost:5432/wedding_invite"
```

For a hosted database (Neon, Supabase, Vercel Postgres, etc.), just paste the
connection string they give you — no code changes needed.

## 4. Run the Prisma migration

```bash
npx prisma migrate dev
```

This creates the `RSVP` table (see schema below) and generates the Prisma
client. Re-run this any time `prisma/schema.prisma` changes.

Optional: seed a few sample RSVPs for local testing:

```bash
npm run db:seed
```

(The seed script is a no-op if the table already has data.)

## 5. Running locally

```bash
npm run dev
```

Open http://localhost:3000 for the invitation, and http://localhost:3000/admin
for the dashboard (you'll be redirected to `/admin/login` first).

## 6. Creating the admin password

There's no admin user table — just set `ADMIN_PASSWORD` in your environment.
Whoever knows that value can log in at `/admin/login`. Rotate it any time by
changing the env var and redeploying/restarting; existing sessions stay valid
until their 7‑day cookie expires (or until everyone logs out).

## 7. Deploying

Works well on **Vercel + any standard PostgreSQL provider** (Neon, Supabase,
Railway, etc.) — no vendor lock-in.

1. Push the repo to GitHub and import it into Vercel.
2. Set `DATABASE_URL`, `ADMIN_PASSWORD`, and `SESSION_SECRET` in the Vercel
   project's Environment Variables.
3. Run `npx prisma migrate deploy` against the production database once
   (either locally with the prod `DATABASE_URL`, or as a one-off build step).
4. Deploy. `postinstall` already runs `prisma generate` automatically.

## 8. How RSVP data is stored

Every submission on the public page is validated (Zod, both client- and
server-side) and written to the `RSVP` table via a small data-access layer:

```
src/lib/rsvp/
  schema.ts       Zod schemas (shared by the form and the API route)
  repository.ts   Raw Prisma queries — the only file that imports PrismaClient
  service.ts      Business logic: submit / list / stats / delete / CSV export
```

Nothing in the public UI ever calls Prisma directly, and no RSVP data is
reachable without going through `/api/rsvp` (create-only, public) or the
authenticated admin routes.

### Schema

```prisma
enum AttendanceStatus {
  COMING_WITH_LOVE
  DEFINITELY_COMING
  NOT_COMING
}

model RSVP {
  id               String           @id @default(cuid())
  guestName        String
  attendanceStatus AttendanceStatus
  hasCompanion     Boolean?         // null when attendanceStatus is NOT_COMING
  companionName    String?
  optionalNote     String?
  userAgent        String?
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
}
```

## 9. How to access `/admin`

Go to `/admin` (or `/admin/login` directly). You'll be asked for
`ADMIN_PASSWORD`. On success, an HttpOnly, signed session cookie is set
(`secure` in production, 7‑day expiry) and you're redirected to the
dashboard. `/admin` and every `/api/admin/*` route re-check that cookie on
every request — there's no client-side-only gate.

Admin features: summary stats, search by name, filter by attendance/companion,
delete (with an inline confirm step, no native browser dialog), refresh, and
CSV export (UTF-8 with BOM, so Persian names open correctly in Excel).

## 10. How to change wedding date/text/images

Everything editable lives in **one file**:

```
src/config/event.ts
```

Names, date/time/location strings, the countdown target (`eventDateTimeIso`),
hero/memories/photo-story copy and image paths, RSVP form labels and success
messages, footer text — all there. No need to touch any component.

Images referenced from that config live in `public/images/wedding/`:

```
public/images/wedding/hero.jpeg
public/images/wedding/polaroid.jpeg
public/images/wedding/wide-section.jpeg
```

These are the real couple photos. To replace any of them, drop a new file in
with the same name (or a different name plus a matching path update in
`event.ts`).

---

## Architecture at a glance

```
src/
  app/
    page.tsx                 Public invitation (composes the sections below)
    layout.tsx                Root layout: fonts, dir="rtl" lang="fa", noindex metadata
    robots.ts                 Blocks all crawlers as a second layer of defense
    api/rsvp/route.ts         POST — public, create-only
    admin/
      page.tsx                Dashboard (Server Component, requireAdmin())
      login/page.tsx          Login screen
      actions.ts              Server Action: delete RSVP
    api/admin/
      login/route.ts          Sets the session cookie
      logout/route.ts         Clears it
      export/route.ts         CSV download (auth-gated)
  components/
    invitation/                Hero, EventDetails, Countdown, Memories, PhotoStory, RSVPForm, Footer, TornDivider
    admin/                      AdminHeader, RSVPStats, RSVPFilters, RSVPTable, DeleteRsvpButton, LoginForm
  lib/
    prisma.ts                  Prisma client singleton
    persian.ts                 Persian digit + Jalali date formatting helpers
    auth/                      Signed-cookie session (HMAC via node:crypto, no extra deps)
    rsvp/                      schema / repository / service (data access layer)
  config/event.ts              All editable copy + dates + image paths
```

Server Components are used by default; `"use client"` only appears where
there's real interactivity (the countdown timer, the RSVP form, admin
filters, the delete confirm, the hero's menu button).

## Quality checks

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

All three are expected to pass with zero errors.

## Still needed from you

- **Exact venue name/address and a Google Maps link** — placeholders live in
  `eventConfig.location` in `src/config/event.ts` (`venueName`, `address`,
  `mapUrl`).
- Double-check `eventConfig.eventDateTimeIso`, `date`, and `time` match the
  final, confirmed date/time once it's locked in.
- A production `ADMIN_PASSWORD` and `SESSION_SECRET` (don't reuse the ones
  generated for local dev).
