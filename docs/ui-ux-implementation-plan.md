# Implementation Plan: `/ui-ux` Bento Case Study Portfolio Route

> **Target URL:** `https://1frazel.github.io/Web-Portfolio-Adib-Aulia/ui-ux`  
> **Design Style:** Modern Bento Box Grid Layout (matching the Portfolio of Works slides)  
> **Color Palette:** Primary Blue `#7DAEE9` + Accent Orange `#FF9842`  
> **Navigation:** Preserves the signature floating bottom dock navigation bar from the main page

---

## 1. Routing & GitHub Pages Deployment Architecture

Because GitHub Pages is a static host, visiting `/Web-Portfolio-Adib-Aulia/ui-ux` directly or refreshing the page requires static route support alongside client-side routing.

### Planned Solution:
1. **Route Detection & Navigation (`src/App.jsx`):**
   - Detect whether the current URL path ends with `/ui-ux` (or `/ui-ux/`) relative to Vite's `import.meta.env.BASE_URL` (`/Web-Portfolio-Adib-Aulia/` in production, `/` in development).
   - Provide a smooth client-side route switcher (`navigateTo('/ui-ux')` and `navigateTo('/')` using `window.history.pushState` + `popstate` listener) so switching between the Main Portfolio and the UI/UX Portfolio is instant without requiring extra heavy dependencies.
2. **Zero-404 GitHub Pages Build Hook (`vite.config.js`):**
   - Add a lightweight custom Vite `closeBundle` plugin in `vite.config.js` that automatically copies `dist/index.html` to:
     - `dist/ui-ux/index.html` (ensures GitHub Pages returns `200 OK` directly for `/Web-Portfolio-Adib-Aulia/ui-ux` and `/Web-Portfolio-Adib-Aulia/ui-ux/`)
     - `dist/404.html` (fallback safety net for any sub-routes)
3. **Cross-Linking Between Pages:**
   - Add a **"UI/UX Case Studies"** CTA button in the main page's Header (`CTA.jsx`) and Project section so visitors on the main page can easily discover `/ui-ux`.
   - Include a **"Main Portfolio"** return link inside the `/ui-ux` Hero and floating Navigation bar.

---

## 2. Visual Design System & Color Palette (`/ui-ux`)

The `/ui-ux` route will apply a scoped theme class (`body.uiux-mode`) so it overrides the main page's dark concrete background without affecting `/` when navigating back.

### Color Tokens:
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--uiux-blue` | `#7DAEE9` | Primary brand color, featured bento card backgrounds, borders, active nav pill, progress bars |
| `--uiux-blue-dark` | `#2B5B94` | Deep blue for high-contrast gradient bento cards, headings, and secondary badges |
| `--uiux-blue-soft` | `#EAF3FC` | Soft blue surface tint for secondary bento cells and icon containers |
| `--uiux-orange` | `#FF9842` | Primary accent for tags, CTA buttons, key metric highlights, active indicators, and hover states |
| `--uiux-orange-soft` | `#FFF2E6` | Warm light orange tint for badge backgrounds and callout pills |
| `--uiux-bg` | `#F4F8FC` | Airy, clean background canvas that makes white and blue bento cards pop |
| `--uiux-card-bg` | `#FFFFFF` | Primary bento card surface with subtle border `rgba(125, 174, 233, 0.28)` and soft elevation shadow |
| `--uiux-text-main` | `#16253B` | Crisp dark navy-slate typography for high readability |
| `--uiux-text-muted` | `#526580` | Secondary body copy and captions |

### Bento Grid Mechanics:
- **12-Column CSS Grid (`grid-template-columns: repeat(12, 1fr)`)** with `1.25rem` (`20px`) gap and `1.5rem` (`24px`) rounded corners (`border-radius`).
- Responsive breakpoints:
  - **Desktop (`> 1024px`):** Full 12-column asymmetric Bento spans (`col-span-8`, `col-span-4`, `col-span-6`, `col-span-3`).
  - **Tablet (`600px – 1024px`):** 6-column / 2-column adaptive Bento cards.
  - **Mobile (`< 600px`):** Single-column stacked Bento cards with comfortable touch targets and bottom padding for the floating nav.

---

## 3. Preserving the Floating Bottom Navigation Bar

