
<?php

$url = 'https://www.scheller.gatech.edu/_files/dashboards-json/directory-signage.json';

// Use file_get_contents() to retrieve the JSON data
$json_data = file_get_contents($url);

// Check for errors
if ($json_data === false) {
    die('Error retrieving data from ' . $url);
}

// Output the data
// echo $json_data;

// Decode the JSON data
$data = json_decode($json_data, true);

// Check for errors
if ($data === null) {
    die('Error decoding JSON data');
}

// Create a new RSS feed
$rss = new SimpleXMLElement('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"></rss>');
$channel = $rss->addChild('channel');

// Add the required RSS feed elements
$channel->addChild('title', 'Directory Signage');
$channel->addChild('link', 'https://www.scheller.gatech.edu/');
$channel->addChild('description', 'Directory Signage at Scheller College of Business');

// Add the JSON data to the RSS feed
foreach ($data as $item) {
    $entry = $channel->addChild('item');
    $entry->addChild('FirstName', $item['FirstName']);
    $entry->addChild('LastName', $item['LastName']);
    $entry->addChild('Room', $item['room #']);
    $entry->addChild('Suite', $item['suite']);
}

$dom = new DOMDocument('1.0');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($rss->asXML());
// Output the RSS feed
header('Content-Type: application/rss+xml');
echo $dom->saveXML();

// Refresh the page every 30 seconds
header('Refresh: 30');
exit;

?>
