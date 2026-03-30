<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Job;
use App\Models\Project;

class JobController extends Controller
{
    /**
     * Update the specified job.
     */
    public function update(Request $request, Project $project, Job $job)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'result' => 'nullable|array',
        ]);

        $job->update($request->only(['status', 'result']));

        return response()->json([
            'status' => 'success',
            'message' => 'Job updated successfully.',
            'job' => $job,
            'project' => $project,
        ]);
    }
}
