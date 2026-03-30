import { router } from '@inertiajs/vue3';

/**
 * Update a job's status or results.
 * 
 * @param {Object} job - The job object to update.
 * @param {Object} project - The project owner of the job.
 * @param {string} status - The new status (pending, processing, completed, failed).
 */
export function updateJob(job, project, status) {
    const updatedJob = { ...job, status };
    
    router.put(route('jobs.update', { project: project.id, job: job.id }), updatedJob, {
        onSuccess: () => {
            // Optional: Handle success (e.g. show a toast notification)
        },
        onError: (errors) => {
            console.error('Error updating job:', errors);
        }
    });
}
