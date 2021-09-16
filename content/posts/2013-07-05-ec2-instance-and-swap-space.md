---
title: EC2 Instance and SWAP space
author: admin
type: post
date: 2013-07-04T23:07:23+00:00
url: /2013/ec2-instance-and-swap-space/
thumbnail: images/2012/06/amazon-web-services-logo3.jpg
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
  - 1467718836
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
tags:
  - aws
  - ec2
  - linux
  - server

---
EC2 Instances on Amazon out of the box, does not contain any [SWAP space](http://www.linux.com/news/software/applications/8208-all-about-linux-swap-space). So if you exhaust memory, machine probably stuck. It’s very good practice, to give them at least slow SWAP memory to save instant crashes.

Process is quite simple. Let&#8217;s check how much free space we have:

<!--more-->

```
free
```

Let&#8217;s make swapfile

```
sudo dd if=/dev/zero of=/var/swap bs=1M count=1024
sudo mkswap /var/swap
sudo chmod 0600 /var/swap
sudo swapon /var/swap
```


Safe changes to `/etc/fstab`

`sudo echo "/var/swap none swap sw 0 0" >> /etc/fstab`