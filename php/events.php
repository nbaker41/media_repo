<?php
    $url = 'https://calendar.gatech.edu/gt-feeds';
    $data = file_get_contents($url);
    $data = html_entity_decode($data);

    // Convert the XML data into an object
    $xml = simplexml_load_string($data);

    $itemArray = array();
    foreach ($xml->channel->item as $item) {
        $itemData = array(
            'title' => (string) $item->title,
            'link' => (string) $item->link,
            'description' => (string) $item->description,
            'guid' => (string) $item->guid
        );
        $itemArray[] = $itemData;
    }

    // Convert the PHP value into a JSON string
    $json = json_encode($itemArray, JSON_PRETTY_PRINT);

    // // Convert the JSON string back into a PHP value
    // $array = json_decode($json, true);

    // // Convert all nested XML tags inside the <description> tag into an object
    // $array2 = array();
    // foreach ($array as $item) {
    //     $xmlData = simplexml_load_string($item['description']);
    //     $item2 = array(
    //         'time' => $item['time'],
    //         // 'link' => $item['link'],
    //         // 'description' => $xmlData,
    //         // 'guid' => $item['guid']
    //     );
    //     $array2[] = $item2;
    // }

    // // Convert the PHP value into a JSON string
    // $json = json_encode($array2, JSON_PRETTY_PRINT);

    // Output the JSON string
    echo $json;
?>
