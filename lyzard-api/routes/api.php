<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public routes (if any)

    // Protected routes
    Route::middleware('supabase.auth')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/sync', [AuthController::class, 'sync']);

        // AI Generation (Streamed)
        Route::middleware('check.credits')->group(function () {
            Route::get('/generate', [\App\Http\Controllers\Api\GenerateController::class, 'generate']);
            Route::post('/generate/iterate', [\App\Http\Controllers\Api\GenerateController::class, 'iterate']);
        });

        // Projects & Jobs
        Route::put('/projects/{project}/jobs/{job}', [\App\Http\Controllers\Api\JobController::class, 'update'])->name('jobs.update');
    });
});
