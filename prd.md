# PRD: zkhowes.me Personal Homepage

**Version:** 1.0  
**Author:** Zach Howes  
**Status:** Draft  

---

## 1. Vision

`zkhowes.me` is Zach Howes' personal home page and evolving internet brand. The site must be minimal, secure, and visually distinctive from day one — with a design language rooted in the Leuchtturm 1917 dot notebook aesthetic. It should feel like a page torn from a brainbook, not a generic developer portfolio.

---

## 2. Goals

- Establish a personal internet presence under the `zkhowes` identity
- Create a distinctive, memorable aesthetic that reflects the owner's personality
- Keep the codebase simple, secure, and easy to extend over time
- Achieve good search engine visibility as a personal brand / portfolio presence

---

## 3. Non-Goals (v1)

- Blog or CMS functionality
- Authentication or user accounts
- Analytics dashboard
- Dynamic back-end (site is fully static)

---

## 4. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Domain | zkhowes.me (via Hover.com) |
| Repo | github.com/zkhowes/zkhowes-homepage |
| Dev port | `localhost:3001` (avoids conflict with other active projects on 3000) |
| Resume hosting | PDF hosted directly in `/public` directory, served via Vercel |

---

## 5. Design System

### 5.1 Concept

The site should feel like an open Leuchtturm 1917 dot notebook — the owner's "brainbook." The viewer is looking at a page from inside the notebook, with the navy cover visible as a border on three sides (top, right, bottom).

### 5.2 Background

- **Dot grid paper:** Off-white/cream background (`#F5F0E8` or similar warm paper tone) with a CSS-generated dot grid pattern. Dots should be subtle — small radius, low-opacity dark ink color, evenly spaced (~20px grid).
- **Notebook cover border:** Navy/midnight blue (`#1B2A4A` or similar) visible as a border on the **top, right, and bottom** edges only. Left edge is open (like a page lying flat). Border width should be approximately 5% of the viewport on each side.
- The left side has no cover border — it represents the open spine of the notebook.

### 5.3 Typography

- **Header / ZKHOWES logotype:** Custom SVG recreation of the hand-drawn block lettering from the reference sketch. Letters should feel architectural and hand-inked — thick strokes, slightly irregular, like someone drew them with a felt-tip pen and a ruler. Not a web font — this is a bespoke SVG asset.
- **Navigation menu:** Hand-drawn style to match the header. Each menu item preceded by a small hand-drawn checkbox `□` (as seen in the sketch). Use a font such as **Caveat** (Google Fonts) or **Patrick Hand** for nav and body text to reinforce the handwritten notebook feel.
- **Body text:** Same handwritten-style font. Keep font size comfortable for reading (~16–18px).
- **All text color:** Dark ink (`#1A1A1A` or near-black) to simulate pen on paper.

### 5.4 Layout

```
┌─────────────────────────────────────────────────┐  ← Navy top border (5vh)
│                                                 │
│  □ ABOUT      Z K H O W E S  [SVG]             │  ← Header row
│  □ CONTACT                                      │
│  □ FUN        ┌──────────────────────────────┐  │
│               │                              │  │
│               │  < BODY >                    │  │
│               │                              │  │
│               └──────────────────────────────┘  │
│               ┌──────────────────────────────┐  │
│               │  < FOOTER >                  │  │
│               └──────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘  ← Navy bottom border (5vh)
                                              ↑
                                   Navy right border (5vw)
```

- Left column: navigation (fixed or sticky)
- Right/main column: ZKHOWES header SVG on top, body content below, footer at bottom
- Body and footer regions have a light hand-drawn border (thin, slightly imperfect rectangle) matching the sketch

### 5.5 Security Hardening

- Content Security Policy (CSP) headers via `next.config.js`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- No third-party scripts except Google Fonts (loaded with `display=swap`)
- No forms, no user input fields, no server-side execution surface
- Resume PDF served as a static asset — no dynamic file serving

---

## 6. Pages & Content

### 6.1 Home (`/`)

**Navigation:** Default landing page. Also accessible by clicking the ZKHOWES header SVG from any page.

**SEO Meta:**
```
<title>ZKHOWES — Zach Howes</title>
<meta name="description" content="Personal home page of Zach Howes — technologist, builder, and brainbook enthusiast." />
<meta property="og:title" content="ZKHOWES — Zach Howes" />
<meta property="og:description" content="Personal home page of Zach Howes." />
<meta property="og:url" content="https://zkhowes.me" />
```

**Body Content:**

> Hello, my name is Zach Howes. My first internet alias assigned to me was ZKHOWES (my middle initial is 'K'). I've basically used this alias everywhere I've been since (note: not a great idea for internet security, but it has kind of became a part of my identity). I'm pretty obsessed with dot notebooks. My favorite are Leuchtturm1917. I go through one about a quarter. The idea of my website was just to make it look like a page out of my notebooks. 

