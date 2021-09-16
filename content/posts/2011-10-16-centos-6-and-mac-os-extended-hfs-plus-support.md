---
title: CentOS 6 and Mac OS Extended (HFS Plus) support
author: admin
type: post
date: 2011-10-16T02:43:22+00:00
excerpt: "By default CentOS 6 does not have support for Mac OS Extended (HFS Plus) support. But it's quite easy to enable this support for this file system."
url: /2011/centos-6-and-mac-os-extended-hfs-plus-support/
thumbnail: images/2011/10/Centos-Logo.png
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
  - 1158886822
categories:
  - Linux
tags:
  - centos
  - linux
  - mac os x

---
By default CentOS 6 does not have support for Mac OS Extended [HFS Plus](http://en.wikipedia.org/wiki/HFS_Plus) support.

> HFS Plus or HFS+ is a file system developed by Apple Inc. to replace their Hierarchical File System (HFS) as the primary file system used in Macintosh computers (or other systems running Mac OS). It is also one of the formats used by the iPod digital music player. HFS Plus is also referred to as Mac OS Extended (or, erroneously, “HFS Extended”), where its predecessor, HFS, is also referred to as Mac OS Standard (or, erroneously, as “HFS Standard”)

<!--more-->

But it&#8217;s quite easy to enable this support for this file system:

```
rpm --import http://elrepo.org/RPM-GPG-KEY-elrepo.org
rpm -Uvh http://elrepo.org/elrepo-release-6-4.el6.elrepo.noarch.rpm
yum install kmod-hfsplus
```

or

If you want to enable write support for HFS volumes, you also need to (disable journaling)[http://support.apple.com/kb/ht2355] for drive.