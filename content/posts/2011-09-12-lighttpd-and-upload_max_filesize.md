---
title: Lighttpd and upload_max_filesize
author: admin
type: post
date: 2011-09-12T01:11:20+00:00
url: /2011/lighttpd-and-upload_max_filesize/
thumbnail: images/2011/08/lighttpd.jpg
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
  - 1160423032
categories:
  - Blog
tags:
  - lighttpd
  - php

---
Default setting for uploading file size in PHP is really small. Usually it&#8217;s about 2MB. To increase this limit, you need to change one obvious variable:

```
upload_max_filesize = 20M
```

Eventually you can also increase max number of files to upload:

```
max_file_uploads = 20
```

But&#8230; this is not enough. Because on lighttpd PHP is working as a FastCGI process when you start uploading bigger files, you can get this bad message:

```
FastCGI-stderr: PHP Warning:  POST Content-Length of 18995464 bytes exceeds the limit of 8388608 bytes in Unknown on line 0
```

yep.. you ned to increate one last value:

```
post_max_size = 64M
```

in your php.ini file (`/etc/php5/cgi/php.ini`)