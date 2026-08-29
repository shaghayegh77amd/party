# Claude Code Task — Pixel-Accurate Full-Stack Wedding Invitation

I am giving you four assets in this folder:

- `design-reference.png` → FINAL source of truth for the UI
- `hero.jpeg` → actual hero photo
- `polaroid.jpeg` → actual middle/polaroid photo
- `wide-section.jpeg` → actual horizontal photo

## NON-NEGOTIABLE REQUIREMENT

Build a complete production-ready full-stack wedding invitation website that matches `design-reference.png` as closely as technically possible.

This is NOT an inspiration/reference moodboard.

Treat `design-reference.png` like a final Figma handoff.

Do not redesign it.
Do not modernize it.
Do not improve it based on your own taste.
Do not create a generic wedding template.

The final result should be visually extremely close to the provided image at mobile width.

The reference always wins over assumptions.

---

# 1. Stack

Use:

- Next.js latest stable
- App Router
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Zod

Keep frontend + backend in one Next.js project.

Use Server Components by default.
Use Client Components only where interaction is required.

Do NOT use a separate backend framework such as NestJS.

---

# 2. Main Routes

Create:

- `/` → public invitation
- `/admin/login` → admin authentication
- `/admin` → RSVP dashboard

---

# 3. RTL / Persian

The public site must use:

```html
<html lang="fa" dir="rtl">
```

Use Persian typography and Persian numerals in visible content where appropriate.

Admin UI should also be Persian.

---

# 4. Pixel-Accurate Visual Goal

Before writing code, inspect `design-reference.png` carefully.

Extract and match:

- exact mobile page proportions
- page max-width
- hero height
- image crop
- content positioning
- vertical rhythm
- section heights
- spacing
- colors
- warm off-white / cream background
- olive palette
- typography hierarchy
- icon sizes
- border thickness
- border radius
- torn-paper transitions
- countdown dimensions
- polaroid rotation
- tape size/position
- full-width story banner
- RSVP form dimensions
- footer height and shape

Create design tokens from the actual reference.

Example:

```css
:root {
  --paper: ...;
  --olive: ...;
  --olive-dark: ...;
  --text: ...;
  --muted: ...;
  --border: ...;
}
```

Do not just choose "similar" colors by taste.

---

# 5. Responsive Behavior

This design is fundamentally mobile-first.

Target width:
approximately 390–430px.

On desktop:

- keep the same narrow mobile composition
- center it horizontally
- use a warm neutral outer background
- do NOT convert it into a wide desktop layout
- do NOT rearrange sections into desktop grids

The desktop version should simply present the same invitation composition centered in the viewport.

---

# 6. Images — Use These Exact Files

Copy these files into:

```text
public/images/wedding/
```

as:

```text
public/images/wedding/hero.jpeg
public/images/wedding/polaroid.jpeg
public/images/wedding/wide-section.jpeg
```

Do NOT:

- generate replacement images
- use stock images
- use Unsplash
- use placeholders
- use temporary attachment URLs
- alter faces
- create fake backgrounds
- redraw the couple

Use the real supplied photos.

Any visual treatment should be done with layout/CSS only where needed:
- `object-fit`
- `object-position`
- overlays
- gradients
- frame
- tape
- shadow

---

# 7. Hero

Use:

```text
/images/wedding/hero.jpeg
```

Match the reference as closely as possible.

Requirements:

- tall mobile hero
- image fills the section
- `object-fit: cover`
- carefully tune `object-position`
- sparkler and hand remain the main focal point
- couple remains softly blurred in background naturally
- add subtle CSS darkening only where needed for text readability
- no text baked into the image

Overlay:

- SH / N monogram
- circular hamburger button
- names
- invitation copy
- downward arrow

Text:

```text
شقایق
&
نیما
```

Copy:

```text
قراره یه شب کوچیک و صمیمی
کنار هم باشیم و خیلی خوشحال
می‌شیم که کنارمون باشین
```

Match placement from the reference, not a generic centered hero.

---

# 8. Torn Paper Divider

The Hero-to-content transition must look like the reference.

Do not use a straight divider.
Do not use a repetitive perfect zig-zag.

Use one reusable component such as:

```tsx
<TornDivider />
```

Prefer:
- SVG mask
- CSS mask
- inline SVG path

Make it irregular and paper-like.

Use the same treatment again where the footer begins.

---

# 9. Event Info Section

Recreate the 3-column layout.

Content:

### Date
```text
تاریخ
۱ مهر ۱۴۰۵
چهارشنبه
```

### Time
```text
ساعت
۱۹:۰۰
عصر
```

### Location
```text
مکان
تهران
جزئیات در ادامه
```

Use simple line icons:
- calendar
- clock
- location

