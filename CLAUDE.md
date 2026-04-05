# CLAUDE.md — Portfolio Site

Agent instructions for working on this codebase. Read this before making any changes.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vite + React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Database | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Auth | bcryptjs (client-side) + localStorage session |
| Hosting | Vercel |

**This is NOT Next.js.** No App Router, no server components, no API routes, no `process.env`.
Use `import.meta.env.VITE_*` for all environment variables.

---

## Project structure

```
src/
  components/       # Public-facing sections (one file = one page section)
  admin/            # Admin panel pages and routing
  lib/
    auth.ts         # Login / session / logout (localStorage, bcryptjs)
    db.ts           # All Supabase CRUD — the single data layer
    supabase.ts     # Supabase client (createClient)
    seed.ts         # One-time seed script — do not import in production
  types/
    database.ts     # Project, Skill, Message interfaces (snake_case)
  data/             # Legacy JSON files — source of fallback/seed data only
  pages/            # Legal pages (PrivacyPolicy, TermsOfUse, CookiesPolicy)
  App.tsx           # Route declarations
  main.tsx          # Entry point
  index.css         # CSS variables + Tailwind import
```

---

## Styling rules

### CSS variables — always use these for backgrounds and borders

```css
--bg-base      /* page background */
--bg-subtle    /* section / footer / sidebar bg */
--bg-surface   /* card / elevated element bg */
```

Usage in JSX: `className="bg-[var(--bg-surface)]"`

Borders light mode: `border-[oklch(90%_0.012_349)]`
Borders dark mode:  `dark:border-white/10`
Always include both.

### Dark mode

Dark mode is activated by adding the `dark` CSS class to a root element.
- Public site: toggled on `<html>` by the Header component (saved to localStorage)
- Admin panel: always dark — `<div className="dark ...">` in AdminLayout and AdminLogin root divs

**Never use `dark:` variants in admin components** — the `dark` class is always present there, so normal classes apply directly.

### Color palette

Accent gradient (purple → pink): `from-purple-400 to-pink-400`
Primary CTA gradient: `from-purple-500 to-pink-500`
Use `oklch` only in raw CSS / CSS variables — not in Tailwind class strings.

### Accent gradients on text

```jsx
<h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
```

### Cards

Standard card pattern:
```jsx
<div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl p-6
                border border-[oklch(90%_0.012_349)] dark:border-white/10
                hover:border-purple-400/50 transition-all duration-500">
```

---

## Animations

### Page sections — scroll fade-in

Wrap any section with `<AnimatedSection>` from `src/components/AnimatedSection.tsx`.
It uses `useInView` with `once: true` and fades + slides up on scroll.

### Card grids — stagger on enter

For grids where cards can be added/removed dynamically, use `AnimatePresence` with
inline props so enter animation re-triggers correctly for new items:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <AnimatePresence>
    {items.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }}
      >
```

Do NOT use `variants` with a function `(i) => ({...})` — Framer Motion 12's `Variants`
type rejects it. Use inline props + `delay: index * 0.1` instead.

### Sequential Hero animations

Use `initial/animate` with increasing `transition.delay` values directly on `motion.div`.

---

## Data layer

**Single source of truth: `src/lib/db.ts`**
Never call `supabase` directly from components — always go through `db.ts`.

### Available functions

```ts
// Projects
getProjects()           // all, sorted by order
getFeaturedProjects()   // featured: true only
addProject(data)
updateProject(id, data)
deleteProject(id)

// Skills
getSkills()
addSkill(data)
updateSkill(id, data)
deleteSkill(id)

// Messages
getMessages()
addMessage({ name, email, message })
setReadStatus(id, read)   // true or false
deleteMessage(id)
```

All functions are async and throw on Supabase error.

### Types — always snake_case to match Supabase columns

```ts
// src/types/database.ts
Project  { id, title, description, tech, live_url, github_url, image, featured, category, order, created_at }
Skill    { id, name, level, category, icon, color, order, created_at }
Message  { id, name, email, message, read, created_at }
```

`live_url` not `liveUrl`. `github_url` not `githubUrl`. `created_at` not `date`.

### Component data pattern

```tsx
const [items, setItems] = useState<Thing[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  getThings()
    .then(data => setItems(data))
    .catch(() => setItems(FALLBACK))
    .finally(() => setLoading(false));
}, []);
```

Show a loading skeleton while `loading === true` (animate-pulse placeholder cards).
Always define a `FALLBACK` constant array with hardcoded sample data — never show an empty section.

---

## Auth (admin panel)

- Email is hardcoded: `admin@portfolio.com` (`ADMIN_EMAIL` in `auth.ts`)
- Password hash is read from `import.meta.env.VITE_ADMIN_PASSWORD_HASH`
- Session stored in localStorage with 24h expiry
- `/admin/*` routes are wrapped in `<AdminRoute>` which redirects to `/admin/login` if not authenticated
- To generate a new hash: `node -e "require('bcryptjs').hash('yourpassword',10).then(console.log)"`

---

## Admin panel

Located in `src/admin/`. Uses `<Outlet />` via `AdminLayout`.

### Routes

```
/admin/login      → AdminLogin (unprotected)
/admin            → redirect to /admin/dashboard
/admin/dashboard  → AdminDashboard
/admin/projects   → AdminProjects
/admin/skills     → AdminSkills
/admin/messages   → AdminMessages
```

### Adding a new admin module (5 steps)

1. Add types to `src/types/database.ts`
2. Add CRUD functions to `src/lib/db.ts`
3. Create `src/admin/AdminFoo.tsx` following the existing page pattern
4. Add a nav entry to the `NAV_ITEMS` array in `AdminLayout.tsx`
5. Add the route in `App.tsx`

### Admin page pattern

```tsx
const [items, setItems]     = useState<Foo[]>([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving]   = useState(false);
const [feedback, setFeedback] = useState('');

// load on mount
useEffect(() => { load(); }, []);
async function load() { ... }

// disable buttons during save
<button disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
```

---

## Environment variables

| Variable | Where |
|---|---|
| `VITE_SUPABASE_URL` | `.env.local` + Vercel dashboard |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` + Vercel dashboard |
| `VITE_ADMIN_PASSWORD_HASH` | `.env.local` + Vercel dashboard |

`.env.local` is in `.gitignore` (`*.local`) — never commit secrets.
Never use `process.env` — Vite requires `import.meta.env.VITE_*`.

---

## Commands

```bash
npm run dev       # start dev server
npm run build     # tsc + vite build (runs before every Vercel deploy)
npm run lint      # ESLint
npm run preview   # preview production build locally
```

---

## TypeScript rules (tsconfig.app.json)

- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUnusedLocals: true` / `noUnusedParameters: true` — no unused vars, build will fail
- `resolveJsonModule: true` — JSON imports are allowed

---

## What NOT to do

- Do not use `process.env` — use `import.meta.env.VITE_*`
- Do not call `supabase` directly from components — use `src/lib/db.ts`
- Do not use localStorage for data — Supabase is the single source of truth (auth session is the only exception)
- Do not hardcode secrets (password hash, keys) in source files
- Do not use Next.js patterns (getServerSideProps, API routes, next/image, next/link)
- Do not use `dark:` classes inside admin components — the `dark` class is always active there
- Do not add `src/lib/seed` import to `main.tsx` in production
- Do not commit `.env.local`
