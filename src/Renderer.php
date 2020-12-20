<?php

namespace Vijaycs85\Drupal\History;

use Twig\Loader\FilesystemLoader;
use Twig\Environment;

class Renderer {

    public function render($data) {
        $cache = __DIR__ . '/../.cache';
        $cache = FALSE;
        $loader = new FilesystemLoader(__DIR__ . '/../templates');
        $twig = new Environment($loader, ['cache' => $cache]);
        return $twig->render('timeline.html.twig', ['data' => $data]);
    }
}