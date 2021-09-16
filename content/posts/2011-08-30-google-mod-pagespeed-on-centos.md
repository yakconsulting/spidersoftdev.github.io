---
title: Google mod-pagespeed on CentOS
author: admin
type: post
date: 2011-08-30T00:48:05+00:00
url: /2011/google-mod-pagespeed-on-centos/
thumbnail: images/2011/08/pagespeed-128.png
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
  - 1159619671
categories:
  - Blog
  - Linux
tags:
  - centos
  - google
  - linux
  - pagespeed

---
Short &#8220;How to&#8221; install Google mod-pagespeed on CentOs. You can read more about this Apache module on this page: Google [mod_pagespeed overview](http://code.google.com/speed/page-speed/docs/module.html). Basicly it&#8217;s a module which gives your website speedup. Many simple techniques to reduce size and number of requests.

<!--more-->

> mod_pagespeed is an open-source Apache module that automatically optimizes web pages and resources on them. It does this by rewriting the resources using filters that implement web performance best practices. Webmasters and web developers can use mod_pagespeed to improve the performance of their web pages when serving content with the Apache HTTP Server.

Firs thing first download [mod_pagespeed for Apache](http://code.google.com/speed/page-speed/download.html). Next import Google public key for .rpm archives.

```
rpm --import http://dl.google.com/linux/linux_signing_key.pub
wget https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-beta_current_x86_64.rpm
rpm -U mod-pagespeed-beta_current_x86_64.rpm
```
