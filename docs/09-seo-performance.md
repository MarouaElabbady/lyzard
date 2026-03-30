# 🔍 SEO, Indexation & Performance — Lyzard.ai

> SEO pour la **landing page marketing** + SEO pour les **pages générées par les users**.

---

## 1. SEO de la Landing Page (lyzard.ai)

### Meta Tags

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO -->
  <title>Lyzard.ai — Turn Your Idea Into a Website in 30 Seconds</title>
  <meta name="description" content="Describe your business in any language. Lyzard AI generates a professional, responsive landing page with real content and design — ready to export." />
  <meta name="keywords" content="AI website builder, landing page generator, text to website, AI web design, Lyzard" />
  <link rel="canonical" href="https://lyzard.ai/" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Lyzard.ai — AI Website Builder" />
  <meta property="og:description" content="Turn your idea into a professional landing page in 30 seconds with AI." />
  <meta property="og:image" content="https://lyzard.ai/og-image.png" />
  <meta property="og:url" content="https://lyzard.ai/" />
  <meta property="og:site_name" content="Lyzard.ai" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Lyzard.ai — AI Website Builder" />
  <meta name="twitter:description" content="Turn your idea into a professional landing page in 30 seconds." />
  <meta name="twitter:image" content="https://lyzard.ai/og-image.png" />

  <!-- Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://api.lyzard.ai" />
</head>
```

### Schema.org (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lyzard.ai",
  "url": "https://lyzard.ai",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "AI-powered landing page generator. Describe your business and get a professional website in seconds.",
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "name": "Free Plan",
      "description": "3 free page generations per month"
    },
    {
      "@type": "Offer",
      "price": "9",
      "priceCurrency": "USD",
      "name": "Pro Plan",
      "description": "Unlimited generations, priority support"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  },
  "creator": {
    "@type": "Organization",
    "name": "Lyzard.ai",
    "url": "https://lyzard.ai"
  }
}
</script>
```

### Sitemap (`public/sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lyzard.ai/</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lyzard.ai/login</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://lyzard.ai/signup</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Robots (`public/robots.txt`)

```
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /builder
Disallow: /settings
Disallow: /api/

Sitemap: https://lyzard.ai/sitemap.xml
```

> Les pages authentifiées (dashboard, builder, settings) ne sont **pas** indexées.

---

## 2. SEO des Pages Générées par les Users

### Injection SEO dans le System Prompt Claude

Le `PromptBuilder` injecte automatiquement des instructions SEO dans chaque génération :

```
Le HTML généré DOIT inclure :
- Un seul <h1> contenant le nom du business
- Une hiérarchie <h2> → <h3> logique (pas de saut)
- Des attributs alt="" descriptifs sur chaque <img>
- Des textes de liens descriptifs (pas de "cliquez ici")
- Une structure sémantique : <header>, <main>, <section>, <footer>
- Un <meta name="description"> pertinent dans le <head>
- Un <title> descriptif dans le <head>
```

### Validation Côté API (post-génération)

```php
// app/Services/AI/SeoValidator.php
class SeoValidator
{
    public static function validate(string $html): array
    {
        $warnings = [];

        // Check single H1
        preg_match_all('/<h1[^>]*>/i', $html, $h1s);
        if (count($h1s[0]) !== 1) {
            $warnings[] = 'Page should have exactly one <h1>';
        }

        // Check meta description
        if (!str_contains($html, 'name="description"')) {
            $warnings[] = 'Missing <meta name="description">';
        }

        // Check img alt
        preg_match_all('/<img(?![^>]*alt=)[^>]*>/i', $html, $noAlt);
        if (count($noAlt[0]) > 0) {
            $warnings[] = count($noAlt[0]) . ' images missing alt attributes';
        }

        // Check title
        if (!str_contains($html, '<title>')) {
            $warnings[] = 'Missing <title> tag';
        }

        // Check semantic structure
        foreach (['<header', '<main', '<footer'] as $tag) {
            if (!str_contains($html, $tag)) {
                $warnings[] = "Missing semantic tag: $tag";
            }
        }

        return $warnings;
    }
}
```

L'API retourne les warnings dans la réponse SSE `done` :

```
event: done
data: {
  "type": "done",
  "version_number": 3,
  "credits_remaining": 2,
  "seo_warnings": ["2 images missing alt attributes"]
}
```

---

## 3. Performance Web — Core Web Vitals

### Objectifs

| Métrique | Cible | Description |
|---|---|---|
| **LCP** | < 2.5s | Largest Contentful Paint — hero visible rapidement |
| **INP** | < 200ms | Interaction to Next Paint — réponse rapide aux clics |
| **CLS** | < 0.1 | Cumulative Layout Shift — aucun saut de layout |

### Optimisations — Landing Page

```jsx
// 1. IMAGES — format WebP + lazy loading
<img
  src="/hero-screenshot.webp"
  alt="Lyzard AI generating a website"
  width={800}
  height={450}
  loading="lazy"                    // Lazy sauf above-the-fold
  decoding="async"
/>

// 2. FONTS — preload + font-display swap
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
// CSS:
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;              // Texte visible immédiatement
}

// 3. CODE SPLITTING — React lazy imports
const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
```

