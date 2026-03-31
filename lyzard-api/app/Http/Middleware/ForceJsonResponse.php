<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Story 1.11 - Format erreur uniforme
 * Forces all API responses to be JSON with a consistent error format.
 */
class ForceJsonResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        // Force the request to accept JSON
        $request->headers->set('Accept', 'application/json');

        $response = $next($request);

        // Ensure Content-Type is always application/json for API routes
        if (!$response->headers->has('Content-Type') || 
            !str_contains($response->headers->get('Content-Type'), 'text/event-stream')) {
            $response->headers->set('Content-Type', 'application/json');
        }

        return $response;
    }
}
