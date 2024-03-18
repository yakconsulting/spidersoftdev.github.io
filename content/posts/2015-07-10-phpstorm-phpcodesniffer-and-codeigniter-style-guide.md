---
title: PhpStorm PHPCodeSniffer and… CodeIgniter style guide
author: admin
type: post
date: 2015-07-10T01:26:14+00:00
url: /2015/phpstorm-phpcodesniffer-and-codeigniter-style-guide/
feature_size:
  - blank


dsq_thread_id:
  - 3920397853
categories:
  - Continuous Integration
  - PHP
  - Software
tags:
  - php
  - codeigniter

---
This article is related to my previous one about setting up [PHPCodeSniffer with CodeIgniter][1] coding standards.

Installation on Linux boxes is pretty yeasy:

```
sudo pear channel-update pear.php.net
yum install php-pear-PHP-CodeSniffer php-phpunit-phpcpd
```


On Mac OS X you have couple options. Pear or Homebrew:

`brew install php-code-sniffer`

And following that, on regular boxes CodeSniffer will be here:

`/usr/share/pear/PHP/CodeSniffer/Standards` 

on Mac OS CodeSniffer will be located here:  

`/usr/lib/php/pear/PHP/CodeSniffer/Standards` or&#8230; `/usr/local/Cellar/php-code-sniffer/1.5.6/CodeSniffer/Standards`

CodeIgniter standard can be downloaded from this location [https://github.com/thomas-ernest/CodeIgniter-for-PHP_CodeSniffer][2]

&nbsp;

all you need to do is just pull master.zip file from github, and run ANT build file.

You can check if your installation was succesfull by running `phpcs -i` as a result you should get something like that:

```
phpcs -i
The installed coding standards are CodeIgniter, MySource, PEAR, PHPCS, PSR1, PSR2, Squiz and Zend
```

 [1]: /2012/codeigniter-and-php_codesniffer/ "CodeIgniter and PHP_CodeSniffer"
 [2]: https://github.com/thomas-ernest/CodeIgniter-for-PHP_CodeSniffer "https://github.com/thomas-ernest/CodeIgniter-for-PHP_CodeSniffer"