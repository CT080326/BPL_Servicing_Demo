# Phoenix Burst — Design System

> Regulatory Change Management and Development Artifact Generation, for enterprise compliance teams.

Phoenix Burst is an **enterprise regulatory-compliance platform** that ingests regulatory sources, helps teams curate change statements, and generates downstream development artifacts (requirements, user stories, acceptance criteria, tests). The product surface is organized around three products inside one app shell:

| Product | What it does |
|---|---|
| **Burst** | The core flow. Regulatory sources → change statements → requirements → stories / acceptance criteria / tests. Contains the chat copilot, artifact curators, and regulatory source library. |
| **Value Network** | OKR-style strategy tree for AI/data initiatives: **Pillars → Objectives → Key Results**. Includes Dataset Template Library, Prompt Library, and Analysis Library. |
| **Contract** | Contract-ingestion product (separate fetch client, separate Auth0 audience). Surfaces a Client Ops Library. |

The shell is a light-surface **left-nav** app with a deep navy **login screen** and a gradient-driven logo mark (phoenix flame, cyan → purple). It is built with Next.js 16 / React 19 / Tailwind / shadcn-ui, and most of this design system is a direct lift of the tokens and components defined in that codebase.

---

## Sources consulted

- **Codebase:** [`Phoenix-Outcomes/phoenix-burst-ui`](https://github.com/Phoenix-Outcomes/phoenix-burst-ui) (branch `develop`, ref `70d8b0fa`, refreshed 2026-05-21). Tokens and components have been transcribed into this system.
  - `app/styles/globals.css` — color CSS variables (unchanged since first snapshot)
  - `app/styles/fonts/*` — Sofia Pro web fonts (imported into `fonts/`)
  - `tailwind.config.ts` — theme extension, radii (unchanged)
  - `app/components/**` — Button, Badge, Card, Input, Filter (new), typography, nav-bars, chat
  - `app/features/burst/**` — artifact curators, chat, regulatory sources
  - `app/features/value-network/**` — pillars, objectives, key-results, libraries (substantially expanded)
  - `app/features/contract/**` — contract-library, contract nav (new)
  - `app/(routes)/(public)/login/page.tsx` — login composition
  - `public/images/*.png` — logo marks, login background (imported into `assets/`)
- **Environments:** `dev.app.phoenixburst.ai`, `sit.app.phoenixburst.ai`, `demo.app.phoenixburst.ai`, `app.phoenixburst.ai`.
- **No Figma** was provided. Visuals were reconstructed from the code + the provided raster logo set.

---

## Index

| File | What's in it |
|---|---|
| `README.md` | This document. |
| `colors_and_type.css` | All color + type CSS variables, font-face declarations, semantic tag styles. |
| `SKILL.md` | Agent-Skill manifest for reuse in Claude Code. |
| `fonts/` | `SofiaProLight.woff2`, `SofiaProMedium.woff2` (from upstream repo). |
| `assets/` | Logo marks (`logo.png`, `logo-and-text.png`, `logo-and-text-alt.png`, `logo-border.png`), `background.png` (login bg), `chat-avatar.png`. |
| `preview/` | Individual Design-System cards (type, colors, spacing, components, brand). |
| `ui_kits/burst/` | Burst product UI kit — index + JSX components. |
| `ui_kits/value_network/` | Value Network UI kit — Pillars → Objectives → Key Results dashboard. |

---

## Content Fundamentals

Phoenix Burst copy is **enterprise, calm, and noun-led**. It is the voice of a compliance platform — nothing is cute, nothing is exclamatory.

- **Tone:** Professional, neutral, direct. No marketing hype. No first-person ("we"); no second-person cheer ("Let's go!"). The interface describes the world, not itself.
- **Casing:** **Title Case** for primary nav items, product names, page headers, and most buttons. **Sentence case** for body copy, empty states, chat placeholders, tooltips.
  - Examples from the code: `Home`, `Curated Artifacts`, `Procedure Library`, `Regulatory Sources`, `Burst Chats`, `Client Ops Library`, `Dataset Template Library`, `Prompt Library`, `Analysis Library`.
  - Sentence case: `No chats yet`, `Upload a file or drop it here`, `Clear All`, `Filters`.
  - **One deliberate exception:** the Value Network **`add new pillar`** CTA — lowercase, `<P thin>` weight, on a `variant="gradient" square` button. This is a real, intentional pattern for primary creation actions inside the OKR tree (`pillar` / `objective` / `key result`). Don't generalize it to other CTAs.
- **Labels over sentences:** Buttons are short noun/verb phrases (`Login`, `Curated Artifacts`). Empty states are one short sentence (`No chats yet`).
- **Domain nouns are capitalized as proper concepts** in the product:
  - **Burst:** Requirement, Story, Acceptance Criteria, Test, Change Statement, Artifact, Chunk, Subtopic, Source.
  - **Value Network:** Pillar, Objective, Key Result, Dataset Template, Prompt, Analysis.
  - **Contract:** Client Ops, Contract.
  Each is a first-class entity in the data model. The Burst artifact types additionally carry their own brand color.
- **No emoji.** None are used anywhere in the codebase.
- **Icons, not decoration.** Iconography is from `react-icons/pi` (Phosphor) and carries meaning, not flair.
- **Vibe:** Serious enterprise SaaS for regulated industries (banking, insurance). Closer to Workday / Auth0 / Guidewire than to a consumer app. Colors are restrained; motion is minimal.

**Specific examples (verbatim from the code):**
- Nav items: `Home`, `Curated Artifacts`, `Procedure Library`, `Regulatory Sources`, `Burst Chats`.
- Microcopy: `No chats yet`, `Upload a file or drop it here`.
- CTA: `Login` (singular, Title Case).

---

## Visual Foundations

### Color
The palette is a **dual-identity system**: a **deep navy + vibrant cyan/purple** brand world (login, logo, gradients) over a **light neutral app shell** (navy text on near-white surfaces).

- **Brand:**
  - `--primary` — **cyan** `hsla(189,100%,42%)` (the "blue" half of the flame).
  - `--secondary` — **purple** `hsla(282,49%,39%)` (the "magenta" half of the flame).
  - `--tertiary` — **deep navy** `hsla(217,80%,14%)` (login bg, app bg, primary text color).
  - `.bg-gradient-to-tl from-primary to-secondary` — the **"burst" gradient** — cyan bottom-right → purple top-left. Used on the logo mark and the `burst`/`gradient` button & badge variants.
- **Artifact-type palette (domain semantic):**
  - Requirement — amber `hsla(40,98%,43%)`
  - Story — green `hsla(115,75%,34%)`
  - Acceptance Criteria — blue `hsla(223,77%,38%)`
  - Test — magenta `hsla(331,69%,38%)`
  These are _identity colors for data objects_, not UI accents.
- **Neutrals:** A 5-step `muted` scale from `muted-lightest` (near-white app chrome) → `muted-darkest` (near-black). `card` is `hsl(240 5% 96%)`.
- **Semantic:** `success` green, `destructive` red, `warning` yellow, `link` pure blue.

### Type
- **Sofia Pro** (licensed web font, woff2), two weights shipped: Light (100/300) and Medium (400–700). See note under "Font substitution."
- **Heading scale (from `Heading.tsx`):** xxxl 36 / xxl 28 / xl 22 / lg 18 / md 16 / sm 12. Headings default to `text-tertiary` (navy).
- **Paragraph scale (from `Paragraphs.tsx`):** xxl 22 / xl 20 / lg 18 / md 16 (default) / sm 14 / xs 12.
- **Weight usage:** Light = ambient/body on dark. Regular/Medium = body default. Semibold = headings. Bold sparingly.
- **Letter-spacing:** Buttons use `tracking-wide`. Badges with `bold` variant use `tracking-wider`.

### Spacing & layout
- **App shell:** full-height, left nav `w-16` collapsed / `w-60` open, top-right of nav is a **collapse toggle**, main content is a `flex-1` region with a `PageHeader` card at top.
- **Header height:** `h-14` (56px).
- **Padding rhythm:** `p-2`, `px-4 py-2`, `p-6` are the three most-used containers. Cards default to `p-6` header, `px-4 py-2` content, `p-2 pt-0` footer.
- **Gap rhythm:** `gap-1` (chat controls) / `gap-4` (page header bar) / `gap-12` (login stack).

### Radii
- `--radius: 0.5rem` (8px) base. Cards use `rounded-xl` (12px). **Buttons and rounded badges use `rounded-full` (pill)**. Inputs use `rounded-md`. Table cells use `rounded-sm`.

### Backgrounds
- **Login:** full-bleed raster `background.png` (`bg-tertiary` field with two soft spherical gradients — cyan top-left, purple bottom-right). `backgroundSize: 100% 100%` (no repeat, stretched).
- **App shell:** flat `muted-lightest` (near-white) on the nav, `white` on cards, `muted-lightest` or `white` on main. No app-wide imagery.
- **No hand-drawn illustrations, no textures, no repeating patterns.** The brand uses gradients (the `burst` gradient) as its only decorative motif, and only on logo / gradient buttons / gradient badges.

### Shadows
- Cards use `shadow` (Tailwind default = `0 1px 3px / 0 1px 2px`). Outline/nav-outline buttons use `shadow-md`. Login card uses **`shadow-md shadow-primary`** — a cyan-tinted glow on a deep-navy background. No inner shadows. No large dramatic shadows in the app itself.

### Borders
- Cards: `border bg-card` with `var(--border)` (`hsl(220 13% 91%)`, a light-gray hairline).
- Login card: `border-primary` (cyan 1px) — the only place the border picks up brand color.
- Nav: vertical divider `border-r border-nav-border`; horizontal dividers `border-b border-nav-border`.
- Page header: `rounded-t-none border-t-0` — it flush-mounts under a top bar.

### Animation & transitions
- **Minimal.** The codebase defines `layoutTransitionClassName` for the nav collapse (Tailwind's default `transition-colors` / `transition-all` durations — ~150ms). Buttons have `transition-colors`. No bounce, no parallax, no scroll-linked effects, no entrance animations. Dialogs and popovers use Radix's built-in fades.
- `tailwindcss-animate` is installed; primary usage is Radix overlay/content fades.

### Hover / press states
- **Buttons:** most variants simply keep their color with `focus-visible:ring-2 focus-visible:ring-ring` for accessibility. `destructive` adds `hover:bg-destructive/90`. `ghost` adds `hover:bg-muted-light`. `link` adds `hover:underline`. `tertiary-outline` softens to `hover:text-muted`. **There is no scale-on-press.** Disabled states are `opacity-50`.
- **Cards / nav items:** `bg-card-hover` (`rgba(209,219,236)` — pale blue-gray) on hover for list rows.
- **Icon buttons:** `hover:bg-gray-200` on the collapse toggle.

### Transparency & blur
- **No backdrop-blur in the code.** Transparent colors appear only as:
  - `--primary-light` (cyan @ 15%) as a pale tint background for link badges.
  - `--requirement-light` (amber @ 10%) as a pale tint for requirement badges.
  - Dialog overlays (Radix default, dark @ 80%).

### Cards
- Rounded 12px, 1px border `var(--border)`, flat `var(--card)` fill, `shadow` (single soft drop). Hover row `var(--card-hover)`.
- Card titles have **a pale gray fill `#EEE` and a `border-b` in `primary-dark` (dark teal)** — a distinctive codebase-specific header treatment; use `<CardTitle>` to get it.

### Imagery
- Limited to: logo marks (gradient flame), a chat-avatar (also gradient flame), and the login background (deep navy with soft spheres). **Cool palette throughout — cyan, purple, navy.** No warm imagery, no photography, no grain.

---

## Iconography

- **Library:** [`react-icons/pi`](https://react-icons.github.io/react-icons/icons?name=pi) — **Phosphor Icons**, imported per-icon. Observed usage:
  - **Burst nav:** `PiHouseSimple`, `PiCompassRose`, `PiStack`, `PiBank`.
  - **Value Network nav:** `PiHouseSimple`, `PiDatabase`, `PiSparkle`, `PiHeadCircuit`.
  - **Contract nav:** `PiHouseSimple`, `PiStack`.
  - **Filter:** `PiFunnelFill`, `PiX`.
  - **Shell / chat / creation:** `PiSidebarSimple`, `PiUserCircle`, `PiUpload`, `PiPlusBold`.
- **Style:** Phosphor Regular weight (the default). Thin, 1.5px stroke, rounded terminals, square-ish proportions. **Do not mix with Lucide/Heroicons/Feather** — Phosphor has a distinct voice.
- **Sizing token:** `h-[22px] w-[22px]` for nav items. `size={32}` for large empty-state affordances (e.g. upload icon). Button icon-size is `h-9 w-9`.
- **Icon color:** inherits from parent (`color="gray"` only on the collapse toggle). On nav items, icons take the text color of the nav row.
- **No custom SVG icon system, no icon font, no sprite.** Icons come directly from `react-icons`.
- **Emoji:** not used.
- **Unicode as icons:** not used.
- **Logos:** PNG rasters at `/public/images/` (now at `assets/`). The `<Logo>` component is used at sizes sm/md/lg/xl/xxl and supports an `altLogo` variant (wordmark with lighter glyph treatment for the open sidebar).

**This design system uses Phosphor Icons via CDN** in preview cards and UI kits: `https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css`.

---

## Font substitution

The upstream repo ships only two weights of **Sofia Pro** (Light + Medium). Those files are included in `fonts/` and referenced by `colors_and_type.css`. For weights not shipped (e.g. Bold for display headings), the CSS `font-face` declarations fall back to the nearest weight in-family, then to system sans. **If you need Semibold/Bold display weights, please drop the additional Sofia Pro woff2 files into `fonts/` and extend the `@font-face` rules.** Flagged.

---

## How to use this system

1. Link `colors_and_type.css` — you get every token and font as CSS variables.
2. Pull component patterns from `ui_kits/burst/` — these are HTML/JSX recreations of the real app components, with pixel-accurate spacing, colors, and radii lifted from the code.
3. For production code, read this README + `SKILL.md` and implement against the actual `phoenix-burst-ui` component library.