We will keep the signature floating bottom dock (`nav` with `backdrop-filter: blur(15px)`, rounded pill container at `bottom: 2rem`, circular icon buttons) and adapt it for `/ui-ux`:
- **Scroll-Spy Sections on `/ui-ux`:**
  1. `#uiux-hero` — **Home / Intro** (`AiOutlineHome`)
  2. `#uiux-process` — **UX Process & Skills** (`BiUser` / `BsLayers`)
  3. `#case-resumeez` — **01: Resumeez** (`TbFileCheck` / `BsBookmarkStar`)
  4. `#case-kompas` — **02: Kompas.com** (`BiNews` / `FaRegFolder`)
  5. `#case-recipeez` — **03: Recipeez** (`MdOutlineRestaurantMenu` / `BsPencilSquare`)
  6. `#uiux-more` — **99 Group & RAiso** (`GoGear`)
  7. `#uiux-contact` — **Contact** (`BiPhoneCall`)
- **Active State:** Uses `--uiux-orange` (`#FF9842`) / `--uiux-blue` (`#7DAEE9`) highlight with tooltips on hover so users know which case study they are jumping to.
- **Main Portfolio Switcher:** Includes a dedicated icon/divider at the end of the dock to jump back to `/` (Main Portfolio).

---

## 4. Page Sections & Bento Content Structure

### Section 1: Hero & Designer Positioning Bento (`#uiux-hero`)
- **Main Hero Cell (Span 8):**
  - Orange pill badge: `UI/UX & Product Design Portfolio`
  - Headline: **M. Adib Aulia Nurkhafif**
  - Positioning statement (from newest CV): *"Develops user-centric web and mobile solutions by bridging interactive UI/UX design with responsive frontend engineering in cross-functional teams."*
  - Action Buttons: `Explore Case Studies` (`#FF9842` primary button), `Download Latest CV` (PDF), `← Main Dev Portfolio`.
- **Profile & Credentials Cell (Span 4):**
  - Profile photo (`IMG_PP-edit-bg.png` / `adib.png`), BINUS University CS (`GPA 3.60/4.00`), Frontend Engineer Intern @ **99 Group**.
- **At-a-Glance Metric Bento Row (4 × Span 3 Cards):**
  - `3 End-to-End Case Studies` (Web App, News Portal, Mobile App)
  - `83.4% UAT Approval` (Validated with 30 real users)
  - `69.83 SUS Score` (Grade C+, Above 68.0 Global Average)
  - `Design → Code` (Figma & Axure RP to React, Next.js, TypeScript & Android)

### Section 2: UX Methodology & Toolkit Bento (`#uiux-process`)
- **4-Stage Design Process Bento Cards:**
  1. **01. Research & Discovery:** Onsite Interviews, Persona Mapping, Competitive Benchmarking
  2. **02. IA & Structure:** Sitemaps, Taskflows, Shneiderman's 8 Golden Rules, Hannafin & Peck R&D
  3. **03. Wireframing & Prototyping:** Hand-Sketching, Figma Interactive Prototypes, Axure RP, Progressive Disclosure
  4. **04. Usability Testing & Engineering:** SUS Evaluation, UAT, Blackbox QA, Production Frontend Implementation

