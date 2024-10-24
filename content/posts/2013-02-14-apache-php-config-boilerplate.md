---
title: Amazon EC2 – Installing Apache and PHP boilerplate
author: admin
type: post
date: 2013-02-14T05:22:55+00:00
url: /2013/apache-php-config-boilerplate/
thumbnail: images/2013/02/lap.png
dsq_thread_id:
  - 1162063461
feature_size:
  - blank
categories:
  - DevOps
  - PHP
  - Software
tags:
  - apache
  - aws
  - php

---
In this extremely simply tutorial I&#8217;m going to show, how you can deploy basic LAMP stack on EC2 instance. Instruction are pretty basic, without extra comments. You can just copy and paste command to get working stack in lest then 15 minutes.

What you can learn from it? How to install Apache and PHP, how to enable and run XCache accelerator, and how to run HTTPS on your server, with purchasing SSL certificate.

<!--more-->

#### Amazon Web Server

  * Log in to server as ec2-user,  
    `ssh -i your_pem_key.pem ec2-user@instance_name_or_ip`
  * To save some time, switch to sudo user:  
    `sudo -i`
  * Upgrade everything to the latest versions:  
    `yum update`
  * Install basic software:  
    `sudo yum install httpd php php-gd php-mysql php-mcrypt php-mb-string php-pecl-apc`
  * Start web server:  
    ```
    sudo service httpd start
    sudo chkconfig --levels 235 httpd on
    ```

Done &#8211; Apache and PHP is working, you can upload your files to `/var/www/html` directory to see them.

### Additional changes in config files &#8211; Time Zone

In `/etc/php.ini` timezone should be setup like that:  
```
date.timezone = "Australia/Sydney"
expose_php = Off
```

Don&#8217;t forget to restart httpd to see changes  
`service httpd restart`

Now we have to update server to proper TimeZone

```
cd /etc/
rm -rf localtime && ln -s /usr/share/zoneinfo/Australia/Sydney localtime
```

Of course replace Australia/Sydney with proper Time Zone &#8211; pretty nice list is available on [PHP documentation website](http://www.php.net/manual/en/timezones.php)

### Optional Apache configuration

We would like to use .htaccess files, so let&#8217;s enable them on Apache.

```
nano /etc/httpd/conf/httpd.conf
Options -Indexes FollowSymLinks
AllowOverride All
```

### Some security settings (don&#8217;t expose Apache)

```
ServerTokens Prod
ServerSignature Off
``` 

### WebFonts for Firefox

```
AddType application/vnd.ms-fontobject .eot
AddType application/x-font-ttf .ttf
AddType application/x-font-woff .woff
```

### Get some speed on apache

```
<IfModule mod_headers.c>
<FilesMatch "\.(js|css|xml|gz)$">
Header append Vary: Accept-Encoding
</FilesMatch>
</IfModule>
```

## compress text, html, javascript, css, xml:

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

### Optional XCache installation

Let&#8217;s speed up out slow PHP installation a little bit. Skip this step if you previously installed PHP-PECL-APC module.

XCache is a fast, stable  PHP opcode cacher that has been tested and is now running on production servers under high load..

```
sudo yum install php-devel gcc make
wget http://xcache.lighttpd.net/pub/Releases/3.1.0/xcache-3.1.0.tar.gz
tar zxvf xcache-3.1.0.tar.gz
cd xcache-3.1.0
phpize --clean && phpize
./configure --enable-xcache && make
```

```
sudo make install
sudo cp xcache.ini /etc/php.d/
sudo service httpd restart
```

Now we have really fast installation of Apache with XCache accelerator. What else we could ask for? HTTPS !

### SSL Certificate installation

To enable HTTPS connections we have to install mod_ssl for apache

`sudo yum install mod_ssl`

If you would like to have real SSL certificate you have to generate CSR

`openssl req -nodes -newkey rsa:2048 -keyout myserver.key -out server.csr`

As a result you will se something like that:

```
Generating a 2048 bit RSA private key
..............................+++
.................................................................................+++
writing new private key to 'myserver.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:AU
State or Province Name (full name) []:NSW
Locality Name (eg, city) [Default City]:Sydney
Organization Name (eg, company) [Default Company Ltd]:SpiderSoft 
Organizational Unit Name (eg, section) []:Digital
Common Name (eg, your name or your server's hostname) []:www.spidersoft.com.au
Email Address []:admin@spidersoft.com.au

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

As an result of this operation you will get two really important files. One of them is `server.csr` &#8211; it&#8217;s a [Certificate signing request](http://en.wikipedia.org/wiki/Certificate_signing_request) it&#8217;s a file which contains request to sign certificate, it&#8217;s a file which you have to provide to your SSL certificate issuer. I&#8217;m buying most of the SSL Certs from [Namecheap](http://www.namecheap.com?aff=9312) because it&#8217;s cheap and whole process is really simple. Second file is `myserver.key` which is your private key for SSL certificate. We will go back to this file later.

Anyway &#8211; as soon as you purchase certificate you will get 3 files which you need to install on your server to make it work. So

```
cp myserver.key /etc/pki/tls/private/
nano /etc/httpd/conf.d/ssl.conf
SSLCertificateFile /etc/pki/tls/certs/www_spidersoft_com_au.crt
SSLCertificateKeyFile /etc/pki/tls/private/myserver.key
SSLCertificateChainFile /etc/pki/tls/certs/www_spidersoft_com_au.ca-bundle
```

Small update: apparently some SSL providers are not giving you ca-bundle file, but 3 separate files. You have to combine them to one file, you cane use following line:

```
cat COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt  > www_spidersoft_com_au.ca-bundle
```

Don&#8217;t forget to check if your certificate was installed properly. I&#8217;m using this website [www.sslshopper.com/ssl-checker.html](http://www.sslshopper.com/ssl-checker.html)

### mod-spdy installation

Because we love speed, and we already have SSL certificate up and running we can finish our deployment with [mod-spdy](http://code.google.com/p/mod-spdy/) installation.

```
wget https://dl-ssl.google.com/dl/linux/direct/mod-spdy-beta_current_x86_64.rpm
rpm -U mod-spdy-beta_current_x86_64.rpm
service httpd restart
```

ok &#8211; finally &#8211; we have to test it. Open Chrome and open paste this url into to the browser `chrome://net-internals/#spdy`