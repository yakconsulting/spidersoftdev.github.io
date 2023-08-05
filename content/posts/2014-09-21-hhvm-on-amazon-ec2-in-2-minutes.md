---
title: HHVM on Amazon EC2 in 2 minutes
author: admin
type: post
date: 2014-09-20T23:18:54+00:00
url: /2014/hhvm-on-amazon-ec2-in-2-minutes/
thumbnail: images/2014/09/hhvm.png
dsq_thread_id:
  - 3037758859


categories:
  - DevOps
  - PHP
tags:
  - hhvm
  - php

---
Probably you already heard about [HHVM](http://hhvm.com/). As on their website:

> HHVM is an [open-source][1] virtual machine designed for executing programs written in [Hack][2] and [PHP][3]. HHVM uses a just-in-time (JIT) compilation approach to achieve superior performance while maintaining the development flexibility that PHP provides.

Using simple terms &#8211; HHVM allows you run scripts written in PHP but much, much more faster. Obviously you the main purpose of HHVM is to run HACK language, but it works pretty good with PHP itself.

<!--more-->

Update: 2 Dec 2014. You don&#8217;t have to use my image, you can install it from this repo:

```
wget http://www.hop5.in/yum/el6/hop5.repo -O /etc/yum.repos.d
echo 'priority=9' >> hop5.repo
echo 'includepkgs=glog,tbb' >> hop5.repo
wget http://yum.devopsx.com/devopsx-amazon.repo
yum install hhvm
```

&nbsp;

Because i&#8217;m huge fan of speed I decided to give it a try, and run some benchmark. As for today the biggest issue with HHVM is compilation process. It takes ages to compile. If you follow [these instructions] (https://github.com/facebook/hhvm/wiki/Building-and-installing-HHVM-on-Amazon-Linux-2014.03) it takes around 30-45 minutes even if you use  c3.4xlarge instance. So&#8230; I compiled it once, and you can utilise my AMI to give it a try. AMI which i created has id `ami-355f3c0f`.

<div class="video-container">
</div>

Instructions are pretty basic &#8211; if you are lost, leave comment here.

 [1]: http://github.com/facebook/hhvm
 [2]: http://hacklang.org/
 [3]: http://php.net/