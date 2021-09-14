---
title: How to get better results with ImageMagick and convert
author: admin
type: post
date: 2011-09-12T23:33:53+00:00
excerpt: "In last two days I'm trying to find best way to convert PDF files to good quality JPEG files. Of course size does matter, not only in case of women breasts."
url: /2011/how-to-get-better-results-with-imagemagick-and-convert/
thumbnail: images/uploads/2011/09/200px-Imagemagick-logo.png
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
  - 1161554203
categories:
  - Blog
tags:
  - bash
  - image
  - ImageMagick
  - linux

---
In last two days I&#8217;m trying to find best way to convert PDF files to good quality JPEG files. Of course size does matter, not only in case of women breasts.

When I was trying convert files directly from PDF to JPEG results was pretty scary:

`convert myfile.pdf[1] dc.jpg`

number 1 in brackets means only one(second) page to process.  
As I result I get file with pretty huge size: 496.8K  
but&#8230; if we do this in two steps:

```
convert myfile.pdf[1] dc.png
convert -filter Gaussian -quality 85 dc.png dc.jpg
```

file is much smaller 170.3K  
somebody could point me that I can do this in one line&#8230; but unfortunately it&#8217;s not giving same results.