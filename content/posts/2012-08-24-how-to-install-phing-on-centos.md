---
title: How to install Phing on CentOS
author: admin
type: post
date: 2012-08-24T07:45:34+00:00
url: /2012/how-to-install-phing-on-centos/
thumbnail: images/uploads/2012/08/phing.gif
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
external_link:
  - http://phing.info/trac/
dsq_thread_id:
  - 1160620822
categories:
  - Continuous Integration
tags:
  - centos
  - phing
  - php

---
[**PH**ing][1] **I**s **N**ot **G**NU make; it&#8217;s a PHP project build system or build tool based on [ Apache Ant][2]. You can do anything with it that you could do with a traditional build system like GNU make, and its use of simple XML build files and extensible PHP &#8220;task&#8221; classes make it an easy-to-use and highly flexible build framework.

This build tool ensures that the process of creating your  web application from source code happens in a proper and repeatable way. This is the best way to reduce the possibility of errors caused by manual uploads via FTP or SSH using desktop client.

<!--more-->

Make sure PEAR is installed for PHP:

`yum install php-pear`

Then install the PEAR phing package:

```
pear channel-discover pear.phing.info
pear install phing/phing
```

Or&#8230; You can pull `phar` archive using:

```
wget http://www.phing.info/get/phing-latest.phar
chmod a+x phing-latest.phar
mv phing-latest.phar phing
```


 [1]: http://phing.info/trac/
 [2]: http://ant.apache.org/