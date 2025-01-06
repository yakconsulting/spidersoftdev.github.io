---
title: Apache and PHP on OS X Yosemite
author: admin
type: post
date: 2014-10-29T03:27:31+00:00
url: /2014/apache-and-php-on-os-x-yosemite/
thumbnail: images/2014/10/OS_X_Yosemite_Desktop.png
dsq_thread_id:
  - 3167601558
categories:
  - PHP
  - Software
tags:
  - apache
  - mac os x
  - php
  - yosemite

---
It&#8217;s just a short instructions how to run Apache and PHP on OS X Yosemite.

PHP and Apache are already there &#8211; just need to run Apache and enable PHP. Video showing up whole process is available here:


Here you can check out exact changes.

Firsting first &#8211; we have to run Apache

`sudo apachectl start`

Then make some changes in httpd.conf file

`sudo nano /etc/apache2/httpd.conf`

Find two lines

```
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
LoadModule php5_module libexec/apache2/libphp5.so
```

and uncomment them. To enable PHP and mod_rewrite.  
And then restart Apache &#8211; 

`sudo apachectl restart`

You can also enable `.htaccess` by changing one more line  
from

`AllowOverride none`

to 

`AllowOverride All`

It&#8217;s also nice to enable directory indexing as long it&#8217;s our dev environment

`Options +Indexes`