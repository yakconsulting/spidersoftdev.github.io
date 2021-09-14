---
title: Lighttpd and mod_expire
author: admin
type: post
date: 2011-08-27T03:39:40+00:00
url: /2011/lighttpd-and-mod_expire/
thumbnail: images/uploads/2011/08/lighttpd.jpg
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
dsq_thread_id:
  - 1162995605
categories:
  - Blog
  - Software
tags:
  - lighttpd
  - linux
  - pagespeed
  - server

---
Google <a href="http://pagespeed.googlelabs.com/" target="_blank">Page Speed Online</a> is really good service for measuring and optimising your website. After deep analysis we get a lot if clues how to improve speed of your website. But how to <a href="http://code.google.com/speed/page-speed/docs/caching.html#LeverageBrowserCaching" target="_blank">Leverage browser caching</a> if we have <a href="http://www.lighttpd.net/" target="_blank">Lighttpd</a> instead default Apache? We need to use <a href="http://redmine.lighttpd.net/wiki/lighttpd/Docs:ModExpire" target="_blank">mod_expire</a>.

<!--more-->All you need to do is decide which type of files you wan to cache &#8220;longer&#8221;. For example for images, CSS and JavaScript files you can use this code in you lighttpd config file 

`/etc/lighttpd/lighttpd.conf`:

<pre class="brush: plain; title: ; notranslate" title="">$HTTP["url"] =~ "\.(jpg|gif|png|css|js)$" {
    expire.url = ( "" => "access 7 days" )
}
</pre>

don&#8217;t forget to restart lighttpd: `service lighttpd restart` after that, you can check how this is actually working using curl:

<pre class="brush: plain; title: ; notranslate" title="">curl -I http://www.spidersoft.com.au/wp-content/themes/itheme2/style.css
</pre>

you should get something like this:

<pre class="brush: plain; title: ; notranslate" title="">HTTP/1.1 200 OK
Expires: Fri, 25 Sep 2011 05:52:26 GMT
Cache-Control: max-age=604800, max-age=604800
Content-Type: text/css
Accept-Ranges: bytes
ETag: "646531796"
Last-Modified: Wed, 18 May 2011 13:54:40 GMT
Content-Length: 30943
Date: Fri, 10 Jun 2011 05:52:26 GMT
Server: lighttpd/1.4.28
</pre>

don&#8217;t forget to enable etags!

<pre class="brush: plain; title: ; notranslate" title="">etag.use-inode = "enable"
etag.use-mtime = "enable"
etag.use-size = "enable"
static-file.etags = "enable"
</pre>