### Section 3: Case Study 01 — Resumeez (`#case-resumeez`)
- **Bento Header Card (Span 12):**
  - Badge: `PROJECT 01 | WEB APPLICATION` (`#FF9842`)
  - Title: **Resumeez — ATS Resume Builder & Rule-Based Evaluator**
  - Metadata Pills: `Role: UI/UX Designer & QA Lead (Team of 3)` | `Methods: Hannafin & Peck R&D, Shneiderman's 8 Golden Rules` | `Stack: Figma, React, Vite, TypeScript, PDF.js, Firebase`
  - CTA: [Live Web App ↗](https://portfolio-thesis.firebaseapp.com/)
- **Problem vs. Solution Bento Row (Span 6 + Span 6):**
  - **The Problem:** Flaws of Existing Campus CV Generators (`1. Inefficient Spatial Layout across 5 pages`, `2. Rigid Structure lacking achievements`, `3. Zero ATS Feedback`).
  - **The Solution:** Preventive Formatting + Rule-Based Scoring (`1. Standardized 6-Section CV Builder`, `2. Automated Regex & PDF.js CV Checker with ≥5 valid words threshold`).
- **Design Decisions Bento Row (Span 7 + Span 5):**
  - **7-Step Guided Wizard & Split-Screen Builder:** Interactive step indicator (`Personal Info` → `Work Experience` → `Education` → `Areas of Expertise` → `Profile Summary` → `Additional Sections` → `Finish Up`), Real-Time JSON-to-DOM Live Preview, Proactive Mandatory Field & State-Lock Validation, Bilingual `Indonesia | English` Toggle.
  - **Explainable ATS Checker UI:** Visual breakdown of the 3 states:
    - 🟢 `Complete (≥5 valid words)`
    - 🟠 `Header-Only Warning (<5 words)`
    - 🔴 `Missing Section`
- **Validation Metrics & Iterations Bento Row (3 Metric Cards + 3 Iteration Cards):**
  - Metrics: **83.4% UAT** (30 respondents), **69.83 SUS (Grade C+)**, **18/18 Blackbox QA & XSS Passed** (`10k` chars & `5MB` limit).
  - Iterations (Turning 30% User Friction into UX Improvements):
    1. *Fixing Accidental Double Downloads* (Decoupling preview state from auto-download trigger)
    2. *Lexical Language Barrier* (Adding English NLP ATS onboarding tooltips)
    3. *Browser Autofill & Input Ergonomics* (Replacing manual date/city text inputs with Dropdown Selectors)
- **Visual Case Study Gallery (`src/assets/ui-ux/`):**
  - Interactive Bento showcase displaying:
    - `Resumeez - page 1.png` (Overview, Problem & Solution)
    - `Resumeez - page 2.png` (Design Decisions & Shneiderman's 8 Golden Rules)
    - `Resumeez - page 3.png` (Testing, Metrics & UX Iterations)
    - `Resumeez - page 4.png` (Resumeez at a Glance Bento Summary)
  - Clicking any board opens a **Full-Screen High-Res Lightbox Modal** with next/prev navigation.

### Section 4: Case Study 02 — Kompas.com Redesign (`#case-kompas`)
- **Bento Header Card (Span 12):**
  - Badge: `PROJECT 02 | UX RESEARCH & NEWS PORTAL REDESIGN`
  - Title: **Kompas.com — UX Research & News Portal Redesign**
  - Metadata Pills: `Role: UI Designer & UX Researcher (Team of 5)` | `Methods: Onsite User Interviews, Persona Mapping, Sitemap, Taskflow, Low-Fi Sketching` | `Stack: Figma, Draw.io`
- **Discovery & Core Challenge Bento Row (Span 5 + Span 7):**
  - **3 Personas & Behavioral Insight:** Interviews with *Janice (20, Student)*, *Aisha (31, Lecturer)*, and *Anton (39, Shopkeeper)* revealing the *"TikTok/IG-to-Kompas"* verification habit and 3 pain points: `1. Intrusive Ad Clutter`, `2. Irrelevant Photos`, `3. Reading Exhaustion`.
  - **Core Challenge (Ergonomics + Monetization) & IA:** Redesigning information hierarchy and whitespace distribution without removing commercial ad slots; Category Sitemap grouping *Lifestyle, Health, Food, Education*; Taskflow separating reading/search from login-gated comments & subscriptions.
- **UI Redesign Decisions & Impact Bento Row (Span 4 + Span 4 + Span 4):**
  - **Low-Fi Wireframes & Ad Zoning:** Utility Header (Dark/Light Mode toggle, Trending Word, Subscribe, Search), Modular Grid, Isolated Ads.
  - **Key Decision #1 — Breathable Homepage:** Extra whitespace, bounded `1140×200` top & `260×150` sidebar ad slots, clear headline hierarchy.
  - **Key Decision #2 — News Detail & User Page:** Top-to-bottom reading flow reducing exhaustion + streamlined Desktop User Page.
- **Visual Case Study Gallery (`src/assets/ui-ux/`):**
  - Displays `kompas - page 1.png` and `kompas - page 2.png` with click-to-zoom lightbox support.

### Section 5: Case Study 03 — Recipeez (`#case-recipeez`)
- **Bento Header Card (Span 12):**
  - Badge: `PROJECT 03 | MOBILE UI/UX & ANDROID DEVELOPMENT`
  - Title: **Recipeez — API-Driven Recipe Finder & Smart Meal Planner**
  - Metadata Pills: `Role: Solo UI/UX Designer & Android Developer` | `Methods: Competitive Benchmarking, IA Flowcharts, Waterfall SDLC` | `Stack: Figma, Java, XML, Android Studio, Spoonacular API, Retrofit, SQLite`
  - CTA: [Early Access App (v0.0.1-alpha) ↗](https://github.com/1Frazel/Recipeez/releases/tag/v0.0.1-alpha)
- **Benchmarking & Architecture Bento Row (Span 6 + Span 6):**
  - **Competitive UX Audit (5 Apps):** Audited *Yummly, Mealime, Paprika, Whisk, CookBook* to map Spoonacular API into `1. Multi-Parameter Filtering (Calories, Macros, 14 Cuisines, 7 Diets)`, `2. Tabbed Hierarchy`, and `3. Fridge-First Ingredient Search`.
  - **5 Core User Flows & Progressive Disclosure:** Dual Search branching Name vs. Ingredient search into `filter_bottom_sheet`; Smart Meal Planner supporting 3x daily calorie-based Surprise Meal Planning & manual slots linked to Ingredients Cart.
- **Mobile UI & Engineering Execution Bento Row (Span 4 + Span 4 + Span 4):**
  - **Key Decision #1 — Homepage & Recipe Browser:** High-contrast 2-column visual grid with quick Save & Cart actions; Dual Search & Filter Sheet.
  - **Key Decision #2 — Segmented Details & Cookbook:** 3-tab view (`Overview`, `Ingredients`, `Directions`) eliminating infinite scroll while cooking; Personalized Cookbook (`Breakfast`, `Lunch`, `Dinner`, `Meal Plan`); 5-tab bottom navbar.
  - **12-Week Solo Android Build:** 5-stage Waterfall SDLC, Retrofit + Glide async pagination, SQLite/Room offline saved recipes.
- **Visual Case Study Gallery (`src/assets/ui-ux/`):**
  - Displays `Recipeez - page 1.png` and `Recipeez - page 2.png` with click-to-zoom lightbox support.

### Section 6: Additional UI/UX & Industry Work Bento (`#uiux-more`)
- **Card 1 (Span 6) — 99 Group (Rumah123.com) Frontend & UI Engineering (`02/2025 – 02/2026`):**
  - Cross-device responsive `HeaderV2` navigation, New Search Result Page (NSRP), advanced filtering, Nearby POI components, and Strapi CMS property review module in React, Next.js, and TypeScript.
- **Card 2 (Span 6) — RAiso Stationery E-Commerce App:**
  - End-to-end Android e-commerce UX/UI for stationery products (catalog browsing, cart management, checkout flows), translating high-fidelity interactive **Axure RP** prototypes into Java Android views.

### Section 7: Contact & Footer (`#uiux-contact`)
- Bento-styled Contact section (Email, WhatsApp, LinkedIn, plus the live EmailJS form) and Footer links.

---

## 5. Planned File Structure

```text
HCI-Final-Project-Adib/
├── docs/
│   ├── cv-knowledge-base.md
│   ├── ui-ux-portfolio-case-studies.md
│   └── ui-ux-implementation-plan.md      <-- Exported Markdown Plan
├── src/
│   ├── assets/
│   │   └── ui-ux/                        <-- Case study slide images (Resumeez, Kompas, Recipeez)
│   ├── components/
│   │   ├── uiux/
│   │   │   ├── UiUxPage.jsx              <-- Main /ui-ux Bento page component
│   │   │   ├── UiUxNav.jsx               <-- Floating bottom nav bar adapted for /ui-ux sections
│   │   │   └── uiux.css                  <-- Scoped Bento Box & #7DAEE9 / #FF9842 styling
│   │   └── header/
│   │       └── CTA.jsx                   <-- Add button linking to /ui-ux
│   └── App.jsx                           <-- Route handler between '/' and '/ui-ux'
└── vite.config.js                        <-- Build plugin copying index.html -> dist/ui-ux/index.html & dist/404.html
```

---

## 6. Verification & Deployment Readiness Checklist
1. **Local Dev Test:** Verify `/` and `/ui-ux` render properly, theme switching is clean, all 8 case study images in `src/assets/ui-ux/` load with lightbox zoom, and the floating nav highlights active sections on scroll.
2. **Production Build Verification (`npm run build`):** Confirm `dist/ui-ux/index.html` and `dist/404.html` are generated cleanly with zero broken asset paths under `/Web-Portfolio-Adib-Aulia/`.
3. **Ready to Deploy:** Ready for `npm run deploy` (`gh-pages -d dist`).
