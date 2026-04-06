<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Psr\Http\Message\ResponseInterface;

class NvidiaAiService
{
    protected Client $client;
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.nvidia.key') ?? '';
        $this->model = config('services.nvidia.model', 'meta/llama3-70b-instruct');
        $this->baseUrl = config('services.nvidia.url', 'https://integrate.api.nvidia.com/v1');
    }

    /**
     * Synthesize and upgrade the user prompt into a high-end designer specification.
     */
    public function upgradePrompt(string $userPrompt): string
    {
        $url = rtrim($this->baseUrl, '/') . '/chat/completions';

        $systemPrompt = <<<EOT
You are a world-class Web Designer & UX Architect. The user will provide a simple request for a landing page.
Your task is to expand their request into a HIGHLY DETAILED technical and visual specification for a modern HTML/Tailwind landing page.

SPECIFICATION PROTOCOLS:
1. **FULL-STACK BUNDLE**: Explicitly command the code generator to deliver a Single, self-sufficient HTML file containing all HTML, CSS, and JS (no external files/assets except CDNs).
2. **MODERN UI**: Specify modern UI trends like glassmorphism, 60fps animations, glowing gradients, clean sans-serif typography, large hero sections, bento-box grids, and high-contrast dark/light themes. 
3. **ONLY THE PROMPT**: DO NOT write the code. ONLY write the detailed expanded prompt that will be passed to a code generator.
The resulting prompt should be so descriptive that it guarantees a $10,000-tier design outcome.
EOT;

        $body = [
            'model' => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => "Upgrade this prompt: " . $userPrompt],
            ],
            'max_tokens' => 1000,
            'temperature' => 0.5,
            'stream' => false,
        ];

        try {
            $request = new Request('POST', $url, [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ], json_encode($body));

            $response = $this->client->send($request, ['timeout' => 30]);
            $json = json_decode($response->getBody()->getContents(), true);

            return $json['choices'][0]['message']['content'] ?? $userPrompt;
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Nvidia AI Prompt Upgrade Failed', ['error' => $e->getMessage()]);
            // Fallback to original prompt if upgrade fails
            return $userPrompt;
        }
    }

    /**
     * Stream a response from Nvidia API (OpenAI compatible format).
     */
    public function stream(array $messages, callable $onChunk): void
    {
        $url = rtrim($this->baseUrl, '/') . '/chat/completions';

        // Extract system prompt from PromptBuilder
        $systemPrompt = (new PromptBuilder())->buildSystemPrompt();

        // Nvidia / OpenAI API requires system prompt within the messages array
        $openAiMessages = [
            ['role' => 'system', 'content' => $systemPrompt],
        ];

        foreach ($messages as $msg) {
            $openAiMessages[] = $msg;
        }

        $body = [
            'model' => $this->model,
            'messages' => $openAiMessages,
            'max_tokens' => 4080,
            'temperature' => 0.2,
            'top_p' => 0.9,
            'stream' => true,
        ];

        $request = new Request('POST', $url, [
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'text/event-stream',
        ], json_encode($body));

        try {
            $response = $this->client->send($request, [
                'stream' => true,
                'connect_timeout' => 10,
                'timeout' => 300, // 5 minutes for full generation
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Nvidia AI API Connection Failed', [
                'error' => $e->getMessage(),
                'url' => $url,
            ]);
            throw $e;
        }

        $this->processStream($response, $onChunk);
    }

    /**
     * Process the streaming response.
     */
    protected function processStream(ResponseInterface $response, callable $onChunk): void
    {
        $body = $response->getBody();
        $buffer = '';

        while (!$body->eof()) {
            $chunk = $body->read(1024);
            $buffer .= $chunk;

            while (($pos = strpos($buffer, "\n\n")) !== false) {
                $event = substr($buffer, 0, $pos);
                $buffer = substr($buffer, $pos + 2);

                if (strpos($event, 'data: ') === 0) {
                    $dataString = substr($event, 6);
                    
                    if (trim($dataString) === '[DONE]') {
                        continue;
                    }

                    $json = json_decode($dataString, true);
                    
                    if (isset($json['choices'][0]['delta']['content'])) {
                        $text = $json['choices'][0]['delta']['content'];
                        $onChunk($text);
                    }
                }
            }
        }
    }
}
