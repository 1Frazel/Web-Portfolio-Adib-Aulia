# M. Adib Aulia Nurkhafif — UI/UX Portfolio Case Studies Knowledge Base

> **Purpose:** Complete, slide-by-slide structured breakdown of the 9-page **Portfolio of Works** PDF. Use this file as the primary content & structure reference when designing and building the `https://1frazel.github.io/Web-Portfolio-Adib-Aulia/ui-ux` route.

---

## Overview of Featured Case Studies

| # | Project Title | Subtitle / Core Value | Role | Color Theme |
| :- | :--- | :--- | :--- | :--- |
| **01** | **Resumeez** | ATS Resume Builder & Rule-Based Evaluator | UI/UX Designer & QA Lead (Team of 3) | Royal / Navy Blue (`#1e3a8a`, `#1d4ed8`, `#0f172a`) |
| **02** | **Kompas.com** | UX Research & News Portal Redesign | UI Designer & UX Researcher (Team of 5) | Vibrant Orange (`#ea580c`, `#d9531e`) |
| **03** | **Recipeez** | API-Driven Recipe Finder & Smart Meal Planner | Solo UI/UX Designer & Android Developer | Emerald / Teal Green (`#0d9488`, `#0f766e`) |

---

## Project 01: Resumeez — ATS Resume Builder & Rule-Based Evaluator

### 1.1 Overview & Metadata (Slide 2)
- **Tag:** `PROJECT 01 | OVERVIEW`
- **Headline:** Resumeez - ATS Resume Builder & Rule-Based Evaluator
- **Elevator Pitch:** *"Helping job seekers create structured, ATS-readable resumes through guided CV generation and consistent formatting."*
- **Project Details:**
  - **Role:** UI/UX Designer & QA Lead (Team of 3)
  - **Methods:** R&D (Hannafin & Peck Model) & Shneiderman's 8 Golden Rules
  - **Stack:** Figma, React, Vite, TypeScript, Tailwind CSS, PDF.js, Firebase (Client-Server BaaS Architecture)
  - **CTA Button:** `Live Web App` (`https://portfolio-thesis.firebaseapp.com/`)

### 1.2 The Problem: Flaws of Existing Campus CV Generators (Slide 2)
- **Context:** While preparing for our university internship program, we identified several critical UX and structural flaws in the auto-generated campus CV system:
  1. **Inefficient Spatial Layout:** Content scattered across 5 pages with excessive whitespace and poor hierarchy.
  2. **Rigid Structure:** Lacks dedicated achievement and impact sections.
  3. **Zero ATS Feedback:** No feedback or validation on PDF readability for Applicant Tracking Systems.
- **Before vs. After Visual Comparison:**
  - *Existing Campus CV:* Fragmented, sparse multi-page form printout.
  - *Resumeez ATS CV:* Clean, single-page, high-density structured ATS resume layout (*"From a fragmented campus CV to a structured, readable resume."*).

### 1.3 The Solution: Preventive Formatting Meets Rule-Based Scoring (Slide 2)
1. **Standardized 6-Section CV Builder:**
   - Guides content into **6 consistent ATS sections** with a structured layout (2 standardized templates), addressing rigid organization and scattered formatting at the source.
2. **Automated Regex & PDF.js CV Checker:**
   - Parses uploaded PDF content client-side using **PDF.js** and applies rule-based regex checks (`≥ 5 valid words` threshold) to evaluate completeness across 6 standard ATS categories.

### 1.4 Design Decisions (Slide 3)
- **Tag:** `PROJECT 01 | DESIGN DECISIONS`
- **Core Principle — Applying Shneiderman's 8 Golden Rules:**
  - *"Breaking 8 complex resume entities into a 7-step guided wizard reduces short-term memory load, helping users focus on one step at a time."*
  - **7-Step Guided Wizard Progression:**
    1. `Personal Information`
    2. `Work Experience`
    3. `Education`
    4. `Areas of Expertise`
    5. `Profile Summary`
    6. `Additional Sections`
    7. `Finish Up`
- **Key Decision #1: Split-Screen Builder & Error Prevention**
  - **Real-Time JSON Live Preview:** Instant JSON-to-DOM rendering on the right pane while typing in the left pane form.
  - **Proactive Mandatory Field & State-Lock Validation:** Prevents progression with incomplete required fields and blocks invalid file uploads in the Resume Checker (`Error: Only valid PDF files are allowed`).
- **Key Decision #2: Explainable ATS Checker UI**
  - Categorizes each parsed section into 3 transparent, color-coded scoring states so users know *why* a section passed or failed:
    - 🟠 **Header-Only Warning (`< 5 words`):** Section header detected, but insufficient content (e.g., *"Personal Info: This section content is not detected"*).
    - 🟢 **Complete (`≥ 5 valid words`):** Section header and valid body content verified (e.g., *"Experience"*).
    - 🔴 **Missing Section:** Section not found in PDF (e.g., *"Skills: This section is not detected"*).
