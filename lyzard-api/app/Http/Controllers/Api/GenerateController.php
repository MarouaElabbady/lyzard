<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NvidiaAiService;
use App\Services\PromptBuilder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GenerateController extends Controller
{
    protected NvidiaAiService $aiService;
    protected PromptBuilder $promptBuilder;

    public function __construct(NvidiaAiService $aiService, PromptBuilder $promptBuilder)
    {
        $this->aiService = $aiService;
        $this->promptBuilder = $promptBuilder;
    }

    /**
     * Stream the landing page generation.
     */
    public function generate(Request $request): StreamedResponse
    {
        $request->validate([
            'prompt' => 'required|string|min:3',
        ]);

        $prompt = $request->input('prompt');
        $messages = [
            ['role' => 'user', 'content' => $this->promptBuilder->buildUserPrompt($prompt)],
        ];

        return new StreamedResponse(function () use ($messages, $request) {
            $this->aiService->stream($messages, function (string $chunk) {
                echo "data: " . json_encode(['chunk' => $chunk]) . "\n\n";
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            });

            // Deduct 1 credit
            $user = $request->user();
            if ($user && env('APP_ENV') !== 'local' && false) { // disable for local testing
                // $user->decrement('credits', 1);
            }
            
            // Final signal
            echo "data: [DONE]\n\n";
            if (ob_get_level() > 0) {
                ob_flush();
            }
            flush();
        }, 200, [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no', // Disable buffering for Nginx
        ]);
    }

    /**
     * Iterate on existing code.
     */
    public function iterate(Request $request): StreamedResponse
    {
        $request->validate([
            'previous_code' => 'required|string',
            'changes' => 'required|string',
        ]);

        $messages = [
            ['role' => 'user', 'content' => $this->promptBuilder->buildIterationPrompt(
                $request->input('previous_code'),
                $request->input('changes')
            )],
        ];

        return new StreamedResponse(function () use ($messages, $request) {
            $this->aiService->stream($messages, function (string $chunk) {
                echo "data: " . json_encode(['chunk' => $chunk]) . "\n\n";
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            });

            // Deduct 1 credit
            $user = $request->user();
            if ($user && env('APP_ENV') !== 'local' && false) { // disable for local testing
                // $user->decrement('credits', 1);
            }
            
            echo "data: [DONE]\n\n";
            if (ob_get_level() > 0) {
                ob_flush();
            }
            flush();
        }, 200, [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
        ]);
    }
}
