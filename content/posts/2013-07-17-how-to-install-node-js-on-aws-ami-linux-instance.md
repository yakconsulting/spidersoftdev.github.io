---
title: How to install node.js on AWS AMI Linux instance
author: admin
type: post
date: 2013-07-17T00:25:57+00:00
url: /2013/how-to-install-node-js-on-aws-ami-linux-instance/
thumbnail: images/uploads/2013/07/node-logo.png
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
  - 1505321781
categories:
  - Linux
tags:
  - ami linux
  - aws
  - javascript
  - nodejs
  - server

---
It&#8217;s even simpler than more tutorials are saying. After login to instance, just enable EPEL repository

<!--more-->

`sudo nano /etc/yum.repos.d/epel.repo`

change enabled to 1

```
[epel]
name=Extra Packages for Enterprise Linux 6 - $basearch
#baseurl=http://download.fedoraproject.org/pub/epel/6/$basearch
mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=epel-6&arch=$basearch
failovermethod=priority
enabled=1
```

update your repo (could take a minute)

`sudo yum update`

and install npm (will also add nodejs)

`sudo yum install npm`


let&#8217;s check if it&#8217;s working:

`node -v v0.10.12`