Match:
- spacing
- icon scale
- vertical separators
- typography
- alignment

Do not make this section taller or looser than the reference.

---

# 10. Countdown

Create the olive countdown card exactly in the visual style of the reference.

Title:

```text
تا اون شب
```

Units:

```text
روز
ساعت
دقیقه
ثانیه
```

The countdown must be real and calculated from the configured event date.

Do not hardcode the displayed numbers.

Prevent hydration mismatch.

After the event date:
do not show negative values.

Use a short Persian completed-state message.

Keep the visual treatment subtle and editorial.
No flashy animation.

---

# 11. Memory / Polaroid Section

Use:

```text
/images/wedding/polaroid.jpeg
```

The file is only the real image.

Create the Polaroid presentation in CSS:

- white instant-photo frame
- subtle realistic shadow
- slight rotation
- beige tape at the top
- overlap and positioning matching the reference

Text:

```text
بعضی شب‌ها
خودشون به خاطره‌ان...
مرسی که کنارمون هستین
```

Include:
- small hand-drawn style heart
- small carousel dots

Do not build a heavy carousel unless actually useful.

The visual composition is more important.

---

# 12. Wide Story Section

Use:

```text
/images/wedding/wide-section.jpeg
```

Match the shallow horizontal banner from the reference.

The couple should appear toward the LEFT side.

Text should be on the RIGHT:

```text
مهم نیست چی برنامه‌ست،
مهم اینه که کنار همیم.
```

Use a dark/olive gradient from right toward center for readability.

Do not turn this into another hero section.

---

# 13. RSVP Section

Heading:

```text
تو این شب همراهمون هستی؟
```

Add the small heart shown in the reference.

Guest name input:

```text
اسم قشنگتون
```

Then:

```text
با همراه میای؟
```

Options:

```text
تنها میام
با همراه میام
```

Attendance options:

```text
با عشق میام
حتماً میام
نمیام
```

Final action:

```text
ثبت حضورم
```

The form must visually match the reference:

- compact controls
- thin outlines
- rounded corners
- warm off-white background
- dark olive selected state
- white/cream selected text
- no default browser radio appearance

Use accessible semantic form controls underneath.

---

# 14. RSVP Behavior

On submit:

1. trim guest name
2. validate name
3. validate attendance
4. validate companion choice when needed
5. disable submit during request
6. prevent double-submit
7. save to PostgreSQL
8. do not reload the whole page
9. preserve values on temporary network failure
10. show a short friendly success state

For attending:

```text
مرسی که خبرمون کردی 🤍
منتظرتیم
```

For not attending:

```text
مرسی که خبرمون کردی 🤍
```

Never expose raw backend/database errors to users.

---

# 15. Database

Create Prisma model:

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
  hasCompanion     Boolean?
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
}
```

You may add `companionName` only if useful, but do not change the public reference UI unnecessarily.

---

# 16. Validation

Use Zod.

Validate server-side.

Guest name:
- required
- trim whitespace
- reasonable max length

Never trust client input.

---

# 17. Data Access Architecture

Do not call Prisma directly from random UI components.

Use a small clear feature/data layer, for example:

```text
src/features/rsvp/
  schema.ts
  types.ts
  repository.ts
  service.ts
  actions.ts
