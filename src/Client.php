<?php

namespace Vijaycs85\Drupal\History;

use GuzzleHttp\ClientInterface;
use DateTime;
use DateTimeInterface;
use League\CommonMark\CommonMarkConverter;

class Client {

    const API_ENDPOINT = 'https://cdn.jsdelivr.net/gh/weitzman/drupal-timeline/drupal-timeline.json';

    protected $httpClient;

    protected $markdownConverter;

    protected $renderer;

    public function __construct(ClientInterface $client, CommonMarkConverter $markdown_converter, Renderer $renderer) {
        $this->httpClient = $client;
        $this->markdownConverter = $markdown_converter;
        $this->renderer = $renderer;
    }

    protected function getData() {
        $response = $this->httpClient->request('GET', self::API_ENDPOINT);
        $content = json_decode($response->getBody());

        foreach ($content as $delta => $item) {
            $date = DateTime::createFromFormat(DateTimeInterface::ATOM, $item->date);
            $item->version = $this->getVersion($item->title);
            foreach (['description'] as $property)  {
                $item->{$property} = $this->markdownConverter->convertToHtml($item->{$property});
            }
            if ($date) {
                $result[$date->format('Y')][] = (array)$item;
            }
        }
        krsort($result);
        return $result;
    }

    protected function getVersion($title) {
        preg_match('/^Drupal\s([0-9]\.[0-9]+)/s', $title, $matches);
        return isset($matches[1]) ? $matches[1] : NULL;
    }

    public function debugOn() {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    public function render() {
        return $this->renderer->render($this->getData());
    }
}
