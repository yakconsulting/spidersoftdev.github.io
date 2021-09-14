---
title: CodeIgniter IMG – thumbnails on the fly
author: admin
type: post
date: 2011-07-03T20:19:57+00:00
url: /2011/codeigniter-img-thumbnails-on-the-fly/
thumbnail: images/uploads/2011/07/CodeIgniter.jpg
dsq_thread_id:
  - 1160997566
categories:
  - Blog
  - Featured
  - Open Source
tags:
  - codeigniter
  - opensource
  - php

---
CodeIgniter library to generate high quality thumbnails

Library is based on excellent \* Smarty plugin &#8220;Thumb&#8221; \* created in 2005 by Christoph Erdmann. This version is a little different, we are using core from Thumb, and some modification which gives more flexibility to work with it.

## Features

  * thumbnails are generated &#8220;on the fly&#8221; no additional actions required,
  * cache for generated thumbnails,
  * clear structure for generated thumbnails,
  * thumbnails sharpening function,
  * cropping function,
  * fill space function

## Usage

You need to upload file `img.php` into directory `application/libraries`. In controller you need to load library:

`$this->load->library('img');`

In view, you can use function with these parameters:

`echo $this->img->rimg($filename, array('longside' => 745, 'alt' => 'alt text')`

Parameters:

**longside** – width of the longest side (pixel value),  
**shortside** – width of shorter side  
**crop** – cropping (true/false)  
**width** – fixed width (with this parameter you need also set height)  
**height** – height (with this parameter you need to also set height)  
**sharpen** – sharp image after scale  
**nocache** – rewrite existing file in the cache

## Documentation

Documentation is located at [https://github.com/slav123/CodeIgniter-Img/wiki](https://github.com/slav123/CodeIgniter-Img/wiki)

## Installation

Just put img.php file in libraries path.

[Download CodeIgniter IMG][1]

 [1]: https://github.com/slav123/CodeIgniter-Img