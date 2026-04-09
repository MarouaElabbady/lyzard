<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CreditController;
use App\Http\Controllers\Api\GenerateController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Lyzard.ai v1 - Auth Only
|--------------------------------------------------------------------------
*/

// Health check - no auth required
Route::get('/health', fn () => response()->json([
    'status'  => 'ok',
    'service' => 'lyzard-api',
    'version' => '1.0.0',
    'time'    => now()->toIso8601String(),
]));

Route::prefix('v1')->group(function () {

    // ── Protected routes ──────────────────────────────────────────────────
    Route::middleware('supabase.auth')->group(function () {
        // Auth profile & sync
        Route::get('/auth/me',     [AuthController::class, 'me']);
        Route::post('/auth/sync',  [AuthController::class, 'sync']);

        // Credits
        Route::get('/credits', [CreditController::class, 'index']);
        Route::post('/credits/purchase', [CreditController::class, 'purchase']);

        // Generation
        Route::post('/generate', [GenerateController::class, 'generate']);
        Route::post('/iterate', [GenerateController::class, 'iterate']);

        // Projects
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::get('/projects/{project}', [ProjectController::class, 'show']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
        
        // Project Versions
        Route::get('/projects/{project}/versions', [ProjectController::class, 'versions']);
        Route::post('/projects/{project}/versions', [ProjectController::class, 'storeVersion']);

        // Export
        Route::get('/projects/{project}/export', [ExportController::class, 'export']);

        // Jobs
        Route::put('/projects/{project}/jobs/{job}', [JobController::class, 'update']);
    });
});
