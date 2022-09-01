---
title: Apache 2.4, PHP 5.4 on EC2 instance
author: admin
type: post
date: 2014-05-27T04:04:19+00:00
url: /2014/apache-2-4-php-5-4-on-ec2-instance/
thumbnail: images/2013/02/lap.png
dsq_thread_id:
  - 2715191704
categories:
  - Continuous Integration
  - Linux
  - PHP
tags:
  - aws
  - ec2
  - httpd
  - linux
  - php
---

This tutorial just updated version of my [previous one][1]. This time we are going to install newer version of apache (httpd 2.4), PHP 5.4 but as a [PHP-FPM](https://wiki.apache.org/httpd/PHP-FPM). Instructions are pretty simple. You can just copy and paste command to get working stack in less then 15 minutes.

What you can learn from it? How to install Apache 2.4 and PHP 5.4, how to enable and APC, and how to install HTTPS on your server, with purchasing SSL certificate.

<!--more-->


## Amazon Web Server

* Log in to server as ec2-user: `ssh -i your_pem_key.pem ec2-user@instance_name_or_ip`
* To save some time, switch to sudo user:`sudo -i`
* Upgrade everything to latest versions: `yum update`

Lets start with some software:

```bash
sudo yum install httpd24 mod24_proxy_html php54-fpm 
sudo yum install php54-mcrypt php54-mbstring php54-pecl-apc php54-gd php54-mysql php54-xml
```

After while&#8230;

```bash
sudo service php-fpm start
sudo service httpd start
sudo chkconfig --levels 235 httpd on
sudo chkconfig php-fpm on
```

Done &#8211; your LAMP stack works. Let&#8217;s do some more configuration around PHP:

##PHP configuration

In `/etc/php.ini` timezone should be setup like that:

```ini
date.timezone = "Australia/Sydney"
expose_php = Off
```

Don&#8217;t forget to restart httpd and php-fpm to see changes

```bash
sudo service httpd restart
sudo service php-fpm restart
```

By default PHP has very low limit on  size of uploaded files. It&#8217;s very good practice to increase it.  
We are looking for 2 values

```ini
upload_max_filesize=20M
post_max_size=32M
```

## Server configuration

Now we have to update server to proper TimeZone

```bash
cd /etc/
sudo rm -rf localtime && sudo ln -s /usr/share/zoneinfo/Australia/Sydney localtime
```

Of course replace Australia/Sydney with proper Time Zone &#8211; pretty nice list is available on [PHP documentation website](https://www.php.net/manual/en/timezones.php).

[http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html)

Good idea is to update time on the server straight away using command

`sudo ntpdate -u pool.ntp.org`

## Apache configuration

We have to push our PHP files from Apache to PHP-FPM deamon.  
Create file `/etc/httpd/conf.d/proxy.conf`  
and paste there these lines

`ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://127.0.0.1:9000/var/www/html/$1`

If you would like to use sockets instead of TCP connection, yo ucan set it up like this:

`ProxyPassMatch ^/(.*\.php(/.*)?)$ unix:/var/run/php-sock|fcgi://localhost/var/www/html`

Restart Apache again &#8211; sudo service httpd restart and try again using test:

`echo "<?php phpinfo();" > /var/www/html/info.php`

And test it via browser: http://your-ip/info.php

### .htaccess support

`sudo nano /etc/httpd/conf/httpd.conf`  

You are looking for section starting:

```
# Further relax access to the default document root:
<Directory "/var/www/html">
```
```
And just change  

`AllowOverride None`  

to  

`AllowOverride All`  

to enable .htaccess  

To disable showing up directory content update

```
Options Indexes FollowSymLinks
```

to

```
Options -Indexes 
Options -FollowSymLinks
```
#### Some security settings (don&#8217;t expose Apache)

```
ServerTokens Prod
ServerSignature Off
```

### Fontface Apache support

```
AddType application/vnd.ms-fontobject .eot
AddType application/x-font-ttf .ttf
AddType application/x-font-woff .woff
```

#### Get some speed on Apache

```
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|xml|gz)$">
    Header append Vary: Accept-Encoding
</FilesMatch>
</IfModule>
```

#### compress text, html, javascript, css, xml:

```
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE text/javascript
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
```

### Securing Apache with SSL

Let&#8217;s install mod24_ssl

```
sudo yum install mod24_ssl
```

And generate private key + CSR

```
openssl req -nodes -newkey rsa:2048 -keyout /etc/pki/tls/private/localhost.key -out server.csr
```

don&#8217;t forget to copy this file in save location ! `/etc/pki/tls/private/localhost.key`

if we got our purchased SSL certificate, we have to create file with it. Usually you have to marge all of them to one file:

`cat spidersoft_com_au.crt spidersoft_com_au.ca-bundle > spidersoft_com_au.crt.bundle`

now we have to make couple small amends in `/etc/httpd/conf.d/ssl.conf` file.

&nbsp;

```
DocumentRoot "/var/www/html"
ServerName www.spidersoft.com.au:443
SSLCertificateFile /etc/pki/tls/certs/spidersoft_com_au.crt.bundle
SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
```
Don’t forget to check if your certificate was installed properly. I’m using this website [www.sslshopper.com/ssl-checker.html](http://www.sslshopper.com/ssl-checker.html)

 [1]: /2013/apache-php-config-boilerplate/ "Amazon EC2 – Installing Apache and PHP boilerplate"