---

### 6.2 About (`/about`)

**Navigation:** "ABOUT" in left nav.

**SEO Meta:**
```
<title>About — ZKHOWES</title>
<meta name="description" content="Zach Howes: husband, father, technologist, tinkerer. 20+ years in product and engineering." />
```

**Body Content:**

I'm first and foremost a husband to Amanda and Father to Izzy and Roz. I'm also a technologist with a broad range. I'm proud of roles where I was a Developer in large scale consumer services, a GPM for Microsoft Defender, and a Senior Director of Product at The Trade Desk.

📄 [Download my resume](#) *(link to `/resume.pdf` hosted in `/public`)*  
[![LinkedIn](linkedin-icon) Find me on LinkedIn](https://www.linkedin.com/in/zkhowes/) *(render as LinkedIn logo icon, not plain text)*

I also have a broad range of personal interests that generally lend towards learning, building things (digital, physical, art), and anything that gets me outside.

- 🎿 Skiing, Hiking, Hunting
- 🚐 Vanlife, Old Porsches
- 🛥️ Boating, Fishing, Crabbing, Clamming
- 🐓 Backyard chickens, gardening
- 🎨 Drawing, Watercolor, Video Editing
- 🧠 Reading, building, learning, info-voring, travel, hobbies

*(Emoji replaces bullet point — render as a styled list where each emoji leads the line)*

---

### 6.3 Contact (`/contact`)

**Navigation:** "CONTACT" in left nav.

**SEO Meta:**
```
<title>Contact — ZKHOWES</title>
<meta name="description" content="Get in touch with Zach Howes." />
```

**Body Content** *(ordered list)*:

1. 😎 zkhowes 'at' hotmail.com  
   *(One of my first jobs was working on Hotmail. I learned so much so I still rep the email address proudly.)*
2. 🤓 [linkedin.com/in/zkhowes](https://www.linkedin.com/in/zkhowes)

**Implementation note:** Do not render the email as a `mailto:` link or plain `zkhowes@hotmail.com` string — use the obfuscated "at" format to reduce spam harvesting.

---

### 6.4 Fun (external redirect)

**Navigation:** "FUN" in left nav.

**Behavior:** Clicking "FUN" navigates directly to `https://zkhowes.fun` (external link, opens in new tab).

**About zkhowes.fun:** A companion site and creative portfolio showcasing personal projects, experiments, and tools built for fun. Distinct from the professional tone of `zkhowes.me`. Known projects include:

- **Bwiz** — trivia game project (in development)
- **Bookshelf Generator** — generates a realistic bookshelf image for use as a Zoom background (concept stage)
- *More to be added as projects are built*

A separate PRD will govern `zkhowes.fun`. The two sites share the `ZKHOWES` identity but can diverge in tone — `zkhowes.me` is the brainbook, `zkhowes.fun` is the sketchpad.

---

## 7. Assets

| Asset | Description | Location |
|---|---|---|
| `zkhowes-header.svg` | Hand-drawn SVG recreation of the ZKHOWES block lettering from the reference sketch | `/public/images/` |
| `resume.pdf` | Latest resume (Zach Howes, Nov 2025) | `/public/resume.pdf` |
| Favicon | Simple `ZK` monogram or dot-grid motif | `/app/favicon.ico` |

---

## 8. SEO & Discoverability

- Target identity: **Zach Howes, technologist and product leader**
- Primary keywords: `Zach Howes`, `ZKHOWES`, `product management`, `adtech`, `Microsoft Defender`, `The Trade Desk`
- `robots.txt`: Allow all crawlers
- `sitemap.xml`: Auto-generated via Next.js
- Open Graph tags on all pages (see per-page meta above)
- Canonical URLs set on all pages

---

## 9. File & Folder Structure (suggested)

```
zkhowes-homepage/
├── app/
│   ├── layout.tsx          # Root layout with nav, header, notebook shell
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── NotebookShell.tsx   # Dot paper background + navy border wrapper
│   ├── Header.tsx          # ZKHOWES SVG + clickable home link
│   └── Nav.tsx             # Left nav with checkbox-style items
├── public/
│   ├── images/
│   │   └── zkhowes-header.svg
│   └── resume.pdf
├── next.config.js          # Security headers
├── tailwind.config.ts
├── PRD.md                  # This document
└── package.json            # dev script runs on port 3001
```

---

## 10. Open Items / Future Iterations

- [ ] Finalize resume PDF and add to `/public`
- [ ] Decide on favicon design
- [ ] Create separate PRD for `zkhowes.fun` creative portfolio site (known projects: Bwiz, Bookshelf Generator)
- [ ] Consider adding a `robots.txt` exclusion for any future private pages
- [ ] Light/dark mode (notebook day vs. night — could be a fun future feature)
- [ ] Figma design file as source of truth for future visual iterations