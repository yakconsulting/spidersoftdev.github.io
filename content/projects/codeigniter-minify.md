---
title: CodeIgniter minify
author: admin
type: page
date: 2011-08-10T04:08:44+00:00
thumbnail: images/2011/07/CodeIgniter.jpg
description: Simple library to minify JavaScript & CSS in CodeIgniter. JavaScript minification is based on [Closure Compiler](http://code.google.com/closure/compiler/). CSS minification is based on [minify library](http://code.google.com/p/minify/). Additionally all CSS scripts and JavaScript scripts are marget into single files.
layout:
  - list-post
dsq_thread_id:
  - 1159353688



---
Simple library to minify JavaScript & CSS in CodeIgniter. JavaScript minification is based on [Closure Compiler](http://code.google.com/closure/compiler/). CSS minification is based on [minify library](http://code.google.com/p/minify/). Additionally all CSS scripts and JavaScript scripts are marget into single files.

<!--more-->

## Usage

First of all You need to deploy minify to libraries directory:  
`application/libraries/`

Then You can load library using standard CodeIgniter loader:

`$this->load->library('minify');`

Then, in VIEW in page header You can use this commands:

```
$this->minify->css_file = 's.min.css';
$this->minify->assets_dir = 'assets';
$this->minify->css(array('reset.css', 'style.css', 'tinybox.css'));
echo $this->minify->deploy_css(false);
```

## Download

Download from GitHub:  
[CodeIgniter-minify](https://github.com/slav123/CodeIgniter-minify)