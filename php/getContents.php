<?php
// Replace '/path/to/uploads' with the actual path to your 'uploads' folder
$directory = realpath(__DIR__ . '/../uploads');

// Check if the directory exists
if (!is_dir($directory)) {
    // Try to create the directory if it doesn't exist
    if (!mkdir($directory, 0777, true)) {
        http_response_code(404);
        echo json_encode(['error' => 'Directory not found and could not be created']);
        exit;
    }
}

// // Get all the files and directories inside the 'uploads' folder
// try {
//     $files = scandir($directory);
// } catch (Exception $e) {
//     http_response_code(500);
//     echo json_encode(['error' => 'Failed to scan directory: ' . $e->getMessage()]);
//     exit;
// }

// // Filter out the '.' and '..' entries
// $files = array_diff($files, ['.', '..']);
// Get all the files and directories inside the 'uploads' folder
try {
    $di = new DirectoryIterator($directory);
    $files = [];
    foreach ($di as $file) {
        if (!$file->isDot()) {
            $files[] = [
                'name' => $file->getFilename(),
                'type' => $file->isDir() ? 'directory' : 'file'
            ];
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to scan directory: ' . $e->getMessage()]);
    exit;
}

/// Convert the $files array to JSON format with indentation and line breaks
try {
    $json = json_encode($files, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to encode JSON: ' . $e->getMessage()]);
    exit;
}

// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Print the JSON data
echo $json;
?>