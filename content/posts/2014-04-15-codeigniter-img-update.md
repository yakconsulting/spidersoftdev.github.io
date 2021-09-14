---
title: CodeIgniter img update
author: admin
type: post
date: 2014-04-15T03:49:25+00:00
url: /2014/codeigniter-img-update/
thumbnail: images/uploads/2014/04/codeigniter-img.png
post_image:
  - http://www.spidersoft.com.au/wp-content/uploads/2014/04/codeigniter-img.png
layout:
  - default
feature_size:
  - blank
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
external_link:
  - https://github.com/slav123/CodeIgniter-Img
dsq_thread_id:
  - 2612529222
categories:
  - Open Source
tags:
  - codeigniter
  - img

---
It&#8217;s been a while since my library [CodeIgniter img](https://github.com/slav123/CodeIgniter-Img) was updated. Purpose of this library is pretty clear &#8211; to scale images on the fly using CodeIgniter. It&#8217;s very useful in all kinds of website and CMS-like projects. All you need to do, is just load library and inside view use it like that

```
$this->img->rimg('path/to/image.jpg', array('width' => 100, 'height' => 200, 'alt'='my awesome image'));
```

First time when script hits image, will create thumbnail. Next time, website will get already scaled image. If you need change dimensions, just change it within view &#8211; don&#8217;t worry about recreating images.

<!--more-->

So.. what are the latest changes? Basically I fixed couple small bugs inside code. And introduced couple new parameters like &#8220;return&#8221; which allows you get path instead full 

```
img
```

tag. Also &#8211; image sharpening is enabled by default. Images which are not exist are replaced by placehold.it images.

Enjoy!