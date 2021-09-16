---
title: GeoIP extension PHP 7.x + AMI / Redhat / CentOs Linux
author: admin
type: post
date: 2018-07-16T09:53:42+00:00
lastmod: 2019-06-16
url: /2018/geoip-extension-php-7-x-ami-redhat-centos-linux/
thumbnail: images/2018/07/travel-2650303_1920.jpg
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
  - PHP
tags:
  - geoip

---
Small 2019 update &#8211; Please check out this library &#8211; [github.com/maxmind/MaxMind-DB-Reader-php](https://github.com/maxmind/MaxMind-DB-Reader-php)

It&#8217;s a straight replacement of PHP module.

* * *

GeoIP extensions is quite use-full, but it requires some server &#8211; side magic. If you are looking for something simpler, just go with [ipstack.com](https://ipstack.com) or something similar &#8211; [GeoIP](https://geoip.gex.pl) .

Otherwise:

```
wget http://pear.php.net/go-pear.phar
php go-pear.phar
```

We need geoip-devel libraries:

`yum install geoip-devel`

And newest (not stable) version of geoip:

`sudo ./pecl install geoip-1.1.1`

Don&#8217;t forget to add `extension=geoip.so` to your php.ini file.