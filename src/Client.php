<?php

namespace Vijaycs85\Drupal\History;

use GuzzleHttp\ClientInterface;
use DateTime;
use DateTimeInterface;
use League\CommonMark\CommonMarkConverter;

class Client
{
    protected const API_GH_ENDPOINT = 'https://github.com/weitzman/drupal-timeline/raw/main/drupal-timeline.json';
    protected const API_CDN_ENDPOINT = 'https://cdn.jsdelivr.net/gh/weitzman/drupal-timeline/drupal-timeline.json';

    protected const DRUPAL_ORG_BASE_PATH = 'https://www.drupal.org/';
    protected const GITHUB_COM_BASE_PATH = 'https://www.github.com/';

    protected $httpClient;

    protected $markdownConverter;

    protected $renderer;

    protected $endpoint;

    public function __construct(ClientInterface $client, CommonMarkConverter $markdown_converter, Renderer $renderer)
    {
        $this->httpClient = $client;
        $this->markdownConverter = $markdown_converter;
        $this->renderer = $renderer;
    }

    protected function generate()
    {
        $result = [];
        $content = $this->getContent();
        foreach ($content as $delta => $item) {
            $date = DateTime::createFromFormat(DateTimeInterface::ATOM, $item->date);
            $item->hash = crc32($item->title);
            $item->profileUrl = property_exists($item, 'username') ? $this->getProfileUrl($item->username) : null;
            $item->version = $this->getVersion($item->title);
            foreach (['description'] as $property) {
                $item->{$property} = $this->markdownConverter->convertToHtml($item->{$property});
            }
            if ($date) {
                $result[$date->format('Y')][] = (array)$item;
            }
        }
        krsort($result);
        return $result;
    }

    protected function getContent()
    {
        $response_body = [];
        $data_filename  = __DIR__ . '/../data/drupal-timeline.json';
        // For now, serving from local file.
        // return json_decode(file_get_contents($data_filename));

        try {
            $response = $this->httpClient->request('GET', $this->getApiEndpoint());
        } catch (\Exception $e) {
            $response_body = file_get_contents($data_filename);
        }

        if (isset($response) && $response->getStatusCode() == 200) {
            // Save the latest file.
            // @todo probably use HEAD and save with ETag instead of
            // saving the same data multiple times.
            $response_body = $response->getBody();
            file_put_contents($data_filename, $response_body);
        }
        return json_decode($response_body);
    }
    public function setApiEndpoint($url)
    {
        $this->endpoint = $url;
        return $this;
    }

    protected function getApiEndpoint()
    {
        return $this->endpoint ?: self::API_GH_ENDPOINT;
    }
    protected function getVersion($title)
    {
        preg_match('/^Drupal\s([0-9]\.[0-9]+)/s', $title, $matches);
        return isset($matches[1]) ? $matches[1] : null;
    }

    /**
     * Gets URL from username.
     *
     * @param  string  $username
     *   The user name.
     *
     * @return string
     *   Fully qualified URL.
     */
    protected function getProfileUrl(string $username)
    {
        $search = [' '];
        $replace = ['-'];
        return self::DRUPAL_ORG_BASE_PATH . 'u/' . str_replace($search, $replace, $username);
    }

    /**
     * Renders the HTML page content.
     *
     * @return string
     *   Rendered content.
     */
    public function render()
    {
        return $this->renderer->render($this->generate());
    }
}