```

Responsibilities:

- repository → DB access
- service → domain rules
- actions/route handlers → transport boundary
- components → UI

Keep it simple.

---

# 18. Admin Authentication

Create:

```text
/admin/login
```

Use:

```env
ADMIN_PASSWORD=
SESSION_SECRET=
```

A single admin password is enough for this project.

Requirements:

- validate password server-side
- never expose password to client JS
- signed session
- HttpOnly cookie
- Secure in production
- SameSite=Lax or Strict
- protect `/admin`
- protect admin mutations/APIs

Do not rely only on hiding links.

---

# 19. Admin Dashboard

At:

```text
/admin
```

Show summary cards:

```text
کل پاسخ‌ها
میان
نمیان
تعداد همراه‌ها
تعداد کل افراد
```

Correct person count logic:

- attending alone = 1
- attending with companion = 2
- not attending = 0

---

# 20. Admin RSVP List

Show:

```text
نام مهمان
وضعیت حضور
همراه
تعداد نفر
زمان ثبت
```

Newest first.

Use Persian-friendly date formatting.

Implement:

- search by guest name
- attendance filter
- companion filter
- refresh
- delete with confirmation
- CSV export

CSV columns:

```text
guestName
attendanceStatus
hasCompanion
createdAt
```

Ensure Persian text opens correctly in Excel.
Use UTF-8 BOM if useful.

---

# 21. Central Event Config

Create:

```text
src/config/event.ts
```

Wedding-specific content must live here.

Example:

```ts
export const eventConfig = {
  couple: {
    fa: {
      bride: 'شقایق',
      groom: 'نیما',
    },
    en: {
      bride: 'Shaghayegh',
      groom: 'Nima',
    },
  },

  date: {
    fa: '۱ مهر ۱۴۰۵',
    weekday: 'چهارشنبه',
  },

  time: '۱۹:۰۰',

  location: {
    city: 'تهران',
    detail: 'جزئیات در ادامه',
    mapUrl: '',
  },

  countdownDate: '2026-09-23T19:00:00+03:30',

  images: {
    hero: '/images/wedding/hero.jpeg',
    polaroid: '/images/wedding/polaroid.jpeg',
    story: '/images/wedding/wide-section.jpeg',
  },

  texts: {
    intro: [
      'قراره یه شب کوچیک و صمیمی',
      'کنار هم باشیم و خیلی خوشحال',
      'می‌شیم که کنارمون باشین',
    ],
  },
}
```

Do not scatter content across components.

---

# 22. Footer

Recreate the reference:

- torn-paper upper edge
- dark olive background
- centered SH / N monogram
- event date
- short closing text

Example:

```text
منتظرتون هستیم!
```

Keep it compact.

Do not make a standard web footer.

---

# 23. SEO / Privacy

This invitation should not be indexed.

Use:

```ts
robots: {
  index: false,
  follow: false,
}
```

Also apply noindex to admin routes.

---

# 24. Accessibility

Use:

- semantic buttons
- real labels
- keyboard interaction
- visible focus
- sufficient contrast
- proper fieldsets where useful

Do not use clickable divs instead of buttons.

---

# 25. Performance

Use `next/image`.

Hero:
- optimize as LCP
- use correct sizes
- prevent CLS
- do not lazy-load the actual LCP image

Other photos:
- lazy-load where appropriate

Avoid:
- animation libraries
- Redux
- huge UI frameworks
- unnecessary JS
- unnecessary global state

---

# 26. Recommended Structure

```text
src/
  app/
    page.tsx
    admin/
      login/
        page.tsx
      page.tsx

  components/
    invitation/
      Hero.tsx
      TornDivider.tsx
      EventDetails.tsx
      Countdown.tsx
      MemorySection.tsx
      Polaroid.tsx
      StorySection.tsx
      RSVPForm.tsx
      Footer.tsx

  features/
    rsvp/
      schema.ts
      types.ts
      repository.ts
      service.ts
      actions.ts

  config/
    event.ts

  lib/
    prisma.ts

prisma/
  schema.prisma
```

Equivalent clean structure is fine.

---

# 27. Environment

Create `.env.example`:

```env
DATABASE_URL=
ADMIN_PASSWORD=
SESSION_SECRET=
```

Do not commit real secrets.

---

# 28. Scripts

Make sure these work:

```text
dev
build
start
lint
typecheck
```

Also add Prisma scripts if useful.

---

# 29. README

Document:

- install
- environment variables
- database setup
- Prisma migration
- running locally
- admin login
- changing event text/date
- replacing images
- deployment

---

# 30. Deployment

Make it deploy-ready for:

- Vercel
- standard PostgreSQL such as Neon/Supabase Postgres

Use normal `DATABASE_URL`.

Avoid unnecessary vendor-specific coupling.

---

# 31. MANDATORY VISUAL QA

This is the most important requirement.

Do NOT stop after coding.

Run the project.

Open the page around 390px width.

Compare the rendered result DIRECTLY against:

```text
design-reference.png
```

If Playwright is available:
take screenshots and iterate.

Check and fix:

- overall width
- hero height
- hero crop
- text position
- torn paper shape
- event info spacing
- icon sizes
- countdown card size
- memory text position
- polaroid size and angle
- tape position
- story image crop
- RSVP spacing
- input/button heights
- selected button styles
- footer height
- final vertical rhythm

Do not consider the task done because it "looks similar".

Iterate until it is visually extremely close to the reference.

---

# 32. Functional QA

Before finishing, verify:

1. `/` works
2. countdown works
3. RSVP submission works
4. submission is stored in DB
5. `/admin/login` works
6. `/admin` is protected
7. RSVP appears in admin
8. search works
9. filters work
10. delete works
11. CSV works
12. mobile layout matches reference
13. desktop keeps centered mobile composition
14. build passes
15. typecheck passes
16. lint passes

Fix all errors before finishing.

---

# 33. Final Report

When done, give me a concise implementation report containing:

- architecture
- routes
- database schema
- RSVP flow
- auth approach
- admin features
- environment variables
- how to run
- how to deploy
- anything still requiring my input

Do not ask unnecessary implementation questions.

If venue details or map URL are unknown:
place editable placeholders in `src/config/event.ts` and continue.