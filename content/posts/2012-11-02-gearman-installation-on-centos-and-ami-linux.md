---
title: Gearman installation on CentOS and AMI Linux
author: admin
type: post
date: 2012-11-02T01:53:09+00:00
url: /2012/gearman-installation-on-centos-and-ami-linux/
thumbnail: images/2012/11/gearman.png
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
  - 1171405428
categories:
  - Blog
  - DevOps
tags:
  - gearman
  - DevOps
  - php

---
[Gearman](http://gearman.org/) provides a generic application framework to farm out work to other machines or processes that are better suited to do the work.

This solution is truly multiplatform, so we have Client API and Wordkres in multiple languages like Shell, Perl, NodeJS any couple of others (PHP!)

<!--more-->

Installation is pretty simple on CentOS boxes,

```
yum install -y libevent-devel
yum install -y gcc-c++
yum instal -y boost-devel
yum install -y libuuid-devel
yum install -y memcached-devel
./configure --prefix=/usr && make && make install
```


Unfortunately with Amazon EC2 and default AMI Linux instance it&#8217;s not so easy. I don&#8217;t know why, by default boost-devel is broken, so yoy have to compile it manually from the sources. Other wise you could get couple of weird erros during compilation:

```
wget http://sourceforge.net/projects/boost/files/boost/1.51.0/boost_1_51_0.tar.gz/download
tar zxvf boost_1_51_0.tar.gz
cd boost_1_51_0
/bootstrap.sh --prefix=/usr
./b2 install
```


I strongly recommend upgrading instance to something faster then micro, because compilation from sources is takin a lot of time.