---
title: PHP 7 on AMI Linux (EC2)
author: admin
type: post
date: 2015-12-10T14:34:11+00:00
url: /2015/php-7-on-ami-linux-ec2/
thumbnail: images/2015/12/amazon-aws-php70.png
dsq_thread_id:
  - 4401891925
categories:
  - Linux
  - PHP
tags:
  - aws
  - ec2
  - php

---
PHP 7.0 it's already a while on the market. Let&#8217;s install it on EC2 instance.  Here you can find a quick recipe:  
<!--more-->

&nbsp;

```SHELL
sudo yum upgrade -y
sudo yum install php70
php -v
PHP 7.0.21 (cli) (built: Sep 14 2017 15:46:42) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2017 Zend Technologies
```

Moving forward with Apache configuration if you are looking to use PHP on your server instead of command line online, you have to install additional packages. So if you are using PHP as an FPM module:

```SHELL
php70-php-fpm
```

then you can just follow instructions in my [previous article][1].

It&#8217;s worthwhile to install some additional PHP packages:

```SHELL
yum install php70-xml php70-pdo php70-mysqlnd php70-gd php70-mbstring php70-mcrypt php70-mysqlnd php70-opcache
```

Let&#8217;s make sure that apache is always on:

```
sudo chkconfig --levels 235 httpd on
```

Basic PHP configuration:  
`/etc/php.ini`

```
date.timezone = "Australia/Sydney"
expose_php = Off
```

Server configuration  
```
cd /etc/
sudo rm -rf localtime && sudo ln -s /usr/share/zoneinfo/Australia/Sydney localtime
```

 [1]: /2014/apache-2-4-php-5-4-on-ec2-instance/