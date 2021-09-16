---
title: Lighttpd and mod_expire
author: admin
type: post
date: 2011-08-27T03:39:40+00:00
url: /2011/lighttpd-and-mod_expire/
thumbnail: images/2011/08/lighttpd.jpg
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
Google [Page Speed Online](http://pagespeed.googlelabs.com/) is really good service for measuring and optimising your website. After deep analysis we get a lot if clues how to improve speed of your website. But how to [Leverage browser caching](http://code.google.com/speed/page-speed/docs/caching.html#LeverageBrowserCaching) if we have [Lighttpd](http://www.lighttpd.net/) instead default Apache? We need to use [mod_expire](http://redmine.lighttpd.net/wiki/lighttpd/Docs:ModExpire).

<!--more-->
All you need to do is decide which type of files you wan to cache &#8220;longer&#8221;. For example for images, CSS and JavaScript files you can use this code in you lighttpd config file 

`/etc/lighttpd/lighttpd.conf`:

```
$HTTP["url"] =~ "\.(jpg|gif|png|css|js)$" {
    expire.url = ( "" => "access 7 days" )
}
```


don&#8217;t forget to restart lighttpd: `service lighttpd restart` after that, you can check how this is actually working using curl:

`curl -I http://www.spidersoft.com.au/wp-content/themes/itheme2/style.css`

you should get something like this:

```
HTTP/1.1 200 OK
Expires: Fri, 25 Sep 2011 05:52:26 GMT
Cache-Control: max-age=604800, max-age=604800
Content-Type: text/css
Accept-Ranges: bytes
ETag: "646531796"
Last-Modified: Wed, 18 May 2011 13:54:40 GMT
Content-Length: 30943
Date: Fri, 10 Jun 2011 05:52:26 GMT
Server: lighttpd/1.4.28
```


don&#8217;t forget to enable etags!

```
etag.use-inode = "enable"
etag.use-mtime = "enable"
etag.use-size = "enable"
static-file.etags = "enable"
```
