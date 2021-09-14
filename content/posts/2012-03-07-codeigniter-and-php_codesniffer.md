---
title: CodeIgniter and PHP_CodeSniffer
author: slav
type: post
date: 2012-03-07T08:28:40+00:00
url: /2012/codeigniter-and-php_codesniffer/
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
  - 1163669563
categories:
  - Open Source
  - PHP
tags:
  - codeigniter
  - continuous integration
  - php_codesniffer

---
<a href="http://codeigniter.com/" target="_blank">CodeIgniter</a> is the king 😉 But if we want to create good quality code, we should be aware about <a href="http://codeigniter.com/user_guide/general/styleguide.html" target="_blank">CodeIgniter style guide</a> standards. What can be better than <a href="http://pear.php.net/package/PHP_CodeSniffer/" target="_blank">PHP_CodeSniffer</a> for keeping our code consistent and clean as much as it possible.

Unfortunately standard rules from PHP_CodeSniffer doesn&#8217;t apply for CodeIgniter. You have to install additional set of rules &#8211; you can download them from here: <a href="https://github.com/thomas-ernest/CodeIgniter-for-PHP_CodeSniffer" target="_blank">PHP_CodeSniffer rules for CI</a>.