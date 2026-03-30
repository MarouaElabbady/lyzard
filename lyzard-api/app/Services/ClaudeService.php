<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Psr\Http\Message\ResponseInterface;

class ClaudeService
{
    protected Client $client;
    protected string $apiKey;
    protected string $model;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.anthropic.key');
        $this->model = config('services.anthropic.model', 'claude-3-7-sonnet-20250219');
    }

    /**
     * Stream a response from Claude.
     */
    public function stream(array $messages, callable $onChunk): void
    {
        $url = 'https://api.anthropic.com/v1/messages';

        $body = [
            'model' => $this->model,
            'messages' => $messages,
            'max_tokens' => 4096,
            'stream' => true,
            'system' => (new PromptBuilder())->buildSystemPrompt(),
        ];

        $request = new Request('POST', $url, [
            'x-api-key' => $this->apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ], json_encode($body));

        $response = $this->client->send($request, [
            'stream' => true,
        ]);

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
                    $json = json_decode(substr($event, 6), true);
                    
                    if (isset($json['type']) && $json['type'] === 'content_block_delta') {
                        $text = $json['delta']['text'] ?? '';
                        $onChunk($text);
                    }
                }
            }
        }
    }
}
