<?php
    $url = 'https://www.scheller.gatech.edu/_files/dashboards-json/directory-signage.json';

// Use file_get_contents() to retrieve the JSON data
$json_data = file_get_contents($url);

// Check for errors
if ($json_data === false) {
    die('Error retrieving data from ' . $url);
}

// Decode the JSON data
$data = json_decode($json_data, true);

// Check for errors
if ($data === null) {
    die('Error decoding JSON data');
}

// Create a new XML document
$doc = new DOMDocument('1.0');

// Create the root element
$root = $doc->createElement('scheller');
$root = $doc->appendChild($root);

// Add the JSON data to the XML document
foreach ($data as $item) {
    $entry = $doc->createElement('item');
    $entry = $root->appendChild($entry);

    $firstName = $doc->createElement('firstName', $item['FirstName']);
    $firstName = $entry->appendChild($firstName);

    $lastName = $doc->createElement('lastName', $item['LastName']);
    $lastName = $entry->appendChild($lastName);

    $room = $doc->createElement('room', $item['room #']);
    $room = $entry->appendChild($room);

    $suite = $doc->createElement('suite', $item['suite']);
    $suite = $entry->appendChild($suite);
}

// Save the XML document to a string
$xml_data = $doc->saveXML();

// Validate the XML data
$xml_parser = xml_parser_create();
xml_parse_into_struct($xml_parser, $xml_data, $vals, $index);
xml_parser_free($xml_parser);

if ($vals === false) {
    die('Error validating XML data');
}

// Output the XML data
header('Content-Type: application/xml');
echo $xml_data;

// Refresh the page every 30 seconds
header('Refresh: 30');
exit;
?>