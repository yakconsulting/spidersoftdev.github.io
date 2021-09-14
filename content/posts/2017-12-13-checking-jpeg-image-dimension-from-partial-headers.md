---
title: Checking JPEG image dimension from partial headers
author: admin
type: post
date: 2017-12-13T07:43:11+00:00
url: /2017/checking-jpeg-image-dimension-from-partial-headers/
dsq_thread_id:
  - 6347467434
categories:
  - Go Lang

---
The goal was to read image dimension from image file. Pretty easy task with standard &#8220;[image](https://golang.org/pkg/image/#DecodeConfig)&#8221; library and DecodeConfig. The tricky part was &#8211; file wasn&#8217;t completed &#8211; I had only beginning of the file . Obviously I tried to decode headers by myself. I didn&#8217;t found exact recipe in GO, and found a lot of people looking for correct answer in many languages.

<!--more-->

### PNG headers

Let&#8217;s start with the easy one. PNG headers are pretty standard &#8211; everything is in place. Just need to read beginning of the file to array, and decode it like that

```
var body []byte
    offset := 16
    width := int32(binary.BigEndian.Uint32(body[offset : offset+4]))
    height := int32(binary.BigEndian.Uint32(body[(offset + 4) : offset+12]))
```

### JPEG headers

Here we have more problems. JPEG is very flexible, and you can put a lot of rubbish into file itself. Thanks to that it has special header structure, where it&#8217;s not so obvious where dimensions are encoded. You have to read file, look for headers, decode them &#8211; find correct one and then get width & height.

I&#8217;ve been using not existing website as a reference:[www.64lines.com/jpeg-width-height](https://web.archive.org/web/20131016210645/http://www.64lines.com/jpeg-width-height). I found this piece of code 

{{< gist slav123 38fcee1258d3ff14990e50e4026c98ff >}}
 which surprisingly works. My GO code looks pretty much similar:


{{< gist slav123 0b1c3a6212653a8617695a4d9973612c >}}
