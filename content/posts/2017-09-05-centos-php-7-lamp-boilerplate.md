---
title: Centos PHP 7 LAMP boilerplate
author: admin
type: post
date: 2017-09-05T03:45:48+00:00
url: /2017/centos-php-7-lamp-boilerplate/
thumbnail: images/2017/09/CentOSLogo.png
dsq_thread_id:
  - 6120377031
categories: 
  - Linux
  - PHP
tags:
  - apache
  - centos
  - lamp
  - linux
  - php

---
This time we are going to cook Apache (httpd 2.4), PHP 7.0 as a [PHP-FPM](http://wiki.apache.org/httpd/PHP-FPM). Instructions are pretty simple. You can just copy and paste command to get working stack in less then 15 minutes.

What you can learn from it? How to install Apache 2.4 and PHP 7, how to enable and opcache, and how to install HTTPS on your server, with purchasing SSL certificate.

<!--more-->

### Centos 7

  * Log in to server as user,
  * To save some time, switch to sudo user:  
    `sudo -i`
  * we are going to need REMI repository for PHP 7  
    `wget http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
rpm -Uvh remi-release-7.rpm`
  * Upgrade everything to the latest versions:  
    `yum update -y`

Let's start with some software:

```
sudo yum install httpd mod_proxy_html php70-fpm 
sudo yum install php70-php-mcrypt php70-php-mbstring php70-php-gd php70-php-mysqli php70-php-xml hp70-php-opcache
```

After while&#8230;

```SHELL
sudo service php70-php-fpm start
sudo service httpd start
sudo chkconfig --levels 235 httpd on
sudo chkconfig php-fpm on
```

Done &#8211; your LAMP stack works. But it&#8217;s not visible from outside world yet&#8230;

### Firewall

```SHELL
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

### PHP configuration

Let&#8217;s do some more configuration around PHP:  
We have to find php.ini &#8211; `php70 -i | grep php.ini` gives us:  
In `/etc/opt/remi/php70/php.ini` timezone should be setup like that:

```SHELL
date.timezone = "Australia/Sydney"
expose_php = Off
```

Don&#8217;t forget to restart httpd and php-fpm to see changes

```SHELL
sudo service httpd restart
sudo service php-fpm restart
```

By default, PHP has very low limit on  size of uploaded files. It&#8217;s very good practice to increase it.  
We are looking for 2 values

```
upload_max_filesize=20M
post_max_size=32M
```

### Server configuration

Now we have to update server to proper TimeZone

```
cd /etc/
sudo rm -rf localtime && sudo ln -s /usr/share/zoneinfo/Australia/Sydney localtime
```

Of course replace Australia/Sydney with proper Time Zone &#8211; pretty nice list is available on [PHP documentation website](http://www.php.net/manual/en/timezones.php).

[http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html)

Good idea is to update time on the server straight away using command

```
sudo ntpdate -u pool.ntp.org
```

### Apache configuration

We have to push our PHP files from Apache to PHP-FPM deamon.  
Create file `/etc/httpd/conf.d/proxy.conf`  
and paste there these lines

```
ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://127.0.0.1:9000/var/www/html/$1
```

If you would like to use sockets instead of TCP connection, yo ucan set it up like this:

```
ProxyPassMatch ^/(.*\.php(/.*)?)$ unix:/var/run/php-sock|fcgi://localhost/var/www/html
```

Don&#8217;t forget enable proxy module to handle this directives:

```
LoadModule proxy_fcgi_module libexec/apache2/mod_proxy_fcgi.so
```

Restart Apache again &#8211; sudo service httpd restart and try again using test:

```
echo "<?php phpinfo();" > /var/www/html/info.php
```

And test it via browser: http://your-ip/info.php

#### .htaccess support

`sudo nano /etc/httpd/conf/httpd.conf`  

You are looking for section starting:

```
# Further relax access to the default document root:
<Directory "/var/www/html">
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

#### Fontface Apache support

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
