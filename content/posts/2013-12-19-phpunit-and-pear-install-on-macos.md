---
title: PHPUnit and PEAR install on MacOS
author: admin
type: post
date: 2013-12-19T00:28:41+00:00
url: /2013/phpunit-and-pear-install-on-macos/
thumbnail: images/2013/12/pphunit.jpg
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
  - 2059862772
categories:
  - Continuous Integration
  - DevOps
  - Open Source
  - Software
tags:
  - php
  - phpunit

---
There is a plenty of tutorials how to install PEAR and  PHP, but there is always something &#8220;missing&#8221; in this configuration. So this time, i&#8217;m going to &#8220;sing the same song again&#8221;.
<!--more-->
## Let&#8217;s start &#8211; PEAR

```
curl http://pear.php.net/go-pear.phar > go-pear.phar
sudo php -d detect_unicode=0 go-pear.phar
```

Make sure that you have setup similar to this one (may vary about you current setup):  
```
1. Installation base ($prefix) : /usr/lib/php
2. Temporary directory for processing : /tmp/pear/install
3. Temporary directory for downloads : /tmp/pear/install
4. Binaries directory : /usr/bin
5. PHP code directory ($php_dir) : /usr/lib/php
6. Documentation directory : /usr/lib/php/doc
7. Data directory : /usr/lib/php/data
8. User-modifiable configuration files directory : /usr/lib/php/cfg
9. Public Web Files directory : /usr/lib/php/htdocs
10. Tests directory : /usr/lib/php/tests
11. Name of configuration file : /Users/sjas/.pearrc
``` 

Very important part of the process is to properly setup includes path in php.ini, by defualt there is no /etc/php.ini, so you have to create / copy it.:  

```
sudo cp /etc/php.ini.default /etc/php.ini
sudo nano /etc/php.ini
``` 

and make sure that you have something like that:

```
include_path = ".:/php/includes:/usr/lib/php/share/pear"
``` 

## PHPUnit

```
sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover components.ez.no
sudo pear channel-discover pear.symfony-project.com
sudo pear install phpunit/PHPUnit
pear install -a -f pear.phpunit.de/FinderFacade
```

## XDebug for Mac OS

[ode.activestate.com/komodo/remotedebugging](http://code.activestate.com/komodo/remotedebugging/)

Bonus tip how to install older version of Pear package:  
```
pear uninstall PHP_CodeSniffer
pear installl PHP_CodeSniffer-1.4.8
```