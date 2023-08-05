---
title: Setting up caddy server for wordpress
author: admin
type: post
date: 2016-02-08T09:03:34+00:00
url: /2016/setting-up-caddy-server-for-wordpress/
thumbnail: images/2016/02/caddy.jpg


dsq_thread_id:
  - 5578851343
categories:
  - DevOps
  - Open Source
  - Web Development
tags:
  - caddy
  - php
  - wordpress
  - www

---
[Caddy](https://caddyserver.com) is a another alternative to [Apache](https://httpd.apache.org) or [nginx](http://nginx.org). For me the biggest advantage is that it’s only one binary file to work with. It’s easy to run, setup and just “works”. It’s super modern – handles HTTP2 and automatic HTTPS encryption using let’s encrypt certificates. Obviously it has plenty of other features but we focus only on speed of deployment.

<!--more-->

All you need to run Caddy is just to download binary file, and create file called `Caddyfile` and then paste this file:

```
localhost:80
root /var/www/html
gzip
log /var/log/access.log
errors /var/log/error.log
fastcgi / 127.0.0.1:9000 php
rewrite {
    if {path} not_match ^\/wp-admin
    to {path} {path}/ /index.php?_url={uri}
}
```


If you are looking for more examples of redirects, please check out this [Caddy redirect wiki page](https://github.com/mholt/caddy/wiki/Troubleshooting-PHP-FPM-and-FastCGI)