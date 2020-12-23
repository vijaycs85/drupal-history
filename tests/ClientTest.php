<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Vijaycs85\Drupal\History\Application;

final class ClientTest extends TestCase
{
    public function testCanCreateClientFromApplication(): void
    {
        $app = new Application();
        /** @var \Vijaycs85\Drupal\History\Client $client */
        $client = $app->container()->get('client');
        $this->assertNotNull($client);
    }
}
