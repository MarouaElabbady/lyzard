<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Lyzard.ai v1
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

    // ── Auth (public) ──────────────────────────────────────────────────────
    // Note: register/login/google are handled by Supabase client-side.
    // The sync endpoint must be called AFTER the user signs in via Supabase.

    // ── Protected routes ──────────────────────────────────────────────────
    Route::middleware('supabase.auth')->group(function () {

        // Auth profile & sync
        Route::get('/auth/me',     [AuthController::class, 'me']);
        Route::post('/auth/sync',  [AuthController::class, 'sync']);

        // AI Generation (requires credits and rate limits)
        Route::middleware(['check.credits', 'throttle:5,1'])->group(function () {
            Route::get('/generate',           [\App\Http\Controllers\Api\GenerateController::class, 'generate']);
            Route::post('/generate/iterate',  [\App\Http\Controllers\Api\GenerateController::class, 'iterate']);
        });

        // Credits
        Route::get('/credits', [\App\Http\Controllers\Api\CreditController::class, 'index']);
        Route::post('/credits/purchase', [\App\Http\Controllers\Api\CreditController::class, 'purchase']);

        // Projects & Jobs
        Route::apiResource('projects', ProjectController::class);
        Route::get('/projects/{project}/versions', [ProjectController::class, 'versions'])->name('projects.versions.index');
        Route::post('/projects/{project}/versions', [ProjectController::class, 'storeVersion'])->name('projects.versions.store');
        Route::post('/projects/{project}/export', [ExportController::class, 'export'])->name('projects.export');
        Route::put('/projects/{project}/jobs/{job}', [\App\Http\Controllers\Api\JobController::class, 'update'])
            ->name('jobs.update');
    });
});
