<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the user's projects.
     */
    public function index(Request $request): JsonResponse
    {
        $projects = $request->user()->projects()
            ->withCount('versions')
            ->orderBy('updated_at', 'desc')
            ->paginate(12);

        return response()->json($projects);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $project = $request->user()->projects()->create([
            'name' => $request->name,
            'status' => 'pending',
            'settings' => [],
        ]);

        return response()->json($project, 201);
    }

    /**
     * Display the specified project with its latest version.
     */
    public function show(Project $project): JsonResponse
    {
        $this->authorizeAccess($project);

        $project->load(['versions' => function ($query) {
            $query->latest()->limit(1);
        }]);

        return response()->json($project);
    }

    /**
     * Get the version history of a project.
     */
    public function versions(Project $project): JsonResponse
    {
        $this->authorizeAccess($project);

        return response()->json($project->versions()->paginate(10));
    }

    /**
     * Rename a project.
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $this->authorizeAccess($project);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $project->update(['name' => $request->name]);

        return response()->json($project);
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project): JsonResponse
    {
        $this->authorizeAccess($project);
        
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }

    /**
     * Basic authorization check.
     */
    protected function authorizeAccess(Project $project): void
    {
        if ($project->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to project.');
        }
    }
}
