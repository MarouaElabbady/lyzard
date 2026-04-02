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