- **Universal Usability: Bilingual Support Toggle & Responsive Desktop-to-Mobile Layouts**
  - Designed adaptive breakpoints and an instant **ID / EN (`Indonesia | English`) localization toggle** in the navbar so students can preview and manage their resumes seamlessly across desktop and mobile devices.

### 1.5 Testing, Metrics & Iteration (Slide 4)
- **Tag:** `PROJECT 01 | TESTING & ITERATION`
- **Quantitative Validation Metrics:**
  - **User Acceptance Testing (UAT): `83.4%`** — Of 30 respondents agreed Resumeez helped them build structured, ATS-compliant CVs.
  - **System Usability Scale (SUS): `69.83 (Grade C+)`** — Scored above the global benchmark average (`68.0`), rated *Marginal High / Good*.
  - **Blackbox QA Reliability: `18 / 18 Passed`** — 100% pass rate across XSS sanitization, `10k-character` stress tests, and `5MB` file size limits.
- **What Testing Revealed: Turning 30% User Friction into Actionable UX Iterations:**
  1. **Fixing Accidental Double Downloads:** Decoupled preview state from the auto-download trigger, giving users explicit `Edit`, `Download`, and `Delete` actions on saved resume cards.
  2. **Lexical Language Barrier:** Added English ATS standard onboarding tooltips & warning banners explaining that most multinational ATS NLP parsers are trained on English.
  3. **Browser Autofill & Input Ergonomics:** Replaced manual date and city text inputs with structured **Dropdown Selectors** and Month/Year pickers.
- **Key Reflection — Designing Where UX Meets System Constraints:**
  - *"Visual clarity must work within rule-based parsing rules, not compete with them. Designing for real-world edge cases means balancing a guided experience with explicit system constraints."*

### 1.6 "Resumeez at a Glance" Bento Summary Highlights (Slide 5)
- `69.83` Grade C+ SUS Usability Score (Above 68.0 Global Average)
- `6` Core ATS Sections & `2` Standardized Templates
- `≥ 5` Min. Valid Word Threshold
- `React + Vite + TypeScript + Firebase` = Client-Server BaaS Architecture
- `18/18` Blackbox QA & XSS Sanitized
- `Rule-Based Parser`
- `7-Step Guided Wizard`
- `JSON-to-DOM Real-Time Live CV Preview`
- `1-Click PDF` Export
- `83.4%` UAT Approval Rate (30 Respondents)
- `Explainable Scoring States` (Complete / Header-Only / Missing)
- `Bilingual UI` (Indonesia / English)
- `10K Chars & 5MB Max` Layout Stress-Tested
- `Responsive Web App`

---

## Project 02: Kompas.com — UX Research & News Portal Redesign

### 2.1 Overview & Metadata (Slide 6)
- **Tag:** `PROJECT 02 | RESEARCH & DISCOVERY`
- **Headline:** Kompas.com - UX Research & News Portal Redesign
- **Elevator Pitch:** *"Decluttering Indonesia's news portal by balancing ad slots with a clean reading flow."*
- **Project Details:**
  - **Role:** UI Designer & UX Researcher (Team of 5)
  - **Methods:** Onsite User Interviews, Persona Mapping, Sitemap, Taskflow, Low-Fi Sketching
  - **Stack:** Figma, Draw.io, Hand-Sketching Wireframe
  - **CTA Button:** `Figma Prototype`

### 2.2 User Research & Discovery (Slide 6)
- **User Interviews (3 Personas):**
  - Conducted onsite user interviews with:
    1. **Janice** (20, Student)
    2. **Aisha** (31, Lecturer)
    3. **Anton** (39, Shopkeeper)
  - **Behavioral Insight:** Discovered a *"TikTok/IG-to-Kompas"* reading habit (users discover breaking news snippets on social media, then visit Kompas.com for verification and full coverage).
  - **3 Core User Pain Points Identified:**
    1. **Intrusive Ad Clutter** (pop-ups and inline banners disrupting article text)
    2. **Irrelevant Photos** (visual noise disconnecting headlines from content)
    3. **Reading Exhaustion** (cramped typography, multi-page splits, and lack of whitespace)
- **Information Architecture — Sitemap & Taskflow:**
  - **Category Sitemap:** Consolidated and grouped `Lifestyle`, `Health`, `Food`, and `Education` logically within the primary navigation bar.
  - **Taskflow:** Separated core reading and search flows from login-gated features (comments and subscriptions) to eliminate friction for casual readers.
- **Core Challenge — Ergonomics + Monetization:**
  - *"Removing advertisements completely is unrealistic for a media company. Our goal was to redesign the information hierarchy and whitespace distribution so readers enjoy a calm, structured reading flow while keeping commercial ad slots."*

### 2.3 UI Redesign & Architecture (Slide 7)
- **Tag:** `PROJECT 02 | UI REDESIGN & ARCHITECTURE`
- **Low-Fi Wireframes & Ad Zoning:**
  - **Utility Header:** Added Dark/Light Mode toggle, Trending Word ticker, Subscribe CTA, and accessible Search Bar.
  - **Modular Grid:** Structured sections for Headline News, Popular/Relevant News, and Video Carousels.
  - **Isolated Ads:** Confined advertisements strictly to dedicated top banners and sidebars rather than breaking up article paragraphs.
