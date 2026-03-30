# 🔒 Sécurité API & Hardening — Lyzard.ai

> Chaque couche de sécurité est documentée avec le code Laravel correspondant.  
> **Objectif** : zéro données accessibles sans auth, zéro injection possible.

---

## 1. Architecture Sécurité — Vue d'Ensemble

```
Requête entrante
  │
  ▼
┌────────────────────┐
│ 1. CORS            │ ← Bloque origines non autorisées
├────────────────────┤
│ 2. Rate Limiting   │ ← Bloque brute force + abus
├────────────────────┤
│ 3. Force JSON      │ ← Rejette tout sauf application/json
├────────────────────┤
│ 4. Input Sanitize  │ ← Nettoie XSS/HTML dans les entrées
├────────────────────┤
│ 5. JWT Auth        │ ← Valide token + vérifie expiration
├────────────────────┤
│ 6. RLS (Supabase)  │ ← L'user ne voit QUE ses données
├────────────────────┤
│ 7. Form Request    │ ← Validation stricte des paramètres
├────────────────────┤
│ 8. Parameterized   │ ← Requêtes SQL préparées (Eloquent)
├────────────────────┤
│ 9. Output Escape   │ ← Réponses nettoyées via Resources
├────────────────────┤
│ 10. Logging        │ ← Audit trail des opérations sensibles
└────────────────────┘
```

---

## 2. Protection Contre les Injections SQL

### Risque
Un attaquant injecte du SQL dans un champ (`prompt`, `title`, `email`) pour lire, modifier ou supprimer des données.

### Protections (3 niveaux)

#### Niveau 1 : Eloquent ORM (requêtes paramétrées)

```php
// ✅ TOUJOURS — Eloquent prépare automatiquement les requêtes
$project = Project::where('user_id', $request->user()->id)
    ->where('id', $projectId)
    ->firstOrFail();

// ❌ JAMAIS — raw SQL avec concaténation
$project = DB::select("SELECT * FROM projects WHERE id = '$id'"); // VULNÉRABLE
```

> **Règle** : Zéro `DB::raw()`, zéro `DB::select()` avec interpolation de variables. Uniquement Eloquent ou Query Builder avec bindings.

#### Niveau 2 : Validation stricte (Form Requests)

```php
// app/Http/Requests/GenerateRequest.php
class GenerateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'project_id' => ['required', 'uuid', 'exists:projects,id'],
            'prompt'     => ['required', 'string', 'max:2000'],
            'section'    => ['nullable', 'string', 'in:hero,features,pricing,footer,cta'],
        ];
    }
}
```

- `uuid` → empêche l'injection dans les IDs
- `max:2000` → limite la taille du prompt
- `in:hero,features,...` → liste blanche pour les sections
- `exists:projects,id` → vérifie l'existence en base

#### Niveau 3 : Row Level Security (Supabase)

```sql
-- Chaque user ne peut voir/modifier QUE ses propres projets
CREATE POLICY "users_own_projects" ON projects
    FOR ALL
    USING (user_id = auth.uid());

-- Chaque user ne peut voir QUE ses propres transactions
CREATE POLICY "users_own_transactions" ON credit_transactions
    FOR SELECT
    USING (user_id = auth.uid());

-- Les code_versions sont accessibles via le projet ownership
CREATE POLICY "users_own_versions" ON code_versions
    FOR ALL
    USING (
        project_id IN (
            SELECT id FROM projects WHERE user_id = auth.uid()
        )
    );
```

---

## 3. Protection XSS (Cross-Site Scripting)

### Risque
Un attaquant injecte du JavaScript dans un champ (`title`, `prompt`) qui s'exécute dans le navigateur d'un autre user.

### Protections

#### Côté API : Middleware InputSanitizer

```php
// app/Http/Middleware/SanitizeInput.php
class SanitizeInput
{
    public function handle(Request $request, Closure $next)
    {
        $input = $request->all();
        array_walk_recursive($input, function (&$value) {
            if (is_string($value)) {
                $value = strip_tags($value);       // Supprime les balises HTML
                $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            }
        });
        $request->merge($input);
        return $next($request);
    }
}
```

#### Côté API : API Resources (output)

```php
// app/Http/Resources/ProjectResource.php
class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => e($this->title),       // ← htmlspecialchars
            'description' => e($this->description),
            'status'      => $this->status,
            'created_at'  => $this->created_at->toISOString(),
        ];
    }
}
```

#### Côté Web : Preview Iframe Sandboxé

```jsx
// Le code généré par Claude est rendu dans un iframe isolé
<iframe
  srcDoc={generatedHtml}
  sandbox="allow-scripts"       // PAS allow-same-origin
  referrerPolicy="no-referrer"
  title="Preview"
/>
```

> L'iframe ne peut **pas** accéder au DOM parent, aux cookies, ni au localStorage de l'app.

#### Headers de Sécurité (Laravel)

```php
// app/Http/Middleware/SecurityHeaders.php
class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'none'");
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        return $response;
    }
}
```

---

## 4. Authentification & Autorisation

### JWT Validation Middleware

```php
// app/Http/Middleware/SupabaseAuth.php
class SupabaseAuth
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'error'   => ['code' => 'unauthorized', 'message' => 'Token required', 'status' => 401]
            ], 401);
        }

        try {
            // Decode + verify with Supabase JWT secret
            $payload = JWT::decode($token, new Key(config('supabase.jwt_secret'), 'HS256'));

            // Check expiration
            if ($payload->exp < time()) {
                throw new TokenExpiredException('Token expired');
            }

            // Attach user to request
            $user = User::findOrFail($payload->sub);
            $request->setUserResolver(fn () => $user);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error'   => ['code' => 'invalid_token', 'message' => 'Invalid or expired token', 'status' => 401]
            ], 401);
        }

        return $next($request);
    }
}
```

