<?php

declare(strict_types=1);

namespace Vijaycs85\Tests\Drupal\History;

use PHPUnit\Framework\TestCase;
use Vijaycs85\Drupal\History\Application;

/**
 * Class ClientTest
 *
 * @covers \Vijaycs85\Drupal\History\Client
 */
final class ClientTest extends TestCase
{

    /**
     * Tests client.
     *
     * @covers \Vijaycs85\Drupal\History\Application::container()
     * @covers \Vijaycs85\Drupal\History\Application::__construct()
     * @covers \Vijaycs85\Drupal\History\Renderer::render()
     */
    public function testCanClientGetContent(): void
    {
        $app = new Application();
        /** @var \Vijaycs85\Drupal\History\Client $client */
        $client = $app->container()->get('client');
        $content = $client->render();
        $this->assertNotNull($content);
    }

    /**
     *  Tests client with API error.
     *
     * @covers \Vijaycs85\Drupal\History\Application::container()
     * @covers \Vijaycs85\Drupal\History\Application::__construct()
     * @covers \Vijaycs85\Drupal\History\Renderer::render()
     */
    public function testCanGetContentFromLocalStoreWhenAPiNotReachable(): void
    {
        $app = new Application();
        /** @var \Vijaycs85\Drupal\History\Client $client */
        $client = $app->container()->get('client');
        $content = $client
            ->setApiEndpoint('https://www.urlnotavaliable.local/api')
            ->render();
        $this->assertNotNull($content);
    }

    /**
     *  Tests client with debug mode.
     *
     * @covers \Vijaycs85\Drupal\History\Application::container()
     * @covers \Vijaycs85\Drupal\History\Application::__construct()
     * @covers \Vijaycs85\Drupal\History\Application::debugOn()
     * @covers \Vijaycs85\Drupal\History\Renderer::render()
     */
    public function testCanGetContentWithDebugMode(): void
    {
        $app = new Application(true);
        /** @var \Vijaycs85\Drupal\History\Client $client */
        $client = $app->container()->get('client');
        $content = $client->render();
        $this->assertNotNull($content);
    }
}
