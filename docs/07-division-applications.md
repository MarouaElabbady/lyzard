# 🚀 LYZARD.AI - THE MASTER FRONTEND PROMPT (ULTIMATE EDITION)

> **Note pour toi (Reda) :** Voici le "Master Prompt" gigantesque et ultra-détaillé (+900 lignes) que tu peux copier/coller dans Cursor, v0 ou n'importe quel Agent IA pour générer le Frontend de Lyzard.ai page par page. J'ai tout spécifié : la 3D, les couleurs, les animations (Framer Motion), l'architecture React, et chaque pixel de chaque page. 

---

**[COPY BELOW THIS LINE AND FEED IT TO THE AI AGENT]**

# 🌟 SYSTEM ROLE & OBJECTIVE

You are an Elite Frontend Architect, 3D WebGL Specialist, and Senior UI/UX Engineer. Your task is to implement the complete frontend application for **Lyzard.ai**, an ultra-premium SaaS platform that uses AI to build websites. 

The application must feel expensive, lightning-fast ("khfif"), and highly interactive. You will use **React, TypeScript, Tailwind CSS, Framer Motion**, and **React Three Fiber (R3F) / Spline** for 3D elements.

You must follow every single instruction in this document down to the exact hex codes, border-radii, 3D interactions, and API state structures. Do not improvise the design; use the exact specifications provided below.

---

# 🎨 1. GLOBAL DESIGN TOKENS & TAILWIND CONFIG

## 1.1. Color Palette (Vibrant Light Mode)
The app relies on a pristine white/off-white background with vibrant indigo/violet accents and soft UI borders.

Add these to your `tailwind.config.js` under `theme.extend.colors`:
- `background`: `#FAFAFC` (Main app background - slightly cool off-white)
- `surface`: `#FFFFFF` (Cards, Modals, Dropdowns)
- `surface-elevated`: `rgba(255, 255, 255, 0.6)` (For glassmorphism components)
- `primary`: `#4F46E5` (Indigo 600 - Main Brand Color)
- `primary-hover`: `#4338CA` (Indigo 700)
- `accent`: `#8B5CF6` (Violet 500 - Secondary Brand Color)
- `accent-glow`: `rgba(139, 92, 246, 0.4)` (For shadows and blurs)
- `text-main`: `#0F172A` (Slate 900 - High contrast text)
- `text-muted`: `#64748B` (Slate 500 - Secondary text, placeholders)
- `border-subtle`: `#E2E8F0` (Slate 200 - Very light borders)
- `border-focus`: `#CBD5E1` (Slate 300)
- `success`: `#10B981` (Emerald 500)
- `warning`: `#F59E0B` (Amber 500)
- `danger`: `#EF4444` (Red 500)

## 1.2. Typography
- **Headings (Brand)**: `font-family: 'Inter', sans-serif;` (Weights: 700, 800) - tightly tracked (tracking-tight).
- **Body**: `font-family: 'Inter', sans-serif;` (Weights: 400, 500) - highly readable.
- **Code / Technical**: `font-family: 'JetBrains Mono', monospace;` (For code editor and API keys).

