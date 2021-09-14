---
title: Utilizing multi core for tar+gzip/bzip compression/decompression
author: admin
type: post
date: 2013-12-05T03:03:14+00:00
url: /2013/utilizing-multi-core-for-targzipbzip-compressiondecompression/
thumbnail: images/uploads/2013/12/multicore.jpg
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
  - 2025769870
categories:
  - Linux
tags:
  - compression
  - linux

---
We have couple options: <a href="http://www.zlib.net/pigz/" target="_blank">pigz</a> and <a href="http://compression.ca/pbzip2/" target="_blank">pbzip2</a>.

```
tar -c --use-compress-program=pigz -f my_archive.tar.gz /home/archive 
```

The other trick useful trick is that you can exclude some directories or files

```
tar -zcvf my_archive.tar.gz --exclude='cache' --exclude='.git' /home/archive
```