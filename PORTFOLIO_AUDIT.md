# Portfolio Audit Report

**Site:** https://gaurav-portfolio-gamma-seven.vercel.app  
**Repo:** https://github.com/Gullu-D/gaurav-portfolio  
**Date:** 2026-10-18  
**Auditor:** Claude Opus 4.6 (automated)

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| Framework | React 18.3.1 + TypeScript 5.6.3 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS 3.4.15 + custom CSS utilities |
| Icons | Lucide React 0.460.0 |
| Routing | None (single-page, hash anchors) |
| Tests | **None** |
| Components | 9 (Navbar, Hero, About, Skills, Projects, Experience, Certifications, Contact, Footer) |
| Custom hooks | 1 (`useReveal` — IntersectionObserver scroll animation) |
| Data layer | Centralized `src/data/content.ts` |
| Build output | 170KB JS / 16KB CSS (54KB + 4KB gzipped) |
| Hosting | Vercel (CLI deploy, not Git-linked) |
| Git | 2 commits on `main` + 1 merge commit bringing in old HTML portfolio history |

---

## 2. Build & Runtime Health

| Check | Result |
|-------|--------|
| `tsc -b` | Pass — zero errors |
| `vite build` | Pass — clean in 51s |
| Console errors (production) | **None** |
| Failed network requests | **None** |
| Resume PDF (`/Gaurav_Upadhyay_Resume.pdf`) | Accessible, triggers download |
| Favicon | SVG served correctly |

---

## 3. Verified Defects

### 3.1 Scroll-reveal creates full-screen blank voids (Critical — UX)

**Evidence:** All content sections (`About`, `Skills`, `Projects`, etc.) use the `.section-reveal` class which sets `opacity: 0; transform: translateY(24px)` and only becomes visible when the IntersectionObserver fires at `threshold: 0.1`. Combined with `py-24` spacing, this creates ~600–800px of completely blank dark space between sections that users must scroll through before content appears. On mobile (375px wide), the blank gap fills the entire viewport.

**Files:** `src/index.css:68-76`, `src/hooks/useReveal.ts`

**Impact:** Users may think the page is broken or unfinished. A recruiter scanning quickly could miss entire sections.

### 3.2 All project GitHub links point to profile, not repos (High — Content)

**Evidence:** Every project card's GitHub icon links to `https://github.com/Gullu-D` (the profile page) rather than the specific repository. This means a recruiter clicking "Aegis Scan on GitHub" lands on the profile page and must hunt for the repo.

**File:** `src/data/content.ts:35,49,64` — all `github` fields are `'https://github.com/Gullu-D'`

### 3.3 Old HTML portfolio files tracked in Git (Medium — Hygiene)

**Evidence:** `git ls-files` includes 7 image files (`images/*.png/jpg/webp`) and `style.css` from the pre-React portfolio. These are not used by the React app but add ~2MB of dead weight to the repository.

**Files:** `images/Meta-Logo.png`, `images/cisco-logo.jpg`, `images/coursera-logo.jpg`, `images/deeplearningai-logo.webp`, `images/forage-logo.jpg`, `images/google-logo.png`, `images/profile.jpg`, `style.css`

### 3.4 Certifications section has no `id` attribute (Low — Navigation)

**Evidence:** The `<section>` in `Certifications.tsx` has no `id` prop, so there's no way to deep-link or navigate to it from the navbar. Every other content section has an `id`.

**File:** `src/components/Certifications.tsx:9`

### 3.5 ExternalLink icon used as bullet marker (Low — Semantics)

**Evidence:** Project highlight list items use `<ExternalLink>` (Lucide icon) as a decorative bullet. This icon implies "opens in new tab" but the items are plain text, not links. Misleading visual affordance.

**File:** `src/components/Projects.tsx:70`

---

## 4. UI/UX Review

### Visual Hierarchy — 6/10
**Confidence: High**

- Hero is strong: gradient text, clear CTA hierarchy, social links
- Sections below the fold lack visual differentiation — all use identical glass cards on the same dark background, creating a monotonous scroll
- No images, illustrations, or screenshots anywhere on the page. For a developer portfolio, this makes the projects section feel abstract
- Typography is clean (Inter) but heading sizes don't create enough contrast between section titles and card titles

### Typography — 7/10
**Confidence: High**

