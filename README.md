# Media Repository - Scheller Directory Solution

A simple web-based media file browser and uploader built with PHP and vanilla JavaScript.

## Features

- **File Browser**: Browse files in the uploads directory with a clean sidebar interface
- **Image Viewer**: Click on images to display them in the main viewing area
- **File Upload**: Upload new media files (JPG, JPEG, PNG, GIF, PDF)
- **Responsive Design**: Clean, modern interface with grid layout

## Setup

1. Ensure PHP is installed on your system
2. Clone this repository
3. Start a PHP development server from the project root:
   ```bash
   php -S localhost:8080
   ```
4. Open your browser to `http://localhost:8080`

## File Structure

```
├── index.html          # Main HTML page
├── main.css           # Stylesheet
├── main.js            # Frontend JavaScript
├── uploads/           # Directory for uploaded files
│   ├── img_1963_720.jpg
│   └── img_1964_720.jpg
└── php/               # PHP backend scripts
    ├── getContents.php # API to list files in uploads directory
    └── upload.php      # File upload handler
```

## Usage

### Browsing Files
- Files in the uploads directory are automatically listed in the left sidebar
- Click on any file name to display it in the main area
- Images are displayed directly, other files show file information with download links

### Uploading Files
- Use the upload form at the top of the page
- Supported file types: JPG, JPEG, PNG, GIF, PDF
- Maximum file size: 500KB
- Files are saved to the uploads directory

## API Endpoints

### GET /php/getContents.php
Returns JSON array of files in the uploads directory:
```json
[
    {
        "name": "example.jpg",
        "type": "file"
    }
]
```

### POST /php/upload.php
Handles file uploads via multipart form data with field name `fileToUpload`.

## Development Notes

- The application uses relative paths and should work in any web server environment
- The uploads directory is created automatically if it doesn't exist
- File validation includes type checking and size limits
- Error handling is implemented for common failure scenarios

## Fixes Applied

This application was debugged to resolve several issues:
- ✅ Fixed hard-coded local paths to use relative paths
- ✅ Completed JavaScript functionality for file display
- ✅ Enabled and styled the file upload form
- ✅ Added proper error handling and directory creation
- ✅ Cleaned up unused/unrelated code
- ✅ Clarified application purpose as a media file browser

## Browser Compatibility

Works in all modern browsers with JavaScript enabled. No external dependencies required.
