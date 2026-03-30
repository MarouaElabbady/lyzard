<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge" alt="AI-Powered" />
  <img src="https://img.shields.io/badge/Stack-Laravel%20%7C%20React%20%7C%20Supabase-blue?style=for-the-badge" alt="Stack" />
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status" />
</p>

<h1 align="center">🦎 Lyzard.ai</h1>
<p align="center"><strong>Turn your idea into a professional website in 30 seconds.</strong></p>
<p align="center">Describe your business in any language — even Darija — and Lyzard generates a fully responsive, exportable landing page using AI.</p>

---

## ✨ Features

- **Text-to-Site** — Type a description, get a professional landing page in seconds
- **Real-Time Streaming** — Watch your page being built live via SSE
- **Iterate with Chat** — Modify specific sections through conversation
- **Multi-Language** — Works in English, French, Arabic, and Darija
- **Export ZIP** — Download clean HTML/CSS/JS — host anywhere
- **Version History** — Rollback to any previous version
- **Credit System** — 3 free generations on signup

## 🏗️ Architecture

API-First design — backend exposes JSON/SSE only, enabling web + future mobile apps from the same API.

```
┌─────────────────────────────┐
│  lyzard-api (Laravel 11)    │  Auth, Claude AI, Credits, Export
│  JSON + SSE — no HTML       │  Deploy: Railway / Render
├─────────────────────────────┤
│  lyzard-web (React + Vite)  │  Dashboard, Builder, Preview
│  Consumes the API           │  Deploy: Vercel
├─────────────────────────────┤
│  lyzard-mobile (future)     │  Flutter / React Native
│  Same API, zero changes     │  App Store + Play Store
└─────────────────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **API** | Laravel 11, PHP 8.3 | Business logic, auth, streaming |
| **AI** | Claude 3.5 Sonnet (Anthropic) | Code generation via system prompts |
| **Database** | Supabase (PostgreSQL) | Data + Auth + RLS + Storage |
| **Frontend** | React 18, Vite, Tailwind CSS | SPA with live preview |
| **Streaming** | Server-Sent Events (SSE) | Real-time code delivery |
| **Auth** | Supabase Auth + JWT | Google OAuth + email/password |

## 📂 Project Structure

```
LAYZARD/
├── docs/
│   ├── 01-analyse-fonctionnelle.md    # Vision, personas, business rules
│   ├── 02-architecture-technique.md   # API-first design, endpoints, SSE spec
│   ├── 03-backlog-produit.md          # 7 Epics, 30+ user stories, MoSCoW
│   ├── 04-conception-donnees.md       # ERD, SQL scripts, Laravel models
│   ├── 05-sprints-branches.md         # 4 sprints, 172 story points
│   ├── 06-prompts-maquettes-ui.md     # 6 screen designs (dark theme)
│   ├── 07-division-applications.md    # 3 repos structure + code samples
│   ├── 08-system-prompts-ia.md        # Claude system prompts
│   ├── 09-seo-performance.md          # SEO, indexing, Core Web Vitals
│   └── 10-securite-api.md             # Security hardening & checklist
└── README.md
```

## 🔒 Security

> Full documentation in [`docs/10-securite-api.md`](docs/10-securite-api.md)

- **SQL Injection** — Eloquent ORM only (no raw queries), strict Form Requests, Supabase RLS
- **XSS** — Input sanitizer middleware + output escaping + sandboxed iframe preview
- **Auth** — JWT validation middleware, ownership checks (404 not 403)
- **Rate Limiting** — 60/min global, 10/min auth, 5/min generation
- **CORS** — Strict origin whitelist, no wildcards
- **Headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy

## 🚀 Quick Start

### API (Laravel)

```bash
git clone https://github.com/your-org/lyzard-api.git
cd lyzard-api
composer install
cp .env.example .env    # Configure Supabase + Anthropic keys
php artisan key:generate
php artisan serve        # http://localhost:8000
```

### Web (React)

```bash
git clone https://github.com/your-org/lyzard-web.git
cd lyzard-web
npm install
cp .env.example .env    # Set VITE_API_URL + VITE_SUPABASE_URL
npm run dev              # http://localhost:5173
```

## 📊 Sprint Plan

| Sprint | Weeks | Focus | Points |
|---|---|---|---|
| Sprint 1 | 1–2 | Auth + Project Setup | 39 |
| Sprint 2 | 3–4 | AI Generation (core) ⭐ | 52 |
| Sprint 3 | 5–6 | Dashboard + Credits | 43 |
| Sprint 4 | 7–8 | Export + Landing Page | 38 |
| **Total** | **8 weeks** | | **172** |

## 🔑 Environment Variables

| Variable | Repo | Description |
|---|---|---|
| `SUPABASE_URL` | Both | Supabase project URL |
| `SUPABASE_ANON_KEY` | Web | Public key (RLS-protected) |
| `SUPABASE_SERVICE_KEY` | API only | **Secret** — bypasses RLS |
| `SUPABASE_JWT_SECRET` | API only | **Secret** — validates tokens |
| `ANTHROPIC_API_KEY` | API only | **Secret** — Claude API access |
| `CORS_ALLOWED_ORIGINS` | API | `https://lyzard.ai` |

## 👥 Team

| Role | Scope |
|---|---|
| **API Backend** (Fayssal) | Laravel API, auth, Claude integration, credits, export |
| **Web Frontend** (Binôme) | React app, UI components, SSE streaming, preview |

## 📄 License

Proprietary — All rights reserved.

---

<p align="center">
  <strong>🦎 Lyzard.ai</strong> — Built with AI, for builders.
</p>