### Optimisations — Builder

```jsx
// 4. PREVIEW IFRAME — ne recharger que le contenu
const PreviewIframe = ({ html }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Write to iframe sans le recharger complètement
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return <iframe ref={iframeRef} sandbox="allow-scripts" />;
};

// 5. SSE STREAMING — append au lieu de re-render
const useSSEStream = (url) => {
  const [chunks, setChunks] = useState('');

  useEffect(() => {
    const source = new EventSource(url);
    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'chunk') {
        setChunks(prev => prev + data.content); // Append, pas replace
      }
    };
    return () => source.close();
  }, [url]);

  return chunks;
};
```

### Vite Config — Build Optimisé

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['zustand', 'axios'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },  // Supprime console.log en prod
    },
  },
});
```

---

## 4. Database Indexing — Supabase (PostgreSQL)

### Index pour les Requêtes Fréquentes

```sql
-- ═══════════════════════════════════════════
-- INDEX PRIMAIRES (les plus utilisés)
-- ═══════════════════════════════════════════

-- Dashboard : liste des projets d'un user, triés par date
CREATE INDEX idx_projects_user_created
ON projects (user_id, created_at DESC);

-- Builder : dernière version d'un projet
CREATE INDEX idx_versions_project_number
ON code_versions (project_id, version_number DESC);

-- Credits : solde et historique d'un user
CREATE INDEX idx_transactions_user_date
ON credit_transactions (user_id, created_at DESC);

-- Auth : login par email
CREATE UNIQUE INDEX idx_users_email
ON users (email);

-- ═══════════════════════════════════════════
-- INDEX SECONDAIRES (recherche + filtres)
-- ═══════════════════════════════════════════

-- Dashboard : filtrer par status
CREATE INDEX idx_projects_user_status
ON projects (user_id, status);

-- Audit : chercher les transactions par type
CREATE INDEX idx_transactions_type
ON credit_transactions (transaction_type);

-- Performance : projets les plus récents (pour trending futur)
CREATE INDEX idx_projects_created
ON projects (created_at DESC);
```

### EXPLAIN Analyze — Scénarios Clés

```sql
-- Scénario 1 : Dashboard — "Mes projets"
-- Cible : < 5ms pour 100 projets
EXPLAIN ANALYZE
SELECT * FROM projects
WHERE user_id = 'uuid-xxx'
ORDER BY created_at DESC
LIMIT 12 OFFSET 0;
-- Utilise idx_projects_user_created → Index Scan

-- Scénario 2 : Builder — "Charger le code actuel"
-- Cible : < 2ms
EXPLAIN ANALYZE
SELECT * FROM code_versions
WHERE project_id = 'uuid-xxx'
ORDER BY version_number DESC
LIMIT 1;
-- Utilise idx_versions_project_number → Index Scan

-- Scénario 3 : Auth — "Login par email"
-- Cible : < 1ms
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'user@example.com';
-- Utilise idx_users_email → Index Only Scan
```

### Règles d'Indexation

| ✅ Indexer | ❌ Ne pas indexer |
|---|---|
| Colonnes dans `WHERE` fréquents | Colonnes rarement filtrées |
| Colonnes dans `ORDER BY` | Tables < 1000 lignes |
| Clés étrangères (FK) | Colonnes à forte cardinalité avec `LIKE '%...'` |
| Colonnes dans `JOIN` | Données fréquemment mises à jour (trade-off) |

---

## 5. Caching Strategy

```
┌─────────────────────────────────────────┐
│  Niveau 1: Browser Cache (Web App)      │
│  - Static assets : Cache-Control 1 year │
│  - API GET : pas de cache (données live)│
├─────────────────────────────────────────┤
│  Niveau 2: Laravel Cache (API)          │
│  - User credits balance : 30s          │
│  - Project list : 60s (invalidé on CUD)│
├─────────────────────────────────────────┤
│  Niveau 3: CDN (Vercel Edge)            │
│  - Landing page : ISR 1h              │
│  - Static assets : immutable cache      │
└─────────────────────────────────────────┘
```

```php
// Exemple cache API — credits balance
public function getBalance(Request $request)
{
    $userId = $request->user()->id;

    $balance = Cache::remember("credits:{$userId}", 30, function () use ($userId) {
        return User::find($userId)->credits_balance;
    });

    // Invalider le cache quand un crédit est déduit
    // Dans CreditManager::deduct() :
    // Cache::forget("credits:{$userId}");

    return response()->json(['success' => true, 'data' => ['balance' => $balance]]);
}
```

---

## 6. Lighthouse Targets

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Landing Page | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 |
| Login/Signup | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 90 |
| Dashboard | ≥ 90 | ≥ 90 | ≥ 95 | N/A (noindex) |
| Builder | ≥ 85 | ≥ 85 | ≥ 95 | N/A (noindex) |

> Le builder peut être légèrement < 90 en performance à cause du streaming SSE + iframe live.
