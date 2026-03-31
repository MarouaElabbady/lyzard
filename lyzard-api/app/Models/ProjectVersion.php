<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectVersion extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'project_id',
        'content',
        'prompt',
    ];

    /**
     * Get the project that owns the version.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
