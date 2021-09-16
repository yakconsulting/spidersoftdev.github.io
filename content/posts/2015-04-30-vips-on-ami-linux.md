---
title: VIPS on Amazon Linux AMI
author: admin
type: post
date: 2015-04-29T23:58:12+00:00
url: /2015/vips-on-ami-linux/
thumbnail: images/2015/04/gpu_amazon_ec2_logo.png
dsq_thread_id:
  - 3723931539
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
categories:
  - Linux

---
[VIPS][1] s a free image processing system (library) – in comparison  to similar libraries is super fast, and does not neet much memory. Checkout this [speed memory usage](http://www.vips.ecs.soton.ac.uk/index.php?title=Speed_and_Memory_Use). In most cases you can install it by using this handy script:

`curl -s https://raw.githubusercontent.com/lovell/sharp/master/preinstall.sh | sudo bash -`

In some cases you have to install it from source.  
<!--more-->

I created small fork of this script which will work on AMI Linux:

[Amazon Linux AMI](http://aws.amazon.com/amazon-linux-ami/) installation (probably will work also on all Red Hat based distributions (CentOs).

{{< gist slav123 e0221bd97fc904434f76 >}}

After while, you can check if VIPS is working correctly:

```
vips --version
vips-7.42.3-Wed Apr 29 23:52:49 UTC 2015
```

Don&#8217;t forget to extend PKG\_CONFIG\_PATH if you want to use vips as a port of other library. 

`export PKG_CONFIG_PATH=/usr/lib/pkgconfig/`

Checkout [using CLI](http://www.vips.ecs.soton.ac.uk/supported/current/doc/html/libvips/using-cli.html) documentation to play with it.

 [1]: http://www.vips.ecs.soton.ac.uk/