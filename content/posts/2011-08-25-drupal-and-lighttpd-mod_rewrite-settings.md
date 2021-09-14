---
title: Drupal and lighttpd mod_rewrite settings
author: admin
type: post
date: 2011-08-25T03:38:54+00:00
url: /2011/drupal-and-lighttpd-mod_rewrite-settings/
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
  - 1163540675
categories:
  - Blog
  - Open Source
tags:
  - drupal
  - lighttpd

---
Lighttpd is awesome and very fast webserver. But has one big disadvantage &#8211; is not reading apache .htaccess files with rewrite settings. Unfortunatley you need to create them manually in config file. How? Examples are below:

<!--more-->

```
url.rewrite-final = (
    "^/([^.?]*(\.xml|\.html)?)(\?(.+))?$" => "/index.php?q=$1&$4"
)
```

and when Drupal is not in root directory:

```
url.rewrite-final = (
    "^/drupal/([^.?]*(\.xml|\.html)?)(\?(.+))?$" => "/drupal/index.php?q=$1&$4"
)
```