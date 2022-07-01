---
title: Caddy rewrite and CodeIgniter
author: admin
type: post
date: 2016-07-25T15:19:54+00:00
url: /2016/caddy-rewrite-and-codeigniter/
dsq_thread_id:
  - 5586916653
categories:
  - Open Source
  - Technologies
  - PHP
tags:
  - caddy
  - codeigniter

---
[Caddy][1] it&#8217;s a new kid in the block in category super light web servers. Personally &#8211; I love it. Same love I feel to [CodeIgniter][2]. To marge both of them, we need only basic rewrite rule to drop into caddyfile.

```
api.spidersoft.com.au {
        root /var/www/html/spidersoft.com.au
        gzip
        rewrite {
                to {path} {path}/ /index.php?/{uri}
        }
        fastcgi / /var/run/php-sock php
}
```


 [1]: https://caddyserver.com/
 [2]: https://codeigniter.com/