- **Key Decision #1: Breathable Homepage**
  - **Extra Whitespace:** Reduced visual clutter across news cards.
  - **Manageable Ad Slots:** Strictly bounded `1140×200` top banner ads and `260×150` right-sidebar ad slots.
  - **Clear Hierarchy:** Prioritized main breaking headlines with clear typographic scale.
- **Key Decision #2: News Detail & User Page**
  - **Top-to-Bottom Flow:** Reorganized the News Detail Page with generous margins and whitespace to reduce reading exhaustion.
  - **Desktop User Page:** Streamlined profile, comment history, and subscription management view.
- **Impact & Key Learnings:**
  - **Impact:** Translated insights from 3 persona interviews into an intuitive, reader-friendly layout without sacrificing commercial ad inventory.
  - **Learning:** Extracted qualitative user insights to guide concrete UI layout decisions collaboratively in a 5-person design team.

---

## Project 03: Recipeez — API-Driven Recipe Finder & Smart Meal Planner

### 3.1 Overview & Metadata (Slide 8)
- **Tag:** `PROJECT 03 | DISCOVERY & ARCHITECTURE`
- **Headline:** Recipeez - API-Driven Recipe Finder & Smart Meal Planner
- **Elevator Pitch:** *"Simplifying daily cooking decisions by transforming complex Spoonacular API nutritional and ingredient data into an intuitive mobile experience."*
- **Project Details:**
  - **Role:** Solo UI/UX Designer & Android Developer
  - **Methods:** Competitive Benchmarking, IA Flowcharts, Waterfall SDLC
  - **Stack:** Figma, Java, XML, Android Studio, Spoonacular API, Retrofit, Glide, SQLite
  - **CTA Buttons:** `Figma Prototype` | `Early Access App` (`https://github.com/1Frazel/Recipeez/releases/tag/v0.0.1-alpha`)

### 3.2 Discovery, Benchmarking & Architecture (Slide 8)
- **Competitive UX Audit & API Mapping:**
  - Audited **5 leading recipe & meal apps** (**Yummly, Mealime, Paprika, Whisk, CookBook**) to determine how to structure raw Spoonacular API payloads into user-friendly mobile patterns:
    1. **Multi-Parameter Filtering:** Calories, Macros, 14 Cuisines, and 7 Diets.
    2. **Tabbed Hierarchy:** Breaking long recipe pages into scannable tabs.
    3. **Fridge-First Ingredient Search:** Searching recipes based on ingredients already at home.
- **Structuring 5 Core User Flows:**
  - **Dual Search & Bottom Sheet:** Branches *Recipe Name Search* vs. *Ingredient Search* cleanly using a modal `filter_bottom_sheet`.
  - **Smart Meal Planner:** Supports both calorie-based **Surprise Meal Planning (3x daily)** and manual meal slots directly linked to the **Ingredients Shopping Cart**.
- **Core Challenge — Taming Data-Heavy API Responses on Mobile:**
  - *"Used progressive disclosure — 2-column grids, bottom sheets, and segmented tabs — to keep dense nutritional and cooking data scannable on small screens."*

### 3.3 Mobile UI & Engineering Execution (Slide 9)
- **Tag:** `PROJECT 03 | MOBILE UI & EXECUTION`
- **Key Decision #1: Homepage & Recipe Browser**
  - **Visual 2-Column Grid:** High-contrast dish cards displaying imagery, title, and quick **Save** & **Cart** icon actions.
  - **Dual Search & Filter Sheet:** Seamless toggle between dish names or comma-separated ingredients, paired with quick Cuisine & Diet filter chips.
- **Key Decision #2: Segmented Details & Cookbook**
  - **Eliminating Infinite Scroll:** Designed a **3-tab recipe detail view** (`Overview`, `Ingredients`, `Directions`) so users don't have to endlessly scroll back and forth between ingredient measurements and cooking steps while in the kitchen.
  - **Personalized Cookbook:** Organizes saved dishes into structured categories: `Breakfast`, `Lunch`, `Dinner`, and `Meal Plan`.
  - **5-Tab Bottom Navigation Bar:** `Home` | `CookBook` | `Shopping Cart` | `Meal Planner` | `Settings`.
- **Engineering Execution — 12-Week Solo Android Build:**
  - **Followed 5-Stage Waterfall SDLC:** `1. Requirements Analysis` → `2. Design` → `3. Development` → `4. Testing` → `5. Maintenance`.
  - **Async Pipeline:** Integrated **Retrofit** for asynchronous REST JSON parsing and **Glide** for smooth image loading and `RecyclerView` pagination.
  - **Offline & Edge Cases:** Built local **SQLite / Room** database schemas for offline saved recipes and engineered graceful empty/error states.
- **Project Impact & Key Learning:**
  - **Project Impact:** Delivered a functional end-to-end Android application bridging competitive UX benchmarking with live Spoonacular API data.
  - **Key Learning:** Learned how third-party API payload structures directly shape mobile UI component hierarchy and client-side state flows.
