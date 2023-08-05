---
title: How to Install GeoIP extension on CentOS
author: admin
type: post
date: 2012-10-23T02:32:56+00:00
url: /2012/how-to-install-geoip-extension-on-centos/
thumbnail: images/2012/10/geoip_icon.jpg
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
  - 1161365344


categories:
  - DevOps
  - PHP
tags:
  - centos
  - geoip

---
Small 2019 update – Please check out this library – [github.com/maxmind/MaxMind-DB-Reader-php][1]. It’s a straight replacement of PHP module.

[GeoIP from PECL](http://pecl.php.net/package/geoip) is powerful extension used to determine geographical locations of IP addresses and domain names. This is useful if you want to set a language or redirection based on location of your visitor. Check out the PHP docs for a full list of [GeoIP functions](http://www.php.net/manual/en/ref.geoip.php).  
<!--more-->

We start by installing the GeoIP library on your system.

```
yum install GeoIP-devel
yum install php-pear
yum install php-pecl-geoip
```

Last option we need to remember is just to create entry in out `php.ini` file

`extension=geoip.so`

We can also update out database, to the most recent DB file:

```
cd /usr/share/GeoIP
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
gunzip GeoIP.dat.gz
gunzip GeoLiteCity.dat.gz
mv GeoLiteCity.dat GeoIPCity.dat
```

The alternative way to install this extension is to use [PECL](https://pecl.php.net/)

`pecl install geoip`

or with PHP7 &#8211; it&#8217;s quite important to force version number, because default (stable) won&#8217;t work with PHP 7

`pecl install geoip-1.1.1`

And then have test it:

```
$record = geoip_record_by_name($_SERVER["REMOTE_ADDR"]);
	if ($record) {
    	print_r($record);
	}
```

Finally.. if you still can&#8217;t install this extension you can always look at [freegeoip.net](http://freegeoip.net/). Data format is exactly the same, so you can just wrap it with something like that:

```
function geoip_record_by_name( string $hostname) : array {
	$json_data = file_get_contents("http://freegeoip.net/json/" . $hostname);
	return json_decode($json_data, TRUE);
}
```
[1]: https://github.com/maxmind/MaxMind-DB-Reader-php