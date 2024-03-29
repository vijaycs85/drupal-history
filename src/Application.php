<?php

namespace Vijaycs85\Drupal\History;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\Config\FileLocator;

class Application
{

    protected $debug;

    public function __construct($debug = false)
    {
        $this->debug = $debug;
    }
    public function container()
    {
        $this->debug ? $this->debugOn() : null;
        $container = new ContainerBuilder();
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__));
        $loader->load(__DIR__ . '/../services.yml');
        return $container;
    }

    /**
     * Helper to enable debug mode.
     */
    protected function debugOn()
    {
        ini_set('display_errors', "1");
        ini_set('display_startup_errors', "1");
        error_reporting(E_ALL);
    }
}
