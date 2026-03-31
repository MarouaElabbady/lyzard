<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Story 1.6 - Middleware supabase.auth
 * Validates the Supabase JWT and auto-provisions the user in our DB.
 */
class SupabaseAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'error'   => 'Unauthenticated',
                'message' => 'No bearer token provided.',
            ], 401);
        }

        try {
            $secret = config('services.supabase.jwt_secret');

            if (!$secret) {
                return response()->json([
                    'error'   => 'Configuration Error',
                    'message' => 'SUPABASE_JWT_SECRET is not configured.',
                ], 500);
            }

            // Validate the JWT signature with the Supabase project secret (HS256)
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            $payload = (array) $decoded;

            // The 'sub' claim is the Supabase user UUID
            if (empty($payload['sub'])) {
                return response()->json([
                    'error'   => 'Invalid Token',
                    'message' => 'Token is missing the subject claim.',
                ], 401);
            }

            // Check token expiry
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                return response()->json([
                    'error'   => 'Token Expired',
                    'message' => 'Your session has expired. Please sign in again.',
                ], 401);
            }

            // Find or provision the user in our database
            $user = User::firstOrCreate(
                ['supabase_id' => $payload['sub']],
                [
                    'email'   => $payload['email'] ?? null,
                    'name'    => $payload['user_metadata']->full_name
                                 ?? $payload['user_metadata']->name
                                 ?? null,
                    'credits' => 3, // 3 free credits on first login
                ],
            );

            // Bind the user to the current request lifecycle
            Auth::login($user);

        } catch (Throwable $e) {
            return response()->json([
                'error'   => 'Unauthenticated',
                'message' => 'Invalid or expired token.',
            ], 401);
        }

        return $next($request);
    }
}
