# 📅 Sprints & Branches — Lyzard.ai (API-First)

> 4 sprints × 2 semaines. **API et Web App en parallèle** grâce au contrat d'intégration.

---

## Sprint Overview

```
Sprint 1 (S1-S2) ── Auth + Setup        ── Fondations
Sprint 2 (S3-S4) ── Génération IA       ── Core produit
Sprint 3 (S5-S6) ── Dashboard + Crédits ── UX complète
Sprint 4 (S7-S8) ── Export + Landing    ── Go-to-market
```

---

## Sprint 1 — Fondations & Auth (Semaines 1-2)

### Objectif : Les deux devs peuvent se connecter et accéder à l'app

| # | Story | Repo | Dev | Points |
|---|---|---|---|---|
| 1.1 | Setup repo API + Laravel scaffold + Supabase connection | `lyzard-api` | Fayssal | 3 |
| 1.2 | Setup repo Web + Vite + Tailwind + React Router | `lyzard-web` | Binôme | 3 |
| 1.3 | POST `/auth/register` — inscription, hash, 3 crédits | `lyzard-api` | Fayssal | 5 |
| 1.4 | POST `/auth/login` + JWT token | `lyzard-api` | Fayssal | 3 |
| 1.5 | POST `/auth/google` — OAuth Google | `lyzard-api` | Fayssal | 5 |
| 1.6 | Middleware `SupabaseAuth` (valide JWT sur requêtes) | `lyzard-api` | Fayssal | 3 |
| 1.7 | Page Login — formulaire + Google button | `lyzard-web` | Binôme | 5 |
| 1.8 | Page Signup — formulaire + validation client | `lyzard-web` | Binôme | 5 |
| 1.9 | API Client (`src/api/client.js`) + interceptors JWT | `lyzard-web` | Binôme | 3 |
| 1.10 | ProtectedRoute + redirect si non-authentifié | `lyzard-web` | Binôme | 2 |
| 1.11 | `ForceJsonResponse` + format erreur uniforme | `lyzard-api` | Fayssal | 2 |

**Total : 39 points**

### Definition of Done Sprint 1

- [ ] Un utilisateur peut s'inscrire par email → reçoit 3 crédits
- [ ] Un utilisateur peut se connecter par email ou Google
- [ ] Le token JWT est stocké et envoyé automatiquement
- [ ] Les routes protégées redirigent vers `/login`
- [ ] L'API retourne du JSON uniforme pour succès et erreurs

---

## Sprint 2 — Génération IA (Semaines 3-4)

### Objectif : Le cœur du produit fonctionne — prompt → landing page

| # | Story | Repo | Dev | Points |
|---|---|---|---|---|
| 2.1 | `ClaudeService` — streaming Anthropic | `lyzard-api` | Fayssal | 8 |
| 2.2 | `PromptBuilder` — system prompt + contexte | `lyzard-api` | Fayssal | 5 |
| 2.3 | POST `/generate` — SSE stream endpoint | `lyzard-api` | Fayssal | 5 |
| 2.4 | POST `/generate/iterate` — modifier section | `lyzard-api` | Fayssal | 5 |
| 2.5 | `CheckCredits` middleware — vérifie solde > 0 | `lyzard-api` | Fayssal | 2 |
| 2.6 | Insert `code_versions` + déduire crédit + transaction | `lyzard-api` | Fayssal | 3 |
| 2.7 | Builder layout — split panel Chat + Preview | `lyzard-web` | Binôme | 5 |
| 2.8 | `useSSEStream` hook — réception chunks | `lyzard-web` | Binôme | 5 |
| 2.9 | ChatPanel — messages user + AI + animation | `lyzard-web` | Binôme | 5 |
| 2.10 | PreviewIframe — rendu live + sandbox | `lyzard-web` | Binôme | 5 |
| 2.11 | DeviceSwitcher — Desktop/Tablet/Mobile | `lyzard-web` | Binôme | 2 |
| 2.12 | Rate limiting sur `/generate` (5/min) | `lyzard-api` | Fayssal | 2 |

**Total : 52 points**

### Definition of Done Sprint 2

- [ ] Le user saisit un prompt → la page se génère en streaming
- [ ] Le preview affiche le résultat en temps réel dans l'iframe
- [ ] L'itération modifie des sections spécifiques
- [ ] 1 crédit est déduit à chaque génération
- [ ] Le rate limiting empêche > 5 générations/minute

---

## Sprint 3 — Dashboard & Crédits (Semaines 5-6)

### Objectif : Gestion complète des projets et des crédits

| # | Story | Repo | Dev | Points |
|---|---|---|---|---|
| 3.1 | CRUD `/projects` — list, create, update, delete | `lyzard-api` | Fayssal | 5 |
| 3.2 | GET `/projects/{id}/versions` + restore | `lyzard-api` | Fayssal | 5 |
| 3.3 | GET `/credits` + POST `/credits/purchase` | `lyzard-api` | Fayssal | 5 |
| 3.4 | Pagination + tri par date | `lyzard-api` | Fayssal | 2 |
| 3.5 | Dashboard page — grille projets | `lyzard-web` | Binôme | 5 |
| 3.6 | ProjectCard — thumbnail, status, hover actions | `lyzard-web` | Binôme | 3 |
| 3.7 | Empty state + "Nouveau projet" dialog | `lyzard-web` | Binôme | 3 |
| 3.8 | Delete confirmation modal | `lyzard-web` | Binôme | 2 |
| 3.9 | CreditBadge navbar + PurchaseModal | `lyzard-web` | Binôme | 5 |
| 3.10 | Version selector dans le builder | `lyzard-web` | Binôme | 3 |
| 3.11 | Settings page — profil + crédits + historique | `lyzard-web` | Binôme | 5 |

