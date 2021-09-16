---
title: CodeIgniter IMG – thumbnails
author: admin
type: page
date: 2011-08-10T04:20:02+00:00
thumbnail: images/2011/07/CodeIgniter.jpg
layout:
  - list-post
page_layout:
  - sidebar-none
hide_page_title:
  - default
section_categories:
  - default
display_content:
  - excerpt
hide_title:
  - default
hide_date:
  - default
hide_meta:
  - default
hide_image:
  - default
hide_navigation:
  - default
unlink_title:
  - default
unlink_image:
  - default
dsq_thread_id:
  - 1160062344
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'

---
## CodeIgniter library to generate high-quality thumbnails

A library is based on excellent \* Smarty plugin &#8220;Thumb&#8221; \* created in 2005 by Christoph Erdmann. This version is a little bit different, we are using the core from Thumb, and some modification which gives more flexibility to work with it.

## Features

  * thumbnails are generated &#8220;on the fly&#8221; no additional actions required,
  * cache for generated thumbnails,
  * a clear structure for generated thumbnails,
  * thumbnails sharpening function,
  * cropping function,
  * fill space function

## Usage

You need to upload a file `img.php` into directory: `application/libraries` In controller, you need to load library:

`$this->load->library('img');`

In the view you can use a function with this parameters:

`echo $this->img->rimg($filename, array('longside' => 745, 'alt' => 'alt text')`

Parameters:

- **longside** – width of longest side (pixel value),  
- **shortside** – width of a shorter side  
- **crop** – cropping (true/false)  
- **width** – fixed width (with this parameter you need also set height)  
- **height** – height (with this parameter you need to also set height)  
- **sharpen** – sharp image after scale  
- **nocache** – rewrite existing file in the cache

## Documentation

Documentation is located at [https://github.com/slav123/CodeIgniter-Img/wiki](https://github.com/slav123/CodeIgniter-Img/wiki)

## Installation

Just put img.php file in libraries path.

[Download CodeIgniter IMG](https://github.com/slav123/CodeIgniter-Img)