<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Sync user data from Supabase session.
     */
    public function sync(Request $request)
    {
        // The user is already synced by the middleware,
        // but we can add specific logic here if needed.
        return response()->json([
            'status' => 'success',
            'user' => $request->user(),
        ]);
    }
}