**Total : 43 points**

### Definition of Done Sprint 3

- [ ] Le dashboard affiche tous les projets avec pagination
- [ ] Un user peut créer, renommer, supprimer un projet
- [ ] L'historique des versions est consultable + restauration
- [ ] L'achat de crédits fonctionne
- [ ] Les settings permettent de modifier le profil

---

## Sprint 4 — Export & Polish (Semaines 7-8)

### Objectif : Prêt pour le lancement

| # | Story | Repo | Dev | Points |
|---|---|---|---|---|
| 4.1 | POST `/projects/{id}/export` — ZIP (HTML + assets) | `lyzard-api` | Fayssal | 5 |
| 4.2 | `ZipExportService` — HTML standalone + images | `lyzard-api` | Fayssal | 3 |
| 4.3 | Upload ZIP → Supabase Storage + URL signée | `lyzard-api` | Fayssal | 3 |
| 4.4 | Unit tests API (Auth, Generate, Credits, Export) | `lyzard-api` | Fayssal | 5 |
| 4.5 | Export button dans builder — télécharge ZIP | `lyzard-web` | Binôme | 3 |
| 4.6 | Landing page marketing | `lyzard-web` | Binôme | 5 |
| 4.7 | SEO — meta tags, robots.txt, sitemap, OG | `lyzard-web` | Binôme | 3 |
| 4.8 | Animations + micro-interactions polish | `lyzard-web` | Binôme | 3 |
| 4.9 | Tests E2E — flux complet (signup → generate → export) | `lyzard-web` | Binôme | 5 |
| 4.10 | Deploy API (Railway/Render) + Web (Vercel) | Both | Both | 3 |

**Total : 38 points**

### Definition of Done Sprint 4

- [ ] L'export génère un ZIP propre téléchargeable
- [ ] La landing page est publiée avec SEO complet
- [ ] Les tests E2E valident le flux principal
- [ ] L'app est déployée et accessible publiquement

---

## Total Général

| Sprint | Points | Focus |
|---|---|---|
| Sprint 1 | 39 | Auth + Setup |
| Sprint 2 | 52 | Génération IA ⭐ |
| Sprint 3 | 43 | Dashboard + Crédits |
| Sprint 4 | 38 | Export + Marketing |
| **Total** | **172** | **8 semaines** |

---

## Git Branching — Par Repo

Chaque repo suit le même modèle :

```
main          ← Production stable
  └── develop ← Integration
       ├── feature/auth-register
       ├── feature/claude-streaming
       ├── feature/project-crud
       └── fix/credit-deduction
```

### Conventions de Commit

```
feat(api): add POST /generate SSE streaming endpoint
feat(web): add ChatPanel with message history
fix(api): correct credit deduction race condition
refactor(web): extract useSSEStream hook
test(api): add ClaudeService unit tests
docs: update API contract for v1.2
chore: update dependencies
```

### Branches par Sprint

#### Sprint 1

| Branche | Repo |
|---|---|
| `feature/api-setup` | `lyzard-api` |
| `feature/web-setup` | `lyzard-web` |
| `feature/auth-register` | `lyzard-api` |
| `feature/auth-login` | `lyzard-api` |
| `feature/auth-google` | `lyzard-api` |
| `feature/auth-middleware` | `lyzard-api` |
| `feature/login-page` | `lyzard-web` |
| `feature/signup-page` | `lyzard-web` |
| `feature/api-client` | `lyzard-web` |
| `feature/protected-routes` | `lyzard-web` |

#### Sprint 2

| Branche | Repo |
|---|---|
| `feature/claude-service` | `lyzard-api` |
| `feature/prompt-builder` | `lyzard-api` |
| `feature/generate-endpoint` | `lyzard-api` |
| `feature/iterate-endpoint` | `lyzard-api` |
| `feature/check-credits-middleware` | `lyzard-api` |
| `feature/builder-layout` | `lyzard-web` |
| `feature/sse-stream-hook` | `lyzard-web` |
| `feature/chat-panel` | `lyzard-web` |
| `feature/preview-iframe` | `lyzard-web` |
| `feature/device-switcher` | `lyzard-web` |

#### Sprint 3

| Branche | Repo |
|---|---|
| `feature/project-crud` | `lyzard-api` |
| `feature/version-history` | `lyzard-api` |
| `feature/credits-api` | `lyzard-api` |
| `feature/dashboard-page` | `lyzard-web` |
| `feature/project-cards` | `lyzard-web` |
| `feature/credit-purchase` | `lyzard-web` |
| `feature/version-selector` | `lyzard-web` |
| `feature/settings-page` | `lyzard-web` |

#### Sprint 4

| Branche | Repo |
|---|---|
| `feature/export-zip` | `lyzard-api` |
| `feature/api-tests` | `lyzard-api` |
| `feature/export-button` | `lyzard-web` |
| `feature/landing-page` | `lyzard-web` |
| `feature/seo-meta` | `lyzard-web` |
| `feature/e2e-tests` | `lyzard-web` |
| `chore/deploy-production` | Both |