### Ownership Verification (dans chaque Controller)

```php
// TOUJOURS vérifier que le projet appartient au user connecté
public function show(Request $request, string $id)
{
    $project = Project::where('id', $id)
        ->where('user_id', $request->user()->id)  // ← ownership check
        ->firstOrFail();                            // ← 404 si pas trouvé (pas 403)

    return new ProjectResource($project);
}
```

> **Important** : Ne jamais retourner `403 Forbidden` si un projet ne nous appartient pas. Retourner `404 Not Found` pour ne pas révéler l'existence de la ressource.

---

## 5. Rate Limiting

```php
// bootstrap/app.php (Laravel 11)
->withMiddleware(function (Middleware $middleware) {
    // Global : 60 requêtes par minute par IP
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });

    // Génération : 5 requêtes par minute par user
    RateLimiter::for('generation', function (Request $request) {
        return Limit::perMinute(5)
            ->by($request->user()->id)
            ->response(function () {
                return response()->json([
                    'success' => false,
                    'error'   => [
                        'code'    => 'rate_limited',
                        'message' => 'Maximum 5 generations per minute. Please wait.',
                        'status'  => 429
                    ]
                ], 429);
            });
    });

    // Auth : 10 tentatives par minute par IP (anti brute-force)
    RateLimiter::for('auth', function (Request $request) {
        return Limit::perMinute(10)->by($request->ip());
    });
})
```

---

## 6. CORS — Configuration Stricte

```php
// config/cors.php
return [
    'paths'                  => ['api/*'],
    'allowed_methods'        => ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_origins'        => explode(',', env('CORS_ALLOWED_ORIGINS', 'https://lyzard.ai')),
    'allowed_origins_patterns' => [],
    'allowed_headers'        => ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    'exposed_headers'        => [],
    'max_age'                => 86400,     // Cache preflight 24h
    'supports_credentials'   => false,     // Pas de cookies cross-origin
];
```

> **Pas de `*` wildcard.** Seules les origines explicites sont autorisées.

---

## 7. Protection des Clés API

| Variable | Où ? | Pourquoi ? |
|---|---|---|
| `SUPABASE_SERVICE_KEY` | `lyzard-api` .env **UNIQUEMENT** | Bypass RLS → accès admin complet |
| `ANTHROPIC_API_KEY` | `lyzard-api` .env **UNIQUEMENT** | Coûte de l'argent par requête |
| `SUPABASE_ANON_KEY` | `lyzard-web` .env (public) | Clé publique, protégée par RLS |
| `SUPABASE_JWT_SECRET` | `lyzard-api` .env **UNIQUEMENT** | Valide les tokens |

```bash
# .gitignore (les deux repos)
.env
.env.local
.env.production
```

---

## 8. Validation des Entrées — Chaque Endpoint

| Endpoint | Champ | Règle | Pourquoi |
|---|---|---|---|
| `/auth/register` | `email` | `required\|email\|unique:users\|max:255` | Prévient doublons + format |
| `/auth/register` | `password` | `required\|min:8\|confirmed` | Force mot de passe robuste |
| `/auth/register` | `name` | `required\|string\|max:100\|regex:/^[\pL\s]+$/u` | Que des lettres + espaces |
| `/generate` | `prompt` | `required\|string\|max:2000` | Limite taille envoyée à Claude |
| `/generate` | `project_id` | `required\|uuid\|exists:projects,id` | Format UUID strict |
| `/projects` | `title` | `nullable\|string\|max:200` | Limite taille |
| `/credits/purchase` | `package` | `required\|in:10,50,100` | Liste blanche stricte |

---

## 9. Audit Logging

```php
// app/Services/AuditLogger.php
class AuditLogger
{
    public static function log(string $action, User $user, array $context = []): void
    {
        Log::channel('audit')->info($action, [
            'user_id'    => $user->id,
            'ip'         => request()->ip(),
            'user_agent' => request()->userAgent(),
            'timestamp'  => now()->toISOString(),
            ...$context,
        ]);
    }
}

// Événements loggés :
// - login_success, login_failed
// - register
// - generation_start, generation_complete, generation_failed
// - credit_deducted, credit_purchased
// - project_deleted
// - export_downloaded
```

---

## 10. Checklist Sécurité Avant Déploiement

- [ ] `APP_DEBUG=false` en production
- [ ] `APP_ENV=production`
- [ ] HTTPS forcé partout (`FORCE_HTTPS=true`)
- [ ] `CORS_ALLOWED_ORIGINS` ne contient **pas** `*`
- [ ] `SUPABASE_SERVICE_KEY` **absent** du repo web
- [ ] `ANTHROPIC_API_KEY` **absent** du repo web
- [ ] Toutes les routes `/api/v1/` protégées par `SupabaseAuth` sauf `/auth/*`
- [ ] Rate limiting activé sur `/auth/*` (10/min) et `/generate` (5/min)
- [ ] `.env` dans `.gitignore`
- [ ] Headers de sécurité actifs (CSP, HSTS, X-Frame-Options)
- [ ] RLS activé sur toutes les tables Supabase
- [ ] Pas de `DB::raw()` ou `DB::select()` avec interpolation
- [ ] Preview iframe : `sandbox="allow-scripts"` sans `allow-same-origin`
- [ ] Logs d'audit activés pour toutes les opérations sensibles
- [ ] Tokens JWT expiration ≤ 1h avec refresh token
