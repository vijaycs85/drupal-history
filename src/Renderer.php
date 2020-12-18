<?php

namespace Vijaycs85\Drupal\History;

use Twig\Loader\FilesystemLoader;
use Twig\Environment;

class Renderer {

    public function render($data) {
        $loader = new FilesystemLoader(__DIR__ . '/../templates');
        $twig = new Environment($loader, ['cache' => __DIR__ . '/../.cache']);
        return $twig->render('timeline.html.twig', ['data' => $data]);
    }
}