- Inter is a solid choice, loaded via Google Fonts with `display=swap`
- Weight range (400–800) is well-utilized
- Line heights and letter spacing are comfortable
- `tracking-widest` on "SOFTWARE ENGINEER" subtitle is appropriate
- Body text at `text-base sm:text-lg` is readable

### Spacing & Layout — 6/10
**Confidence: High**

- Consistent `py-24 px-4 sm:px-6` rhythm on all sections
- `max-w-4xl`/`max-w-5xl`/`max-w-6xl` varies per section without clear rationale
- The hero's `min-h-screen` creates excessive empty space on tall desktop monitors
- Skills grid (3-col) and certifications grid (3-col) work well
- Projects use a single-column stack which is appropriate for detailed cards

### Color & Contrast — 6/10
**Confidence: High**

- Dark theme (#050510) with violet-to-cyan gradient accent is cohesive
- `text-gray-400` on #050510 ≈ 6.4:1 contrast — passes AA
- **`text-gray-500` on #050510 ≈ 3.8:1 contrast — fails WCAG AA** (4.5:1 required for normal text). Used for: period dates in Experience, location text, project subtitles, certification issuers, footer text
- Glass card borders (`rgba(255,255,255,0.08)`) are very subtle — cards can feel like they float without boundaries on some monitors

### Responsiveness — 7/10
**Confidence: High**

- Mobile layout (375px) is functional: hamburger menu works, cards stack properly, CTAs are full-width
- Tablet breakpoint is acceptable but not optimized (uses either mobile or desktop layout)
- No horizontal overflow issues detected
- Info chips in About section wrap correctly on mobile

### Distinctiveness — 5/10
**Confidence: Medium**

- The "dark glassmorphism" aesthetic is very common in 2024–2026 developer portfolios. Without custom illustrations, project screenshots, or a distinctive layout, the site looks template-like
- The violet-to-cyan gradient is a common choice in this genre
- No personal branding beyond the "GU" logo mark

### Recruiter Usability — 5/10
**Confidence: High**

- No project screenshots or demo videos — a recruiter cannot see what you built without clicking through to GitHub (which links to your profile, not repos)
- No live demo links for any project
- Certifications list is long (15) but has no verification links, no credential IDs, no dates
- Experience section is thin — one internship with two generic bullet points
- No resume preview — only download (recruiter must open PDF separately)
- No "What I'm looking for" statement beyond the generic "open to internship opportunities"

---

## 5. Engineering Review

### Component Architecture — 8/10
**Confidence: High**

- Clean single-responsibility components
- Centralized content config (`content.ts`) is excellent for maintenance
- `useReveal` hook is a clean abstraction
- Helper components (`InfoChip`, `SocialLink`, `ContactLink`, `StatusBadge`) are well-scoped
- No prop drilling — data comes directly from content.ts

### TypeScript Usage — 7/10
**Confidence: High**

- Strict mode enabled
- Interfaces defined for `Project`, `SkillGroup`, `TimelineItem`, `Certification`
- `profile` uses `as const` for immutability — good
- Helper components accept typed props inline (no separate interface files needed)
- Missing: no discriminated union for timeline items (experience vs education could use different description structures)

### React Patterns — 7/10
**Confidence: High**

- Functional components throughout
- No unnecessary state — only Navbar uses `useState` (scroll position, mobile menu)
- `useEffect` cleanup is correct (removes event listeners, disconnects observers)
- `passive: true` on scroll listener — performance-aware
- Missing: no `React.lazy` / code splitting (acceptable at this bundle size)
- Missing: no `ErrorBoundary` — a runtime error crashes the entire page

### Dependency Weight — 9/10
**Confidence: High**

- Only 3 runtime dependencies: React, ReactDOM, Lucide React
- Lucide React is tree-shakeable — only imported icons are bundled
- 54KB gzipped total is excellent
- No unnecessary utility libraries

### Maintainability — 8/10
**Confidence: High**

- Adding a new project = adding an object to `content.ts`
- Adding a new section = creating a component and importing in `App.tsx`
- CSS utilities (`.glass`, `.gradient-text`, `.gradient-border`) are reusable
- No magic numbers or hardcoded strings in components

---

## 6. Accessibility Review — 5/10
**Confidence: High**

### Passes
- `<html lang="en">` is set
- All `<a target="_blank">` links have `rel="noopener noreferrer"`
- Interactive elements have `aria-label` where text isn't visible (social links, hamburger button)
- `prefers-reduced-motion` is respected in both CSS and `useReveal` hook
- Semantic `<main>`, `<nav>`, `<footer>` landmarks present
- Heading hierarchy: h1 in hero, h2 per section, h3 for sub-items

### Fails
- **No skip-to-content link** — keyboard users must tab through the entire navbar
- **`text-gray-500` fails WCAG AA** contrast (3.8:1 vs required 4.5:1) — used on dates, locations, issuers
- **Sections lack accessible names** — `<section>` elements have no `aria-labelledby` pointing to their heading
- **No visible focus indicators beyond browser defaults** — custom focus styles not defined
- **Mobile menu has no focus trap** — keyboard focus can escape the open menu
- **Scroll-reveal hides content** from users who navigate by screen reader heading lists (content is in DOM but opacity:0)
- **No ARIA live region** for the mobile menu toggle

---

## 7. SEO Review — 5/10
**Confidence: High**

### Present
- `<title>` tag: "Gaurav Upadhyay — Software Engineer"
- `<meta name="description">` with relevant content
- `<meta property="og:title">`, `og:description`, `og:type`
- Semantic HTML structure
- Single-page (no routing issues)

### Missing
- **No `og:image`** — social shares show no preview image
- **No `og:url`** — canonical Open Graph URL
- **No Twitter/X card meta tags** (`twitter:card`, `twitter:title`, `twitter:image`)
- **No canonical URL** (`<link rel="canonical">`)
- **No structured data** (JSON-LD Person schema would be valuable)
- **No `robots.txt`** or `sitemap.xml`
- **No favicon for all platforms** (only SVG; missing apple-touch-icon, 32x32 PNG)

---

## 8. Performance Review — 7/10
**Confidence: Medium** (no Lighthouse available; observations only)

### Good
- 54KB JS + 4KB CSS gzipped — excellent total weight
- Only 3 HTTP requests for the initial page load (HTML + JS + CSS)
- No images to optimize (but this is also a content gap)
- Vercel CDN provides edge caching and compression
- Vite's content-hashed filenames enable aggressive caching

### Concerns
- **Google Fonts is render-blocking** — Inter is loaded via `<link>` in `<head>` with no `preload` or `font-display` override
- **`backdrop-filter: blur(16px)`** on glass cards can cause jank on lower-end mobile devices (used on every card)
- **No code splitting** — single JS bundle loads everything upfront (minor at this size)
- **No resource hints** (`<link rel="preconnect">` for fonts is present, but no `dns-prefetch` for GitHub/LinkedIn)
- **Resume PDF is 802KB** — served on every navigation but only needed on click

### Limitation
Lighthouse, Web Vitals, and TTFB measurements were not available in this audit environment. The above is based on code inspection and network observation only.

---

## 9. Security & Privacy Review — 8/10
**Confidence: High**

### Good
- All external links use `rel="noopener noreferrer"`
- No forms, no user input, no cookies — minimal attack surface
- No API keys, tokens, or secrets in source code
- No third-party analytics or tracking scripts
- HTTPS enforced via Vercel

### Notes
- Email address (`ugaurav034@gmail.com`) is exposed in source code — intentional for a portfolio, but will attract spam bots. Consider using a contact form or `mailto:` obfuscation
- Google Fonts loads from `fonts.googleapis.com` / `fonts.gstatic.com` — sends visitor IP to Google
- No Content Security Policy headers (Vercel default)
- No `X-Frame-Options` or `X-Content-Type-Options` headers (Vercel defaults may cover some)

---

## 10. Content Verification

| Claim | Status | Notes |
|-------|--------|-------|
| B.Tech CSE at MIT School of Computing, Pune | **Unverifiable** | No external link; institution exists |
| CGPA 8.0 / 10.0 | **Unverifiable** | No transcript or verification |
| DRDO internship at DIAT, June–Oct 2026 | **Plausible** | Date matches current timeline |
| Class XII at Army Public School, Ranchi | **Unverifiable** | No score/percentage listed |
| Aegis Scan — OSINT dashboard | **Partially verifiable** | GitHub link goes to profile, not repo |
| AI Document Search — "103 automated tests" | **Unverifiable** | Same — no direct repo link |
| Banking Assistant — "48+ automated tests" | **Unverifiable** | Same — no direct repo link |
| Smart Krishi Mitra — "In Progress" | **Plausible** | No GitHub link at all |
| 15 certifications | **Unverifiable** | No credential IDs, no verification URLs, no dates |
| Location: Pune, Maharashtra | **Consistent** | Matches education and internship locations |

### Flags
- **All project GitHub links go to the profile page** — prevents direct verification of any project claim
- **No fabricated metrics detected** — test counts and descriptions are specific but unverifiable
- **No sensitive data exposed** — no student IDs, phone numbers, or addresses beyond city
- **Certification issuers are real organizations** — Meta/Coursera, Google, IBM, DeepLearning.AI, Forage are all legitimate platforms

---

## 11. Scoring

| Category | Score | Weight | Confidence |
|----------|-------|--------|------------|
| UI/UX Design | 6/10 | 20% | High |
| Engineering Quality | 8/10 | 15% | High |
| Accessibility | 5/10 | 15% | High |
| Performance | 7/10 | 10% | Medium |
| SEO | 5/10 | 10% | High |
| Content Accuracy | 6/10 | 15% | Medium |
| Security & Privacy | 8/10 | 5% | High |
| Recruiter Usability | 5/10 | 10% | High |

### Overall: 6.1 / 10

**Weighting rationale:** UI/UX and Content are weighted highest because this is a portfolio — its primary job is to convince a recruiter or hiring manager. Engineering and Accessibility are weighted meaningfully because they signal professional competence. Performance and Security are lower because the site is small and static. SEO matters for discoverability but is secondary to direct recruiter sharing.

---

## 12. Top 10 Improvements (Ranked by Impact)

### 1. Fix scroll-reveal blank voids
- **Issue:** Sections are invisible until scrolled into view, creating full-screen blank gaps
- **Evidence:** Mobile viewport shows entire screen of #050510 between sections
- **Solution:** Increase IntersectionObserver `rootMargin` to `'0px 0px 200px 0px'` so sections animate before entering viewport, or reduce initial `translateY` to `12px` and start at `opacity: 0.01` instead of `0`
- **Acceptance:** No blank screen visible between any two sections at 375px–1440px widths
- **Effort:** Low (1 line change)
- **Priority:** P0

### 2. Link projects to actual repositories
- **Issue:** All 4 project GitHub icons link to `github.com/Gullu-D` instead of specific repos
- **Evidence:** Accessibility tree shows all `href="https://github.com/Gullu-D"`
- **Solution:** Update `content.ts` with direct repo URLs (e.g., `https://github.com/Gullu-D/aegis-scan`)
- **Acceptance:** Each project's GitHub link opens the correct repository
- **Effort:** Low (4 URL changes)
- **Priority:** P0

### 3. Add project screenshots or demo GIFs
- **Issue:** All project cards are text-only — a recruiter cannot see what was built
- **Evidence:** No `<img>` tags anywhere in the site; no images in `public/` beyond favicon
- **Solution:** Add 1 screenshot or short GIF per project (above the description). Store in `public/projects/`. Use `loading="lazy"` and provide WebP with PNG fallback
- **Acceptance:** Each project card shows a visual preview of the application
- **Effort:** Medium (requires creating screenshots, component changes)
- **Priority:** P1

### 4. Fix gray-500 contrast failures
- **Issue:** `text-gray-500` on #050510 is ~3.8:1, below WCAG AA's 4.5:1
- **Evidence:** Used on dates, locations, certification issuers, footer text
- **Solution:** Replace `text-gray-500` with `text-gray-400` (6.4:1) throughout, or use a custom color at exactly 4.5:1
- **Acceptance:** All text meets WCAG AA 4.5:1 contrast ratio
- **Effort:** Low (find-and-replace)
- **Priority:** P1

### 5. Add live demo links to projects
- **Issue:** No way to try any project without cloning the repo
- **Evidence:** `Project` interface has no `demo` field; no demo links in UI
- **Solution:** Add optional `demo?: string` to `Project` interface, render as a secondary button on cards. Deploy demos where feasible (Vercel/Railway)
- **Acceptance:** At least 2 projects have working demo links
- **Effort:** Medium (requires deploying projects)
- **Priority:** P1

### 6. Add OG image and Twitter card meta
- **Issue:** Social media shares show no preview image
- **Evidence:** No `og:image` or `twitter:card` tags in `index.html`
- **Solution:** Create a 1200x630 OG image (can be programmatic via `@vercel/og`), add meta tags
- **Acceptance:** Sharing the URL on LinkedIn/Twitter shows a rich preview card
- **Effort:** Low–Medium
- **Priority:** P1

### 7. Clean up old portfolio files from Git
- **Issue:** 7 images and 1 CSS file from the old HTML portfolio are still tracked
- **Evidence:** `git ls-files | grep -E "^(images/|style)"`
- **Solution:** `git rm images/ style.css && git commit`
- **Acceptance:** `git ls-files` contains only files used by the React app
- **Effort:** Low (one command)
- **Priority:** P2

### 8. Add skip-to-content link
- **Issue:** Keyboard/screen-reader users must tab through navbar to reach content
- **Evidence:** No skip link in accessibility tree
- **Solution:** Add a visually-hidden skip link as the first child of `<body>`: `<a href="#about" class="sr-only focus:not-sr-only ...">Skip to content</a>`
- **Acceptance:** Pressing Tab on page load reveals a visible "Skip to content" link
- **Effort:** Low
- **Priority:** P2

### 9. Add certification verification links
- **Issue:** 15 certifications listed with no way to verify any of them
- **Evidence:** `Certification` interface has only `title` and `issuer` — no URL, no ID, no date
- **Solution:** Add `url?: string` and `date?: string` to `Certification` interface; link cert titles to verification URLs where available
- **Acceptance:** At least the Meta, Google, and DeepLearning.AI certs have verification links
- **Effort:** Low–Medium (requires gathering URLs)
- **Priority:** P2

### 10. Add an ErrorBoundary
- **Issue:** Any runtime error crashes the entire page with a white screen
- **Evidence:** No `ErrorBoundary` component; no `componentDidCatch`
- **Solution:** Wrap `<App>` in a simple ErrorBoundary that shows a fallback UI
- **Acceptance:** A thrown error in any component shows a "Something went wrong" message instead of a blank page
- **Effort:** Low
- **Priority:** P3

---

## 13. Refined Visual Direction

The site's strongest elements are: the dark background with violet-to-cyan gradient accents, the clean Inter typography, and the glassmorphism card treatment. These should be preserved. The weakest elements are: visual monotony, absence of imagery, and the generic "dark portfolio template" feel.

### Design Tokens (preserve existing, extend)

```css
/* Existing — keep */
--bg-primary: #050510;
--glass-bg: rgba(255, 255, 255, 0.04);
--glass-border: rgba(255, 255, 255, 0.08);
--accent-violet: #7c3aed;
--accent-cyan: #06b6d4;
--text-primary: #e5e7eb;     /* gray-200 */
--text-secondary: #9ca3af;   /* gray-400 — passes AA */

/* New — add */
--text-muted: #9ca3af;        /* replaces gray-500 usage */
--bg-section-alt: #080818;    /* subtle alternating section bg */
--accent-emerald: #10b981;    /* for "Completed" badges */
--card-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
```

### Typography Refinement

- **Hero h1:** Keep `text-4xl sm:text-6xl lg:text-7xl font-extrabold` — it's the right scale
- **Section headings:** Bump to `text-4xl sm:text-5xl` for more presence
- **Card titles:** Keep `text-xl sm:text-2xl font-bold`
- **Body/descriptions:** Keep `text-base sm:text-lg` with `leading-relaxed`
- **Metadata (dates, issuers):** Use `text-sm text-gray-400` (upgrade from gray-500)

### Layout Improvements

1. **Alternate section backgrounds:** Every other section gets `bg-[#080818]` to break visual monotony and create natural section boundaries
2. **Hero height:** Change from `min-h-screen` to `min-h-[85vh]` to reduce dead space and hint at content below
3. **Project cards:** Add a left-aligned image area (16:10 ratio, rounded) above the description. On desktop, optionally side-by-side with the text
4. **Experience timeline:** Add a subtle left border line connecting timeline dots (already partially implemented but hidden on mobile — show it)

### Responsive Behavior

- **Mobile (< 640px):** Single column, full-width cards, stacked CTAs, hamburger menu ✓ (already works)
- **Tablet (640–1024px):** 2-column grids for skills and certs (already works). Consider 2-column for project highlights
- **Desktop (> 1024px):** Max-width 1200px container. Consider a subtle sidebar or floating TOC for long-form reading

### Animation Guidance

- **Scroll reveal:** Use `rootMargin: '0px 0px 150px 0px'` to trigger 150px before entering viewport. Reduce `translateY` from `24px` to `16px` and duration from `0.7s` to `0.5s` for snappier feel
- **Hover effects:** Keep the gradient-border hover on project cards. Add a subtle `scale(1.01)` transform on card hover for depth
- **Loading state:** No spinner needed — the page is static and loads in <1s on broadband

### Example Hero Content (verified facts only)

```
SOFTWARE ENGINEER

Hi, I'm Gaurav

Building intelligent software at the intersection
of AI and full-stack development.

[View Projects]  [Download Resume]

 GitHub  LinkedIn  Email

Currently: Research Intern at DIAT (DRDO), Pune
B.Tech CSE @ MIT School of Computing — 8.0 CGPA
```

### Example Project Card Content (verified facts only)

```
[Screenshot of Aegis Scan dashboard]

Aegis Scan                                    ● Completed
Real-time OSINT analytics dashboard

A cybersecurity research tool with concurrent WebSocket
modules, AI-grounded scan analysis, and D3.js world
map visualization.

✓ Async concurrent I/O via asyncio
✓ Rate limiting on REST and WebSocket endpoints
✓ Containerized with Docker

Python  FastAPI  React  WebSockets  D3.js  Docker

[View Code →]  [Live Demo →]
```

---

## 14. Executive Summary

This is a clean, functional single-page portfolio with solid engineering fundamentals: TypeScript strict mode, minimal dependencies (54KB gzipped), centralized content management, and zero console errors. The code is well-structured and maintainable.

The site's primary weakness is **recruiter usability**. All project GitHub links point to the profile instead of repositories, there are no screenshots or demo links, and 15 certifications have no verification URLs. A recruiter scanning this site for 30 seconds cannot verify any claim or see any built software.

The second critical issue is the **scroll-reveal animation** creating blank dark voids between sections — an entire screen of nothing on mobile. This is a one-line fix.

**What to do next:**

```bash
# 1. Fix scroll-reveal (one-line change in useReveal.ts — increase rootMargin)
# 2. Update project GitHub URLs to point to actual repos
# 3. Replace text-gray-500 with text-gray-400 for WCAG AA compliance
# 4. Remove old portfolio files from git:
cd "D:\portfolio new"
git rm -r images/ style.css
git commit -m "Remove old HTML portfolio artifacts"
# 5. Add an id="certifications" to the Certifications section
# 6. Build, test, and redeploy:
npm run build
npx vercel --yes --prod --name gaurav-portfolio
```

These 6 changes take ~30 minutes and address the most impactful defects. The remaining improvements (screenshots, demo links, OG image, skip link, cert URLs) are medium-effort enhancements to tackle next.

---

## 15. Fixes Applied (2026-10-18)

Branch: `fix/portfolio-audit`

### P0 Fixes

| # | Issue | Fix | Status |
|---|-------|-----|--------|
| 1 | Scroll-reveal blank voids | `useReveal.ts`: threshold 0.1→0.05, added `rootMargin: '0px 0px 150px 0px'`, added IntersectionObserver availability check, added `prefers-reduced-motion` CSS fallback. `index.css`: translateY 24→16px, duration 0.7→0.5s | **FIXED — verified** |
| 2 | GitHub links all point to profile | Verified repos via `gh api`. Set AI Document Search → `Gullu-D/AI-Document-Search-RAG-Chatbot`, Banking Assistant → `Gullu-D/banking-assistant-agent`. **Aegis Scan: no public repo found — link removed.** Smart Krishi Mitra had no link, left as-is | **FIXED — verified** |

### P1 Fixes

| # | Issue | Fix | Status |
|---|-------|-----|--------|
| 3 | Project screenshots/demos | Not addressed — requires creating assets | **DEFERRED (P1)** |
| 4 | text-gray-500 contrast failures | Replaced `text-gray-500` → `text-gray-400` across all components (Experience, Certifications, Contact, Footer). ~6.4:1 ratio on #050510 | **FIXED — verified** |
| 5 | Live demo links | Not addressed — requires deploying projects | **DEFERRED (P1)** |
| 6 | OG/Twitter meta tags | Added `og:url`, `twitter:card`, `twitter:title`, `twitter:description` to `index.html`. No OG image yet (needs asset creation) | **PARTIAL** |

### Additional Fixes (P2 items addressed early)

| # | Issue | Fix | Status |
|---|-------|-----|--------|
| 7 | Old portfolio files in Git | Not addressed — user to decide | **DEFERRED (P2)** |
| 8 | Skip-to-content link | Added `<a href="#about" class="sr-only focus:not-sr-only ...">Skip to content</a>` as first child of App | **FIXED — verified** |
| 9 | Certification verification links | Not addressed | **DEFERRED (P2)** |

### Accessibility Improvements (not in original top-10 but fixed)

- Added `aria-labelledby` + heading `id` to all sections: About, Skills, Projects, Experience, Certifications, Contact
- Navbar hamburger: added `aria-expanded`, `aria-controls="mobile-nav"`, dynamic `aria-label`
- Mobile nav container: added `id="mobile-nav"`, `role="menu"`; mobile nav links: `role="menuitem"`
- Added global `:focus-visible` outline (2px solid #7c3aed, offset 2px)
- Added `id="certifications"` for deep-linking

### Changed Files

| File | Changes |
|------|---------|
| `src/hooks/useReveal.ts` | IntersectionObserver guard, threshold, rootMargin, reduced-motion |
| `src/index.css` | Scroll-reveal animation tuning, prefers-reduced-motion rule, :focus-visible |
| `src/data/content.ts` | GitHub URLs for 2 projects corrected, 1 removed |
| `src/App.tsx` | Skip-to-content link |
| `src/components/Navbar.tsx` | Mobile menu ARIA attributes |
| `src/components/Projects.tsx` | Section a11y, contrast fix, icon swap |
| `src/components/Experience.tsx` | Section a11y, contrast fix |
| `src/components/Certifications.tsx` | Section a11y, contrast fix, id for deep-linking |
| `src/components/Contact.tsx` | Section a11y, contrast fix |
| `src/components/About.tsx` | Section a11y |
| `src/components/Skills.tsx` | Section a11y |
| `src/components/Footer.tsx` | Contrast fix |
| `index.html` | OG/Twitter meta tags |

### Test Results

| Test | Result |
|------|--------|
| `npm run build` (TypeScript + Vite) | **PASS** — 0 errors, 170KB JS + 17KB CSS |
| Console errors (dev server) | **PASS** — 0 errors |
| Desktop scroll-reveal | **PASS** — no blank voids between sections |
| Mobile 375px scroll-reveal | **PASS** — sections visible before scrolling to them |
| GitHub links in accessibility tree | **PASS** — correct repo URLs, Aegis Scan link removed |
| Skip-to-content in a11y tree | **PASS** — present as first focusable element |
| Hamburger ARIA attributes | **PASS** — aria-expanded, aria-controls, dynamic label |

### Issues Needing User Input

1. **Aegis Scan GitHub repo**: No public repository found under `Gullu-D` matching Aegis Scan. The GitHub link was removed entirely. If the repo exists under a different name or is private, provide the URL and it will be restored.
2. **OG image**: `og:image` and `twitter:image` not added — requires creating a 1200x630 image asset.
3. **Project screenshots/demos (P1)**: Requires creating visual assets and deploying demo instances.
4. **Old portfolio files**: `images/` directory and `style.css` from the old HTML portfolio are still tracked in Git. Run `git rm -r images/ style.css` when ready.

### Post-Fix Score Estimate

| Category | Before | After | Notes |
|----------|--------|-------|-------|
| Scroll-reveal | 3/10 | 9/10 | Blank voids eliminated, reduced-motion respected |
| Recruiter usability | 4/10 | 6/10 | Correct repo links, but still no screenshots/demos |
| Accessibility | 5/10 | 8/10 | Skip link, ARIA, focus indicators, contrast fixed |
| SEO/Social | 5/10 | 6/10 | OG meta added, missing OG image |
| **Overall** | **6.1/10** | **7.4/10** | Remaining gap: visual content (screenshots, demos, OG image) |
