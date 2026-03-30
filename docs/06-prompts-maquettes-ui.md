

## 🌐 Écran 1 : Landing Page Marketing

```
Design a premium SaaS landing page for "Lyzard.ai" — an AI website builder.

HERO SECTION:
- Centered layout
- Large bold headline: "Turn Your Idea Into a Website in 30 Seconds"
- Sub-headline: "Describe your business in any language. Our AI generates a professional, responsive landing page with real content, real design — ready to export."
- Primary CTA: "Start Free — 3 Credits" (large, gradient purple→indigo button, with subtle glow)
- Secondary CTA: "See How It Works" (text link with arrow)
- Below CTAs: "No credit card required"
- Background: subtle animated gradient mesh (dark purple→deep blue→black)

DEMO SECTION:
- Centered browser mockup frame showing a split view:
  - Left: a chat prompt "Create a website for a Moroccan restaurant"
  - Right: a beautiful generated website preview
- Animated typing effect on the prompt
- Caption: "From text to website in seconds"

FEATURES SECTION (3 columns):
- Card 1: ⚡ "30-Second Delivery" — "Your full page generated before your coffee gets cold."
- Card 2: 🎯 "Iterate with Chat" — "Don't like the hero? Just tell the AI. It fixes it."  
- Card 3: 📦 "Export Clean Code" — "Download production-ready HTML + Tailwind. No lock-in."
- Glass-morphism cards with subtle purple border glow on hover

HOW IT WORKS (3 steps, horizontal):
- Step 1: "Describe" (chat bubble icon) — "Tell the AI about your business in French, English, or Darija"
- Step 2: "Generate" (sparkle/wand icon) — "Watch your page build itself in real-time"
- Step 3: "Export" (download icon) — "Download the source code or share a live link"
- Connected by a subtle dotted line between steps

SOCIAL PROOF:
- "Trusted by 500+ creators" with 5 small avatar circles
- 3 short testimonial cards

PRICING (2 tiers side by side):
- Free: "3 pages/month, Export ZIP, Chat iterations" — "Get Started Free" button
- Pro: "$9/month — Unlimited generations, Priority generation, Custom domains" — "Upgrade to Pro" button (highlighted with gradient border)

FOOTER:
- Logo, links (About, Privacy, Terms, Contact), social icons
- "Built with AI. Designed for humans."

DESIGN SYSTEM:
- Background: #0A0A0F (near-black)
- Primary gradient: purple-600 → indigo-500
- Text: white + gray-400 for secondary
- Font: Inter or Outfit (Google Fonts)
- Border radius: rounded-2xl on cards
- Subtle floating particle dots in background
```

---

## 🔐 Écran 2 : Login

```
Design a login page for the "Lyzard.ai" web app.

LAYOUT: Centered card on a dark background

BACKGROUND:
- Same dark gradient as landing page (#0A0A0F base)
- Subtle radial gradient glow (purple) behind the form card

CARD (centered, max-width 420px):
- Top: Lyzard.ai logo/wordmark
- Heading: "Welcome back"
- Sub: "Sign in to your account"

FORM:
- Email input (with mail icon, placeholder "your@email.com")
- Password input (with lock icon, show/hide toggle)
- "Forgot password?" link (right-aligned, small, gray-400)
- "Sign In" button (full-width, gradient purple→indigo, rounded-xl)
- Divider: "or continue with"
- "Continue with Google" button (outline style, Google G icon, full-width)

BOTTOM:
- "Don't have an account? Sign up" link

DESIGN:
- Dark card (#111118) with subtle border (gray-800)
- Inputs: dark bg (#1A1A24), light border, white text
- Focus state: purple ring on inputs
- Smooth transitions on hover/focus
```

---

## 📝 Écran 3 : Signup

```
Design a signup page for "Lyzard.ai".

Same layout as login with these differences:

CARD:
- Heading: "Create your account"
- Sub: "Start with 3 free generations"

FORM:
- Full name input (user icon)
- Email input (mail icon)
- Password input (lock icon, min 8 chars indicator below)
- "Create Account" button (gradient, full-width)
- Divider + Google button (same as login)

BOTTOM:
- "Already have an account? Sign in" link
- Small text: "By creating an account, you agree to our Terms of Service and Privacy Policy"

SAME DESIGN as login page — dark card, purple accents.
```

---

## 📊 Écran 4 : Dashboard (Bibliothèque Projets)

```
Design a project dashboard for the "Lyzard.ai" web application.

TOP NAVBAR (sticky, dark):
- Left: Lyzard.ai logo/wordmark
- Center: nothing (clean)
- Right: Credit badge "🪙 7 credits" (pill shape, subtle purple bg), User avatar + dropdown (name, settings, logout)

PAGE CONTENT:
- Top section:
  - Page title: "My Projects" (h1, large, white)
  - Right-aligned: "New Project" button (gradient purple, + icon, prominent, rounded-xl)

PROJECT GRID (3 columns desktop, 2 tablet, 1 mobile):
- Each card contains:
  - Thumbnail: 16:9 screenshot preview of the generated website (or placeholder gradient)
  - Title: project name (bold, white)
  - Date: "Created Mar 28, 2026" (gray-400, small)
  - Status badge: "Draft" (yellow-ish pill) or "Published" (green pill)
  - On hover: overlay with "Open" (primary) and "Delete" (red, small) buttons

EMPTY STATE (when no projects):
- Centered illustration (abstract rocket or sparkle graphic)
- Heading: "No projects yet"
- Sub: "Create your first AI-generated landing page"
- "Create Project" CTA button

DELETE CONFIRMATION:
- Modal/dialog: "Delete this project?" with cancel/confirm buttons
- Confirm = red button "Delete"

DESIGN:
- Background: #0A0A0F
- Card bg: #111118 with gray-800 border
- Hover: card lifts with shadow-xl and purple border glow
- Grid gap: 24px
- Font: Inter
```

