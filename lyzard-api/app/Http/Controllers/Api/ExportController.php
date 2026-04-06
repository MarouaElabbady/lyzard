<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ZipExportService;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function __construct(private ZipExportService $exportService) {}

    /**
     * POST /v1/projects/{project}/export
     * Generate and download a ZIP of the project's latest version.
     */
    public function export(Request $request, Project $project)
    {
        // Authorization
        if ($project->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $zipPath = $this->exportService->export($project);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $filename = preg_replace('/[^a-z0-9\-_]/i', '_', $project->name) . '.zip';

        return response()->download($zipPath, $filename, [
            'Content-Type'        => 'application/zip',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ])->deleteFileAfterSend(true);
    }
}
