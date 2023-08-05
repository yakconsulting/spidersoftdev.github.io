---
title: Shuttle XS35 V2 and CentOs drivers
author: admin
type: post
date: 2013-12-23T10:43:40+00:00
url: /2013/shuttle-xs35-v2-and-centos-drivers/
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
  - 2068397218
categories:
  - DevOps
tags:
  - centos
  - drivers
  - DevOps

---
Some time ago I bought extremely quiet Shuttle [XS35 V2](http://global.shuttle.com/main/productsDetail?productId=1487) device to have something &#8220;seperate&#8221; for my web development work. Right now this awesome fan less device has many purposes. Works as full web dev stack, with Apache, PHP, MySQL, mongoDB, and even Jenkins machine.

Recently I realised that this small ugly device got also WiFi cart into it. Because I&#8217;m running out of cables and space in my apartment i figure out, that I could move it easily without plugging into it more cables.

<!--more-->

But&#8230; of course &#8211; Linux doesn&#8217;t not recognise this Card Out of the box. So.. here is recipe how to make it work:

`lspci -nn`  

Gives us  
` 02:00.5 Ethernet controller [0200]: JMicron Technology Corp. JMC250 PCI Express Gigabit Ethernet Controller [197b:0250] (rev 03) 03:00.0 Network controller [0280]: Realtek Semiconductor Co., Ltd. RTL8188CE 802.11b/g/n WiFi Adapter [10ec:8176] (rev 01)`  

Hope brings us [www.elrepo.org](http://ww.elrepo.org). You can also check [http://elrepo.org/tiki/DeviceIDs](http://elrepo.org/tiki/DeviceIDs) to find other missing devices. Quick import or youm repo:  

`rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org rpm -Uvh http://www.elrepo.org/elrepo-release-6-5.el6.elrepo.noarch.rpm`

and then installation of missing drivers (for ethernet 2)  

`yum install kmod-r8192ce yum install kmod-jme reboot`  

and&#8230;  

`ifconfing wlan0 up`  

It&#8217;s alive !