---

## 💬 Écran 5 : Builder (Chat IA + Live Preview)

```
Design the main builder interface for "Lyzard.ai" — the core product screen.

LAYOUT: Full-height split view (no scroll on the page itself)
- LEFT PANEL (40% width): Chat interface
- RIGHT PANEL (60% width): Live preview
- Resizable divider between panels (drag handle)

TOP BAR (full width, dark, sticky):
- Left: Back arrow → Dashboard, Project title (click to edit inline)
- Center: nothing
- Right: Credit badge "🪙 5", Auto-save indicator "Saved ✓" (green dot), Export button (outline, download icon)

LEFT PANEL — CHAT:
- Chat history area (scrollable):
  - User messages: right-aligned, purple-ish bg (#2D1B69), rounded bubble
  - AI responses: left-aligned, dark card (#1A1A24), showing "Generating your page..." with animated dots during stream
  - When generation complete: AI message shows "✅ Page generated (v3)" with version number
- Bottom input area (sticky at bottom of panel):
  - Text input: "Describe your landing page…" placeholder
  - Multi-line support (auto-expand)
  - Send button (purple, arrow-up icon)
  - Small text below: "Supports French, English, and Darija"

RIGHT PANEL — PREVIEW:
- Top toolbar:
  - Device switcher: 3 icon buttons [Desktop] [Tablet] [Mobile] — changes iframe width
  - Current version indicator: "v3" dropdown → list previous versions to restore
- Iframe container:
  - White background iframe showing the generated website
  - During generation: code appears progressively inside the iframe (real-time streaming)
  - Responsive: iframe width changes based on device switcher (100% / 768px / 375px)
- Bottom bar:
  - "Export ZIP" button (primary, gradient)
  - "View Code" toggle (shows raw HTML in a code panel below iframe)

STATES TO SHOW:
1. Empty state: "Start by describing your website in the chat" (centered in preview area)
2. Generating: streaming animation in both chat and preview
3. Complete: full preview with action buttons active

DESIGN:
- Background: #09090F (deepest dark)
- Panel backgrounds: #0F0F17 (left), white iframe content (right)
- Divider: 4px, gray-800, cursor: col-resize on hover
- Chat bubbles: rounded-2xl
- Code panel font: JetBrains Mono or Fira Code
- Smooth transitions on panel resize
- IDE-like feel (inspired by Cursor/VS Code layout)
```

---

## ⚙️ Écran 6 : Settings

```
Design a settings page for "Lyzard.ai" web app.

LAYOUT: Same navbar as dashboard + content area below

LEFT SIDEBAR (narrow, 200px):
- Navigation links:
  - Profile (active: purple text + left border indicator)
  - Credits & Billing
  - Preferences

PROFILE SECTION:
- Avatar: circular upload area with camera icon overlay on hover
- Name input (pre-filled)
- Email (read-only, gray text)
- "Save Changes" button (gradient, right-aligned)

CREDITS SECTION:
- Large display: "🪙 7 Credits Remaining" (big number, purple)
- Usage history table:
  - Columns: Date | Type | Amount | Description
  - Rows examples: "Mar 28 | Generation | -1 | Restaurant landing page"
  - Clean striped table with dark rows
- "Buy More Credits" button → opens modal with packages:
  - 10 credits — $5
  - 50 credits — $19
  - 100 credits — $29 (badge: "Best Value")

PREFERENCES SECTION:
- Language preference dropdown (French, English)
- Theme toggle (Dark/Light) — dark by default
- "Delete Account" danger zone (red text, requires confirmation)

DESIGN:
- Consistent with dashboard (dark bg, purple accents)
- Sidebar: #0F0F17 bg, links in gray-400 with active state
- Content area: #111118 cards
```

---

## 📋 Récapitulatif Screens

| # | Écran | Description | Priorité |
|---|---|---|---|
| 1 | Landing Page | Page marketing publique | 🟡 Sprint 4 |
| 2 | Login | Connexion email + Google | 🔴 Sprint 1 |
| 3 | Signup | Inscription avec 3 crédits offerts | 🔴 Sprint 1 |
| 4 | Dashboard | Grille de projets avec CRUD | 🔴 Sprint 3 |
| 5 | Builder | Chat IA + Preview live (cœur produit) | 🔴 Sprint 2 |
| 6 | Settings | Profil, crédits, préférences | 🟡 Sprint 3 |

> Toutes les maquettes sont **web desktop-first**. Le responsive est intégré dans chaque prompt (breakpoints Tailwind). Pour le futur mobile natif, de nouvelles maquettes seront créées dans le repo `lyzard-mobile`.
