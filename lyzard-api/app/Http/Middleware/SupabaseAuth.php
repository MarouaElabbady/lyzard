<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Story 1.6 - Middleware supabase.auth
 * Validates the Supabase JWT using ES256 + JWKS public key.
 * Falls back to HS256 legacy secret if project still uses it.
 */
class SupabaseAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?? $request->query('token');

        if (!$token) {
            return response()->json([
                'error'   => 'Unauthenticated',
                'message' => 'No bearer token provided.',
            ], 401);
        }

        try {
            $payload = $this->decodeToken($token);

            // The 'sub' claim is the Supabase user UUID
            if (empty($payload['sub'])) {
                return response()->json([
                    'error'   => 'Invalid Token',
                    'message' => 'Token is missing the subject claim.',
                ], 401);
            }

            // Find or provision the user in our database
            $user = User::firstOrCreate(
                ['supabase_id' => $payload['sub']],
                [
                    'email'   => $payload['email'] ?? null,
                    'name'    => (isset($payload['user_metadata']) ? ($payload['user_metadata']->full_name ?? $payload['user_metadata']->name ?? null) : null),
                    'credits' => 3,
                ],
            );

            Auth::login($user);

        } catch (Throwable $e) {
            Log::error('SupabaseAuth failed', [
                'error' => $e->getMessage(),
                'class' => get_class($e),
            ]);
            return response()->json([
                'error'   => 'Unauthenticated',
                'message' => 'Invalid or expired token: ' . $e->getMessage(),
            ], 401);
        }

        return $next($request);
    }

    /**
     * Decode the JWT — tries ES256 (JWKS) first, falls back to HS256 (legacy secret).
     */
    private function decodeToken(string $token): array
    {
        // ── Try ES256 via JWKS ────────────────────────────────────────────────
        try {
            $jwks = $this->getJwks();
            $keys = JWK::parseKeySet($jwks);
            $decoded = JWT::decode($token, $keys);
            return (array) $decoded;
        } catch (Throwable $e) {
            Log::debug('ES256 JWKS decode failed, trying HS256 fallback', ['err' => $e->getMessage()]);
        }

        // ── Fallback: HS256 with legacy JWT secret ────────────────────────────
        $secret = config('services.supabase.jwt_secret');
        if ($secret) {
            // Try raw secret first, then base64-decoded
            foreach ([$secret, base64_decode($secret)] as $key) {
                try {
                    $decoded = JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
                    return (array) $decoded;
                } catch (Throwable) {
                    // continue
                }
            }
        }

        throw new \RuntimeException('Could not verify JWT with any available key.');
    }

    /**
     * Fetch JWKS from Supabase — cached for 1 hour to avoid hammering the endpoint.
     */
    private function getJwks(): array
    {
        $supabaseUrl = config('services.supabase.url');
        $jwksUrl = rtrim($supabaseUrl, '/') . '/auth/v1/.well-known/jwks.json';

        return Cache::remember('supabase_jwks', 3600, function () use ($jwksUrl) {
            $response = file_get_contents($jwksUrl);
            if ($response === false) {
                throw new \RuntimeException('Failed to fetch JWKS from Supabase.');
            }
            return json_decode($response, true);
        });
    }
}
