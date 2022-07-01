---
title: Binary compression still alive – golang binary compression.
author: admin
type: post
date: 2018-03-07T14:34:57+00:00
url: /2018/binary-compression-still-alive-golang-binary-compression/
thumbnail: images/2018/03/stress-624220_1920.jpg
categories:
  - Technologies
  - Go Lang
  - Open Source
tags:
  - compression
  - golang

---
In the ancient times, when I was coding mostly in Pascal &#8211; size did matter. People were using RAR to shave couple kilobytes from archives, and having 2mb executable was better then having 4mb executable file. In that beautiful time we used [UPX](https://upx.github.io/) &#8211; I wasn&#8217;t aware that this project is still alive, and works nicely with binaries create bo go lang.

```
Ultimate Packer for eXecutables
Copyright (C) 1996 - 2017
UPX 3.94        Markus Oberhumer, Laszlo Molnar & John Reiser   May 12th 2017

File size Ratio Format Name
-------------------- ------ ----------- -----------
11512772 -> 3547792 30.82% macho/amd64 main

Packed 1 file.
```