---
title: FFmpeg on AMI Linux and CentOS the easy way
author: admin
type: post
date: 2014-10-28T02:12:32+00:00
url: /2014/ffmpeg-on-ami-linux-and-centos-the-easy-way/
thumbnail: images/2014/10/Screen-shot-2014-10-28-at-1.11.11-PM.png
dsq_thread_id:
  - 3164530439
categories:
  - Linux
tags:
  - centos
  - ec2
  - ffmpeg
  - linux

---
[FFmpeg](https://www.ffmpeg.org/) is a complete, cross-platform solution to record, convert and stream audio and video.

All you need to do is just install one more repository:  
[http://rpmfusion.org/Configuration](http://rpmfusion.org/Configuration)

```
wget http://download1.rpmfusion.org/free/el/updates/6/i386/rpmfusion-free-release-6-1.noarch.rpm
sudo rpm -Uhv rpmfusion-free-release-6-1.noarch.rpm
wget http://download1.rpmfusion.org/nonfree/el/updates/6/i386/rpmfusion-nonfree-release-6-1.noarch.rpm
sudo rpm -Uhv rpmfusion-nonfree-release-6-1.noarch.rpm
sudo yum install ffmpeg
```

Done.  
`ffmpeg version 0.10.15 Copyright (c) 2000-2014 the FFmpeg developers<br />
built on Aug 30 2014 15:49:19 with gcc 4.4.7 20120313 (Red Hat 4.4.7-3)<br />
` 

Obviously there is no fun with FFmpeg if you don&#8217;t have anything to convert. I needed to crop vertical videos from iPad to square &#8211; [Vine](https://itunes.apple.com/au/app/vine/id592447445?mt=8) like format.

Initial size of video was 1280&#215;720 &#8211; I wanted to make them square, and crop from top and bottom.

Magical line for me was:

```
/usr/bin/ffmpeg -strict experimental -c:v h264 -i in.MOV -c:a copy -filter:v "crop=720:720:280:0" out.mp4
```

Why i&#8217;m giving this example ? Because of couple issues. One of them was seeing ugly error:

```
[NULL @ 0x7ce340] Codec is experimental but experimental codecs are not enabled, see -strict -2
```

it was solved by `-strict experimental`.

Second one was:

```
Error while opening encoder for output stream #0:1 - maybe incorrect parameters such as bit_rate, rate, width or height
```

and it took me a while to figure out, that FFmpeg can&#8217;t deal with audio conversion. So  `-c:a copy` just force to copy audio stream.

One more cool feature &#8211; you can rotate video if need &#8211;

```
/usr/bin/ffmpeg -strict experimental -c:v h264 -i in.MOV -c:a copy -filter:v "crop=720:720:280:0" -vf "transpose=1" out.mp4
```