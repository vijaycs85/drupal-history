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

    protected function generate() {
        $content = $this->getContent();
        foreach ($content as $delta => $item) {
            $date = DateTime::createFromFormat(DateTimeInterface::ATOM, $item->date);
            $item->version = $this->getVersion($item->title);
            $item->thumbnail = $this->getThumbnail($item);
            if (!$item->href) {
                $item->href = '#';
            }
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

    protected function getContent() {
        $data_filename  = __DIR__ . '/../data/drupal-timeline.json';
        return json_decode(file_get_contents($data_filename));

        $response = $this->httpClient->request('GET', self::API_ENDPOINT);
        if ($response->getStatusCode() !== 200) {
            // Use the data available locally.
            $response_body = file_get_contents($data_filename);
        }
        else {
            // Save the latest file.
            // @todo probably use HEAD and save with ETag instead of
            // saving the same data multiple times.
            $response_body = $response->getBody();
            file_put_contents($data_filename, $response_body);
        }
        return json_decode($response_body);
    }

    protected function getVersion($title) {
        preg_match('/^Drupal\s([0-9]\.[0-9]+)/s', $title, $matches);
        return isset($matches[1]) ? $matches[1] : NULL;
    }
    protected function getThumbnail($item) {
        if ($item->version) {
            if (file_exists(__DIR__ . "/../docs/assets/img/{$item->version}.png")) {
                return "{$item->version}.png";
            }
        }
        return 'default.png';
    }

    public function debugOn() {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    public function render() {
        return $this->renderer->render($this->generate());
    }
}
