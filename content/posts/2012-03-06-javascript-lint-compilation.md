---
title: JavaScript Lint compilation
author: admin
type: post
date: 2012-03-06T09:28:04+00:00
url: /2012/javascript-lint-compilation/
layout:
  - default
hide_post_title:
  - default
unlink_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
unlink_post_image:
  - default
dsq_thread_id:
  - 1165266460
categories:
  - Linux
tags:
  - compile
  - javascript
  - linux

---
<a href="http://www.javascriptlint.com/" target="_blank">JavaScript Lint</a> allows you to validate JavaScript files from command line. For Windows and Mac OS Boxex we can <a href="http://www.javascriptlint.com/download.htm" target="_blank">download precompiled binaries</a>.

I don&#8217;t know why authors missed part in documentation which describes how to compile this under Linux box.

Here is missing interaction:


```
wget http://www.javascriptlint.com/download/jsl-0.3.0-src.tar.gz
tar zxvf jsl-0.3.0-src.tar.gz
cd jsl-0.3.0/src/
make -f Makefile.ref
sudo cp Linux_All_DBG.OBJ/jsl /usr/local/bin
```
