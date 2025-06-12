<?php
// filepath: /workspaces/media_repo/php/tests/UploadTest.php
use PHPUnit\Framework\TestCase;

class UploadTest extends TestCase {
    private $uploadScript = __DIR__ . '/../upload.php';
    private $uploadsDir = __DIR__ . '/../../uploads/';

    protected function setUp(): void {
        if (!is_dir($this->uploadsDir)) {
            mkdir($this->uploadsDir, 0777, true);
        }
        // Clean up test files before each test
        foreach (glob($this->uploadsDir . 'testfile*') as $file) {
            unlink($file);
        }
    }

    public function testUploadImageFile() {
        // Simulate $_FILES array
        $_FILES = [
            'fileToUpload' => [
                'name' => 'testfile.jpg',
                'type' => 'image/jpeg',
                'tmp_name' => tempnam(sys_get_temp_dir(), 'php'),
                'error' => 0,
                'size' => 1024,
            ]
        ];
        // Write dummy content to tmp file
        file_put_contents($_FILES['fileToUpload']['tmp_name'], str_repeat('a', 1024));
        // Simulate a POST request for the upload script
        $_SERVER['REQUEST_METHOD'] = 'POST';
        // Capture output
        ob_start();
        include $this->uploadScript;
        $output = ob_get_clean();
        $this->assertStringContainsString('has been uploaded', $output);
        $this->assertFileExists($this->uploadsDir . 'testfile.jpg');
    }

    public function testUploadTooLargeFile() {
        $_FILES = [
            'fileToUpload' => [
                'name' => 'testfile.jpg',
                'type' => 'image/jpeg',
                'tmp_name' => tempnam(sys_get_temp_dir(), 'php'),
                'error' => 0,
                'size' => 3 * 1024 * 1024, // 3MB
            ]
        ];
        file_put_contents($_FILES['fileToUpload']['tmp_name'], str_repeat('a', 3 * 1024 * 1024));
        ob_start();
        include $this->uploadScript;
        $output = ob_get_clean();
        $this->assertStringContainsString('too large', $output);
        $this->assertFileDoesNotExist($this->uploadsDir . 'testfile.jpg');
    }

    public function testUploadInvalidFileType() {
        $_FILES = [
            'fileToUpload' => [
                'name' => 'testfile.exe',
                'type' => 'application/octet-stream',
                'tmp_name' => tempnam(sys_get_temp_dir(), 'php'),
                'error' => 0,
                'size' => 1024,
            ]
        ];
        file_put_contents($_FILES['fileToUpload']['tmp_name'], str_repeat('a', 1024));
        ob_start();
        include $this->uploadScript;
        $output = ob_get_clean();
        $this->assertStringContainsString('only JPG, JPEG, PNG, GIF & PDF files are allowed', $output);
        $this->assertFileDoesNotExist($this->uploadsDir . 'testfile.exe');
    }

    protected function tearDown(): void {
        // Clean up test files after each test
        foreach (glob($this->uploadsDir . 'testfile*') as $file) {
            unlink($file);
        }
    }
}
