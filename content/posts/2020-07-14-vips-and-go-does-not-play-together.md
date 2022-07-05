---
title: Why VIPS and Go it’s not a good match for production environment
author: admin
type: post
date: 2021-07-14T07:19:08+00:00
thumbnail: images/2021/07/gopher.png
lead: using cgo bindings in go is a not an easy way
categories:
  - Software
  - Go Lang
tags:
  - vips
---
I built a simple worker to do some magic with images by using Go & [VIPS](https://github.com/libvips/libvips). I chose VIPS because it is [blazing fast](https://github.com/fawick/speedtest-resize) compared to other Go image processing libraries. So this is the story about what went wrong.

Because my DEV setup is Apple MacBook Pro with M1 Apple Silicon, it’s always tricky to compile something to the proper architecture. Installing VIPS on my machine, it’s pretty straightforward:

`brew install vips`

Sometimes it’s just enough, sometimes it doesn't, and you have to setup additional settings to make it work, like:

`CGO_CFLAGS_ALLOW=-Xpreprocessor`

If you want to use C libraries in GO, you need a library to wrap binginds in your GO. We do have a couple of libraries — actually 2 ;-) I chose `davidbyttow/govips` library.

And the problems started multiplying because if it’s not “native” there is a huge chance that something will be broken. So I had to “new” VIPS version, where something wasn’t handled properly, or too old where GO library didn’t have wrappers completed yet. And compiling VIPS with multiple dependencies, it’s not an easy task.

You can see error messages until you get into a specific operation, like fe: cropping images and you get a lovely message:

`jpegsave_buffer: no property named 'subsample_mode'`

After a couple of iterations of trying — and reporting bugs — I found a match and finally got it working.

And YES —VIPS is blazing fast. There are no issues with big images, support for WEBP format (reading), and super easy EXIF handling.

> My good advice is — to stick with the exact VIPS version and make sure that you are not updating it without proper smoke testing.

Real problems started when I built a proper binary for `linux/amd64` architecture. But this is another story…