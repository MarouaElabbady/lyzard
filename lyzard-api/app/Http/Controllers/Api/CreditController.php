<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CreditController extends Controller
{
    /**
     * Get current user's credits
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'credits' => $request->user()->credits
        ]);
    }

    /**
     * Mock a credit purchase (adds 10 credits)
     */
    public function purchase(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();
        $user->increment('credits', 10);
        
        return response()->json([
            'message' => 'Successfully purchased 10 credits',
            'credits' => $user->credits
        ]);
    }
}
