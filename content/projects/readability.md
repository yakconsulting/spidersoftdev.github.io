---
title: Readability
author: admin
type: page
date: 2025-01-06T02:11:06+00:00
lead: "Web content extraction with largest-image detection"
thumbnail: images/2025/01/readability.png
keywords: ["web scraping", "content extraction", "json parser", "article extraction", "image detection"]
description: "Extract clean article content and detect primary images from websites with JSON output"
aliases:
 - /readability
---

# Web Content Extraction Utility

A streamlined web scraping utility that extracts clean article content and automatically detects the primary image through dimensional analysis. The tool processes web pages into structured JSON output, making it ideal for content aggregation and analysis pipelines.

## How It Works

The utility employs a two-step process to extract and structure web content:

### Content Extraction
Analyzes webpage DOM structure to identify and extract the main article content, stripping away navigation elements, sidebars, and other non-essential components. The extraction process preserves the semantic structure of the content while removing clutter.

### Image Detection
Primary image detection uses a straightforward size-based approach:

1. Fetches all image elements from the page
2. Analyzes dimensions of each image
3. Identifies the image with the largest dimensions
4. Returns the URL and size information of the largest image

Currently tools is able to read dimensions from images in PNG, JPEG, GIF, SVG and WebP formats. Doesn't work with images in CSS. 

## Output Format

The utility returns a JSON object containing:

```json
{
  "title": "Page title",
  "success": true,
  "message": "Content extracted successfully",
  "description": "meta description",
  "date_published": "",
  "last_modified": "GMT formatted date",
  "lead_image_url": "URL of the primary image",
  "dek": "Page description or summary",
  "url": "Original page URL",
  "domain": "Base domain URL",
  "excerpt": "Short plain text excerpt",
  "content": "Full HTML content"
}
```

## Use Cases

- Content aggregation systems
- News scrapers
- Research data collection
- Archive creation
- Content analysis tools

The tool's focused approach and JSON output make it particularly suitable for integration into larger content processing pipelines and automated data collection systems.

Check it out on [RapidPI](https://rapidapi.com/slav123/api/readability) website. 

## What Next?

I'm for ideas - if you have any please drop me a line. There is a docker version available.