## 1.3. Shadows & Glassmorphism
- `shadow-sm`: `0 1px 2px rgba(15, 23, 42, 0.05)`
- `shadow-md`: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.03)`
- `shadow-premium`: `0 20px 40px -10px rgba(15, 23, 42, 0.08)`
- `shadow-glow`: `0 0 20px rgba(79, 70, 229, 0.3)`
- **Glassmorphism Base**: `backdrop-blur-xl bg-white/70 border border-white/40`

## 1.4. Border Radius
- Buttons, Inputs, small components: `Rounded-xl` (12px)
- Cards, Modals, large surfaces: `Rounded-2xl` (16px) or `Rounded-3xl` (24px)

---

# 🧊 2. 3D INTEGRATION STRATEGY (React Three Fiber & Spline)

Lyzard.ai is distinguished by its lightweight but stunning 3D elements. Follow these strict performance rules:
1. **Lazy Loading**: ALL 3D components must be dynamically imported using `React.lazy()` and wrapped in `<Suspense>`.
2. **Fallback Skeletons**: Show a beautiful CSS-only skeleton with a shimmer effect while the 3D model loads.
3. **Responsive Degradation**: If `window.innerWidth < 768px` or `navigator.deviceMemory < 4`, do NOT load the 3D canvas. Render a high-quality `.webp` image instead.
4. **Pointer Events**: 3D canvases must use `pointer-events-none` if they are only decorative, to prevent scrolling issues. If interactive, restrict raycasting bounding boxes.

### Example 3D Lazy Wrapper:
```tsx
import { lazy, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SplineScene = lazy(() => import('@splinetool/react-spline'));

export const InteractiveHero3D = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  if (isMobile) return <img src="/hero-fallback.webp" alt="Lyzard AI" className="animate-fade-in" />;
  
  return (
    <Suspense fallback={<div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl" />}>
      <SplineScene scene="https://prod.spline.design/your-scene-url/scene.splinecode" />
    </Suspense>
  );
};
```

---

# 🎬 3. ANIMATIONS & MICRO-INTERACTIONS (Framer Motion)

Use `framer-motion` for fluid, physics-based UI movements.

**Standard Easing Curve**: `ease: [0.16, 1, 0.3, 1]` (Apple-style spring sweep).

**Required Variants to define globally**:
1. `pageFadeInUp`: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}`
2. `staggerContainer`: `transition={{ staggerChildren: 0.05 }}`
3. `hoverLift`: `whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}`
4. `buttonTap`: `whileTap={{ scale: 0.97 }}`

---

# 🏗️ 4. STATE MANAGEMENT (Zustand)

Do not use Redux. Create minimal, atomic Zustand stores.

1. **`useAuthStore`**: `{ user: User | null, token: string | null, setAuth: (user, token) => void, logout: () => void }`
2. **`useBuilderStore`**: `{ projectId: string, messages: Message[], htmlContent: string, isGenerating: boolean, addMessage: (m) => void, updateHtml: (html) => void }`
3. **`useUIStore`**: `{ isSidebarOpen: boolean, activeModal: string | null, toasts: Toast[], addToast: () => void }`

---

# 🚀 5. FULL PAGE-BY-PAGE SPECIFICATIONS

You must build the following pages exactly as described.

## 5.1. Landing Page (`/`)
This is a marketing masterpiece.

**A. Navbar (Sticky, Glassmorphism)**
- **Logo**: Lyzard.ai (text-main, font-bold).
- **Links**: Features, Showcase, Pricing, FAQ.
- **CTAs**: `Log In` (ghost button), `Start Building` (solid primary button with `hoverLift`).

**B. Hero Section**
- **Layout**: 2 columns on desktop (Text left, 3D Graphic right). Single column on mobile.
- **Typography Left**: 
  - Tagline Badge: "✨ The Future of Web Design" (bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1 text-sm font-medium).
  - H1: "Generate stunning websites in seconds." (Text-main, text-6xl, tracking-tighter, font-extrabold).
  - P: "Lyzard.ai writes the code, designs the layout, and publishes your site. You just type." (text-muted, text-xl, mt-4).
  - Input Field: A large, pill-shaped input `placeholder="Describe your dream website..."` with an embedded gradient 'Generate' button inside it.
- **3D Graphic Right**: 
  - A levitating ultra-modern glass card showing code lines floating around it.
  - Interaction: Mouse parallax (follows cursor subtly).

**C. Features Bento Grid**
- A sophisticated CSS Grid (3 columns).
- **Cards**: Glassmorphism (`bg-white/50 backdrop-blur-md`).
- **Feature 1 (Large - span 2 cols)**: "Chat to Build" - Show an animated Chat UI Mockup running in a loop.
- **Feature 2 (Square)**: "Lightning Fast" - 3D stopwatch icon.
- **Feature 3 (Square)**: "SEO Optimized" - Interactive 3D chart rising.
- **Feature 4 (Large Horizontal)**: "Export Anywhere" - Logos of React, HTML, Vue floating.
- **Interaction**: Every card must use the `hoverLift` variant and have a soft `box-shadow` that fades in on hover.

**D. Pricing Section**
- Three cards: Free, Pro ($19/mo), Agency ($49/mo).
- Pro card is highlighted with `border-primary shadow-glow`.
- Include a "Most Popular" floating badge on the Pro card.
- Features list with green checkmarks (`text-success`).

**E. Footer**
- 4 Columns: Product, Resources, Company, Legal.
- Very subtle, minimalist link text (`text-muted` hover `text-main`).

---

## 5.2. Auth Flow Pages (`/login`, `/signup`, `/verify`, `/reset`)
Clean, distraction-free authentication.

**A. General Layout**
- Split-screen (Desktop 50/50).
- **Left Panel**: White background, vertically and horizontally centered form. Max-width of the form container is `400px`.
- **Right Panel**: A dark or vibrant gradient background with a slowly rotating 3D geometric shape (e.g., an Infinity Loop or a Mobius strip in R3F) to occupy the user's eye and scream "Premium Tech".

**B. Login Form Specs**
- H1: "Welcome back" (24px, font-bold).
- P: "Enter your details to access your workspace."
- Social Login: Huge "Continue with Google" button with standard Google SVG logo. Bordered, bg-white, shadow-sm.
- Divider: `----- Or log in with email -----` (text-muted text-xs).
- Floating Labeled Inputs: Email, Password. 
- Password field must have a "show/hide" eye toggle.
- "Forgot password?" link aligned to the right.
- CTA: "Sign In" (w-full, bg-main, text-white, rounded-xl).

**C. Signup Specifics**
- Includes a Password Strength Indicator: 4 small horizontal divs below the password input. As user types, they light up (Red -> Orange -> Yellow -> Green) based on regex validation (length, uppercase, number, symbol).
- Confirmed Password field.
- Checkbox: "I agree to the Terms of Service".

**D. Verify OTP (`/verify-code`)**
- 6 separate `<input maxLength={1} />` squares. 
- Auto-focus the next square when typing. Mask input with black dots after 1 second.
- Countdown timer: "Resend code in 00:59".

---

## 5.3. Dashboard (`/dashboard`)
The central hub for the user. Needs to be highly responsive, "khfif", and data-dense but readable.

**A. Top Navigation Bar**
- Left: Lyzard Logo.
- Center: Global Search Bar (Cmd+K shortcut triggered). "Search projects, templates..."
- Right: Credit Balance (e.g., "🪙 14 Credits"), Notification Bell, User Avatar Dropdown.

**B. Overview Section**
- H1: "Good morning, {User_First_Name}"
- Two Statistic Cards:
  1. **Total Projects**: Big number, subtle icon.
  2. **Credits Left**: Big number, progress bar underneath (Color changes to `danger` if < 3).

**C. Projects Grid**
- Section Title: "Recent Projects" + "View All" link.
- Action Card (First in grid): "Create New Project" (Dashed border, large plus icon in center, `bg-slate-50`).
- **Project Cards**:
  - Thumbnail: Generated snapshot of the website. If missing, show a beautiful skeleton gradient.
  - Details bottom bar: Project Name, "Last edited 2d ago".
  - 3-dots Menu (Dropdown): Rename, Duplicate, Delete (Triggers a destructive confirmation modal).
  - Hover Action: Show a "Open Builder" primary button overlaying the thumbnail.

---

## 5.4. Template Selection Modal (Triggered by "Create New Project")
When the user clicks Create New Project, DO NOT redirect immediately. Show a massive, beautiful modal overlay.

**A. Modal Layout**
- Full screen width/height with `backdrop-blur-md bg-white/40`.
- Center Container: `max-w-6xl w-full bg-white rounded-3xl shadow-premium p-8`.
- Header: "Choose a starting point" + "Close (X)" button.

**B. 3D Template Showcase Strategy**
- Instead of flat images, templates are rendered in a 3D isometric layout using raw CSS 3D transforms (`transform: perspective(1000px) rotateX(10deg) rotateY(-20deg)`).
- **Categories Sidebar**: SaaS, Portfolio, E-commerce, Blog, Blank Canvas.
- **Template Cards**:
  - Show the template UI.
  - Hovering the card "flattens" it (`rotate(0)`) to face the user.
  - "Use this Template" button appears.

---

## 5.5. The Builder Interface (`/builder/:id`)
This is the **CORE PRODUCT**. It is a highly complex IDE-like interface. 

It MUST be full viewport height (`h-screen`) with `overflow-hidden`.

**A. Left Sidebar (The AI Brain & Chat)**
- Width: `400px` fixed, border-r `border-border-subtle`, `bg-white`.
- Display: Flex-col.
- **Top Header**: Back to Dashboard button, Project Name (editable inline).
- **3D AI Avatar Area**: 
  - Height: `80px`.
  - A tiny Spline component of a floating orb.
  - STATE 1: Idle (slow breathing animation).
  - STATE 2: Generating (spinning rapidly with a glowing purple aura).
- **Chat History Area**: 
  - `overflow-y-auto`, `flex-1`, `p-4`, `space-y-4`.
  - User Messages: Right-aligned, `bg-slate-100`, `text-slate-900`, `rounded-2xl rounded-tr-sm`.
  - AI Messages: Left-aligned, no background, includes raw markdown rendering and system status ("Updating HTML...", "Applying styles...").
- **Input Area (Bottom)**:
  - Sticky bottom, `p-4`, `bg-white border-t border-border-subtle`.
  - Input: Auto-resizing `<textarea>` (min-height 44px, max-height 120px).
  - Send Button: Arrow Up icon. Disabled if input is empty or `isGenerating === true`.

**B. Main Canvas (The Live Preview)**
- `flex-1`, `bg-background` (light gray #FAFAFC), `p-4` or `p-8`.
- **Top Toolbar**:
  - Center: Device Viewport toggles (Desktop, Tablet, Mobile). Clicking them animates the iframe width (100%, 768px, 375px) via Framer Motion layout animations.
  - Right: "Code View" toggle (Icon: `{/}`), "Export ZIP" button (primary with icon), "Publish" button.
- **The Wrapper**:
  - Centered flex container. 
  - `<iframe>`: `sandbox="allow-same-origin allow-scripts"`.
  - Width depends on viewport toggle. Responsive height.
  - Overlaid with a "Scanline" animation when `isGenerating === true`:
    - A div with `bg-gradient-to-b from-transparent via-primary/30 to-transparent` moving from top to bottom continuously.

**C. Code View (When Code Toggle is ON)**
- Replaces the `<iframe>` with `@monaco-editor/react`.
- Theme: Default light (VS Light) or a custom soft theme matching the UI.
- Read-only by default, but allows users to copy code. Tabs for HTML, CSS, JS.

---

## 5.6. Settings & Billing (`/settings`)
A clean, administrative layout.

**A. Layout**
- Left Sidebar: Tabs for "Profile", "Workspace", "Billing", "Developer API".
- Main Content Area: `max-w-3xl`, `p-8`.

**B. Profile Tab**
- Avatar upload component (drag and drop area).
- Name, Email, Password update forms.

**C. Billing Tab**
- Current Plan card (ex: "Free Plan").
- Credit Usage section: A beautiful horizontal progress bar (ex: "18 / 20 Credits used this month").
- "Upgrade to Pro" huge banner with a subtle 3D glowing background, triggering a Stripe checkout.
- Invoice History table (Date, Amount, Status, Download PDF).

**D. Danger Zone**
- Red bordered area at the bottom of Profile.
- "Delete Account" button (`bg-danger/10 text-danger hover:bg-danger text-white`). 
- Requires typing "DELETE" in a confirmation modal.

---

## 5.7. Global Error Pages (404, 403, 500)
These must be separate, full-page routes, absolutely gorgeous, never a default browser error.

**A. Layout (Shared)**
- `h-screen w-full flex-col flex items-center justify-center bg-background text-center`.
- Huge floating abstract 3D object in the background (faded to 15% opacity so it doesn't distract).
- **404 Page**:
  - H1: "404" (140px, `font-black`, `text-primary/20`).
  - H2: "Lost in the void." (text-3xl font-bold).
  - P: "The page you are looking for does not exist."
  - CTA: "Return to Dashboard" (Button primary).
- **500 Page**:
  - Red hue accents.
  - H2: "Internal Server Error".
  - P: "Our servers are currently sweating. The Lyzard engineering team has been notified."
  - CTA: "Retry" or "Contact Support".

---

## 🔔 6. NOTIFICATION SYSTEM (Toasts)

You must build a custom Toast Provider using Framer Motion `<AnimatePresence>`. 

**Toast Architecture**:
- Position: `fixed bottom-6 right-6` (Desktop), `bottom-4 left-4 right-4` (Mobile).
- Container: Flex-col, rendering a stack of toast components.
- Max visible toasts: 3. Older ones are removed from the array.

**Toast Component Specs**:
- Tailwind: `backdrop-blur-xl bg-white/80 border shadow-premium rounded-2xl p-4 flex items-center gap-3`.
- Entry Animation: `x: 100, opacity: 0` -> `x: 0, opacity: 1`.
- Exit Animation: `x: 100, opacity: 0`.
- Icon Left: CheckCircle (Success), AlertCircle (Warning/Error), InfoIcon (Info).
- Colors: Border and Icon color matches the severity.
- Progress Bar (Optional): Thin colored bar at the bottom shrinking from 100% to 0% over 4 seconds before auto-dismissing.

---

## 🤖 7. BACKEND API INTEGRATION MOCKUP

Ensure you build complete TypeScript Types for the interactions so the frontend is strongly typed:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  avatar_url?: string;
  subscription_tier: 'FREE' | 'PRO' | 'AGENCY';
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  template_id: string;
  html_content: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
```

Axios Interceptor:
Set up an axios instance (`api.ts`) that automatically attaches the JWT Bearer token from localStorage. If it intercepts a `401 Unauthorized`, it must dispatch the `logout()` action to the Zustand auth store and redirect to `/login`.

---

## 🏁 8. FINAL QA & BUILD INSTRUCTIONS
1. **Accessibility**: Every button MUST have an `aria-label` or text content. Focus states MUST be visible (`focus:ring-2 focus:ring-primary focus:outline-none`).
2. **Responsive Checks**:
   - Verify the Builder Split-screen collapses into a Tab view on Mobile (Tab 1: Chat, Tab 2: Preview).
   - Test Hero 3D to ensure it falls back gracefully when `window.innerWidth < 768px`.
3. **Performance Audit**: Run Lighthouse. The application MUST score above 90+ on desktop. Ensure R3F components are not blocking the main thread.
4. **Code Quality**: Use absolute imports (`@/components`), strict ESLint, and clear modularization (e.g., separating `/pages`, `/components/ui`, `/components/layout`, `/store`, `/utils`).

**DO NOT DEVIATE FROM THIS PLAN. BUILD IT COMPONENT BY COMPONENT, ENSURING PIXEL-PERFECT IMPLEMENTATION OF THESE SPECS.**

---
**[END OF MASTER PROMPT]**
