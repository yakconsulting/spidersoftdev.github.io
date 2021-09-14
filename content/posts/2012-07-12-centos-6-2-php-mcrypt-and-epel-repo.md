---
title: CentOS 6.2 php-mcrypt and EPEL repo
author: admin
type: post
date: 2012-07-12T10:28:08+00:00
url: /2012/centos-6-2-php-mcrypt-and-epel-repo/
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
  - 1162839668
categories:
  - Linux
tags:
  - centos
  - epel
  - magento
  - repo

---
You will find plenty of &#8220;how-to&#8221; tutorials, but usually with not working url to EPEL repo. So this is mine:

```
yum install http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-7.noarch.rpm
yum update
yum install php-mcrypt
```
