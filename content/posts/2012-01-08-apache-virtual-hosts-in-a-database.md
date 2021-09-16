---
title: Apache Virtual Hosts in a Database
author: admin
type: post
date: 2012-01-08T11:34:00+00:00
url: /2012/apache-virtual-hosts-in-a-database/
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
  - 1158984672
categories:
  - Blog
  - Linux
tags:
  - apache
  - configuration
  - linux
  - server
  - www

---
As much as I love [lighttpd](http://www.lighttpd.net/) sometimes I can&#8217;t avoid [Apache](http://httpd.apache.org/). For me &#8211; &#8220;the best&#8221; thing in lighttpd is support for keeping vhost names in MySQL database. I don&#8217;t have to use any config files, I can just put record into MySQL database with virtual host server name, path to document root and it&#8217;s done. But &#8211; I can do the same witch Apache! How? With third party modules, below you can find short tutorial &#8220;how to&#8221;.

<!--more-->

I assume that you have already Apache and MySQL running. What we need to do to install some modules. Examples are based on AMI Linux, but probably this instructions will work on any RedHat based installation like CentOs or others.

Ok. Let's upgrade apache with devel module, for APXS:

`yum install httpd-devel apr-util-mysql`

We als need [dbd-modules](http://code.google.com/p/dbd-modules/) &#8211; Apache modules to allow Apache 2.2+ to access databases using DBD.

```
wget http://dbd-modules.googlecode.com/files/dbd-modules-1.0.5.zip
unzip -d dbd dbd-modules-1.0.5.zip
cd dbd
apxs -c mod_vhost_dbd.c
apxs -i mod_vhost_dbd.la
```

Now we need to create entries in httpd.conf in my case this will be:

```
LoadModule dbd_module modules/mod_dbd.so
LoadModule vhost_dbd_module modules/mod_vhost_dbd.so
```

and

```
<VirtualHost *:80>
    ServerName *
    DocumentRoot "/var/www/html"

    DBDriver mysql
    DBDParams host=dbhost,user=dbuser,pass=dbpass,dbname=dbname

    DBDocRoot "SELECT DocumentRoot FROM apache WHERE ServerName = %s"  HOSTNAME
</VirtualHost>
```

Where `dbhost,dbuser,dbpass,dbname` will be our MySQL details to login. Now we need to create mysql table:

MySQL tables configuration:

```
CREATE TABLE IF NOT EXISTS `apache` (
  `ServerName` varchar(128) NOT NULL,
  `DocumentRoot` varchar(256) NOT NULL,
  PRIMARY KEY (`ServerName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

Done. Now you can restart your MySQL server:  
`service httpd restart`  
and add some entries to MySQL database &#8211; where **ServerName** will be hostname, and **DocumentRoot** is self-explanatory.