# Find a Friend · ING College

A Vite + React + Tailwind CSS rebuild of the original static-HTML pages, fully
componentized and using Firebase (Auth + Realtime Database) exactly as before.

## Structure

This is a **multi-page app**: each original `.html` file is still its own page
and its own Vite entry point (so all existing links between pages keep working
unchanged), but each page now mounts a proper componentized React tree instead
of an inline `<script type="text/babel">` blob.

```
index.html                 → src/main-home.jsx             → src/pages/Home.jsx
admin-login.html           → src/main-admin-login.jsx       → src/pages/AdminLogin.jsx
student-login.html         → src/main-student-login.jsx     → src/pages/StudentLogin.jsx
admin-dashboard.html       → src/main-admin-dashboard.jsx   → src/pages/AdminDashboard.jsx
student-dashboard.html     → src/main-student-dashboard.jsx → src/pages/StudentDashboard.jsx
floornavigation.html       → src/main-floornavigation.jsx   → src/pages/FloorNavigation.jsx
404.html                   → plain static page (no React needed)

src/
  lib/firebase.js          – single shared Firebase init (was duplicated 6x before)
  data/                    – extracted static datasets (floor/room directories)
  utils/                   – ripple effect, date/time parsing, scheduling helpers
  hooks/                   – useToasts, useReveal
  components/shared/       – Toasts, ConfirmModal, ActionConfirmModal, Footer,
                              FloatingButtons, Reveal, CountUp
  components/home/         – Header, Hero, ActivitiesSection, QuickAccess
  components/floornav/     – FloorNavHeader, FloorSelector, FloorBanner,
                              FloorSearchBar, FloorMedia, RoomDirectory, StatsAndLegend
  components/admin/        – AdminHeaderNav, DashboardView, ActivitiesView,
                              StudentsView, ProfileView, and all admin modals
  components/student/      – StudentHeaderNav, StudentDashboardView,
                              StudentProfileView, ChatModal, PostDetailModal,
                              NotificationsModal, CreatePostModal, and modals
```

## Styling

No hand-written CSS remains. Every custom visual pattern from the original six
`<style>` blocks (buttons, cards, avatars, toasts, chat bubbles, floor-plan
lightbox, blobs, skeletons, etc.) was rebuilt as Tailwind:

- **`tailwind.config.js`** — brand colors (`forest-teal`, `electric-gold`,
  `light-mint`), custom keyframes/animations, and gradients.
- **`src/index.css`** — reusable component classes built purely with
  Tailwind's `@apply` (e.g. `.btn-gold`, `.card-hover`, `.avatar-blue`,
  `.floor-btn`, `.bubble-mine`) so class names stay short in JSX while every
  declaration is still Tailwind, not raw CSS.

FontAwesome is now an npm dependency (`@fortawesome/fontawesome-free`)
imported once in `src/index.css`, instead of a CDN `<link>` on every page.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Notes / things to double check

- **Favicons**: the original pages referenced `public/Images/favicon-*.ico`,
  but those image files weren't part of what you gave me, so `public/Images/`
  currently just has a placeholder note — drop your real `.ico` files in
  there (Vite serves anything in `public/` from the site root).
- **Pannellum (360° tours)**: kept as CDN `<script>`/`<link>` tags in
  `floornavigation.html` only, since it isn't cleanly available on npm.
- **Firebase config** is still the same keys as in your original files —
  the Firebase project itself is unchanged, only *how* it's initialized
  (once, shared) changed.
- One latent bug from the original `student-dashboard.html` was fixed in
  passing: the chat-thread mapper referenced an undefined `msgId` variable
  (`{ msgId, ...msgVal }`) instead of the destructured key `mId` — this would
  have thrown at runtime and silently broken the whole chat subscription.
  It's now `{ msgId: mId, ...msgVal }`.
# FindAFriend
