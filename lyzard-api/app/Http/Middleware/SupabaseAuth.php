<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SupabaseAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Unauthenticated (No token)'], 401);
        }

        try {
            $secret = env('SUPABASE_JWT_SECRET');

            if (!$secret) {
                // In local development, if secret is missing, we might want a fallback
                // but for security, we should enforce it.
                if (config('app.env') === 'local') {
                    // Decoding without verification for local testing ONLY
                    $tks = explode('.', $token);
                    if (count($tks) !== 3) {
                         return response()->json(['error' => 'Invalid token structure'], 401);
                    }
                    $payload = json_decode(base64_decode($tks[1]), true);
                } else {
                    return response()->json(['error' => 'Supabase JWT Secret not configured'], 500);
                }
            } else {
                $decoded = JWT::decode($token, new Key($secret, 'HS256'));
                $payload = (array) $decoded;
            }

            if (!isset($payload['sub'])) {
                return response()->json(['error' => 'Invalid token payload (no sub)'], 401);
            }

            // Find or Create the user in our local DB
            $user = User::firstOrCreate(
                ['supabase_id' => $payload['sub']],
                [
                    'email' => $payload['email'] ?? null,
                    'name' => $payload['user_metadata']['full_name'] ?? null,
                    'credits' => 3, // Initial free credits
                ]
            );

            // Set the user for the request
            \Illuminate\Support\Facades\Auth::login($user);

            return $next($request);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unauthenticated (JWT Error)',
                'message' => $e->getMessage()
            ], 401);
        }
    }
}
