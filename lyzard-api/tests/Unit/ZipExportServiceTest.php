<?php

namespace Tests\Unit;

use App\Services\ZipExportService;
use PHPUnit\Framework\TestCase;

class ZipExportServiceTest extends TestCase
{
    private ZipExportService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ZipExportService();
    }

    public function test_partial_html_is_wrapped_in_full_document(): void
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('wrapHtml');
        $method->setAccessible(true);

        $partial = '<h1>Hello World</h1><p>This is my landing page.</p>';
        $result  = $method->invoke($this->service, $partial, 'My Project');

        $this->assertStringContainsString('<!DOCTYPE html>', $result);
        $this->assertStringContainsString('<h1>Hello World</h1>', $result);
        $this->assertStringContainsString('My Project', $result);
        $this->assertStringContainsString('Lyzard.ai', $result);
    }

    public function test_full_html_document_is_not_double_wrapped(): void
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('wrapHtml');
        $method->setAccessible(true);

        $fullHtml = '<!DOCTYPE html><html><head><title>Test</title></head><body>Hello</body></html>';
        $result   = $method->invoke($this->service, $fullHtml, 'Test');

        $this->assertEquals($fullHtml, $result);
    }

    public function test_html_tag_prefix_is_not_wrapped(): void
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('wrapHtml');
        $method->setAccessible(true);

        $html   = '<html lang="en"><head></head><body>content</body></html>';
        $result = $method->invoke($this->service, $html, 'Test');

        $this->assertEquals($html, $result);
    }

    public function test_readme_contains_project_name(): void
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('buildReadme');
        $method->setAccessible(true);

        // Create a minimal Eloquent-like anonymous class
        $project = new class {
            public string $name = 'Awesome Project';
        };

        $result = $method->invoke($this->service, $project);

        $this->assertStringContainsString('Awesome Project', $result);
        $this->assertStringContainsString('Lyzard.ai', $result);
        $this->assertStringContainsString('index.html', $result);
    }
}
