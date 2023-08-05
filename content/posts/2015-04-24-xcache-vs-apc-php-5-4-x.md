---
title: XCache vs APC PHP 5.4.x
author: admin
type: post
date: 2015-04-24T08:13:23+00:00
url: /2015/xcache-vs-apc-php-5-4-x/
thumbnail: images/2014/08/php-logo.png
dsq_thread_id:
  - 3707943134
categories:
  - DevOps
  - PHP

---
Recently I&nbsp;decided to run some upgrades on my servers, and go up to PHP 5.5. I&#8217;ve been using [APC](http://pecl.php.net/package/APC) for a while (convenience) &#8211; usually is also bundled with all available repositories, or you can just grab it via PECL. Before that I was always with [XCache](http://xcache.lighttpd.net/). But&#8230; as long APC is no lonager maintained (last upgrade 2012) I make a call about going to XCache. Run some benchmarks, and here what we got.

<!--more-->

Testing hardware:

2.3 GHz Intel Core i7 &#8211; 8GB of ram, SSD drives. Website which I was benchmarking was a have WordPress installation with multiple running scripts.

I run `ab -n 100 -c 20`

Here is what I&nbsp;got:

&nbsp;|apache 1st|  apache 2nd|       XCache 1st|XCache 2nd|      &nbsp;APC 2nd
|---|---:|---:|---:|---:|---:
Time taken for tests [seconds]|11.11| 11.11| 9.029| 9.073| 5.474|    5.343|
Complete requests|100|100|100|100|100|100
Failed requests|69|69|69|41|46|40
Requests per second&nbsp;[#/sec] (mean)|9|9|11.08| 11.02|18.27|18.72
Time per request:&nbsp;[ms] (mean)|2221.978|2221.978|1805.76|1814.617|1094.74|1068.568
Transfer rate:[ms] (mean, across all concurrent requests)|111.099|111.099|90.288|90.731|54.737|53.428
Transfer rate[Kbytes/sec] received|420.67|420.67|517.63|515.11|853.83|874.73
  
Surprisingly &nbsp;XCache is much slower than APC &#8211; I was expecting better results, but as long we are losing support for APC in PHP 5.5 doesn&#8217;t make any sense to keep it running.