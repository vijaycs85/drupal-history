<?php
require __DIR__ . '/vendor/autoload.php';

use Vijaycs85\Drupal\History\Application;

$debug = in_array('--debug', $argv);

$app = new Application($debug);
/** @var \Vijaycs85\Drupal\History\Client $client */
$client = $app->container()->get('client');
print $client->render();
