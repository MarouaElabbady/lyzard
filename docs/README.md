# 📚 Lyzard.ai — Documentation Projet

> **SaaS de Génération Instantanée de Landing Pages par IA**
> Architecture **API-First** — Web + Future Mobile

---

## 📂 Index des Documents

| # | Document | Description |
|---|---|---|
| 01 | [Analyse Fonctionnelle](./01-analyse-fonctionnelle.md) | Vision, personas, modules, règles métier, flux utilisateur |
| 02 | [Architecture Technique](./02-architecture-technique.md) | **API-First**, 3 couches, endpoints versionnés, SSE spec |
| 03 | [Backlog Produit](./03-backlog-produit.md) | 7 Epics, 30+ User Stories, MoSCoW, story points |
| 04 | [Conception & Données](./04-conception-donnees.md) | ERD, scripts SQL Supabase, classes Laravel, patterns |
| 05 | [Sprints & Branches](./05-sprints-branches.md) | 4 sprints × 2 repos en parallèle, Git branches par sprint |
| 06 | [Prompts Maquettes UI](./06-prompts-maquettes-ui.md) | **6 écrans web** avec dark design system, tous les états |
| 07 | [Division Applications](./07-division-applications.md) | **3 repos** (API + Web + futur Mobile), structures, code |
| 08 | [System Prompts IA](./08-system-prompts-ia.md) | Prompts Claude pour génération, itération, Darija |
| 09 | [SEO & Performance](./09-seo-performance.md) | Meta tags, Schema.org, Core Web Vitals, Indexing, Caching |
| 10 | [Sécurité API](./10-securite-api.md) | SQL injection, XSS, CORS, Rate Limiting, Audit, Deploy checklist |

---

## 🏗️ Architecture API-First

```
┌─────────────────────────┐
│  lyzard-api (Laravel)   │ ← Logique métier, Auth, Claude, Crédits
│  JSON + SSE seulement   │    Un seul point à sécuriser
├─────────────────────────┤
│  lyzard-web (React)     │ ← Interface utilisateur web
│  Consomme l'API         │    Deploy : Vercel
├─────────────────────────┤
│  lyzard-mobile (futur)  │ ← Flutter/React Native
│  Même API, 0 changement │    App Store + Play Store
└─────────────────────────┘
```

## 📊 Métriques Projet

- **172 Story Points** répartis sur 4 sprints
- **2 repos** actifs (API + Web), 1 futur (Mobile)
- **20+ API Endpoints** versionnés `/api/v1/`
- **6 Maquettes UI** web avec prompts Stitch-ready
- **SSE Streaming** pour la génération en temps réel

## 👥 Équipe

| Rôle | Dev | Repo principal |
|---|---|---|
| API Backend | Fayssal | `lyzard-api` |
| Web Frontend | Binôme | `lyzard-web` |

## 🔑 Principe Mobile-Ready

L'API ne retourne **jamais** de HTML — uniquement du JSON et du SSE. Pour ajouter une app mobile plus tard :

1. Créer le repo `lyzard-mobile`
2. Implémenter le même `API Client` (même contrat HTTP)
3. Ajouter l'origine mobile dans `CORS_ALLOWED_ORIGINS`
4. **Zéro changement côté API** ✅
