<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCredits
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || $user->credits <= 0) {
            return response()->json([
                'error' => 'Insufficient credits',
                'message' => 'You have 0 credits left. Please purchase more to continue.'
            ], 403);
        }

        return $next($request);
    }
}
