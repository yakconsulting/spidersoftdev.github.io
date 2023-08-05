---
title: When you are running out of space on your server
lead: an easy way to extend your disc space on VM
author: admin
type: post
date: 2017-01-18T10:46:01+00:00
url: /2017/when-you-are-running-out-of-space-on-your-server/
dsq_thread_id:
  - 5680898315
categories:
  - DevOps
tags:
  - aws
  - cloud
  - DevOps

---
&#8230;in most cases you have 2 options. Because we are living in Cloud and VPS era &#8211; it&#8217;s not a big deal. You can always bump up your volume and after while you can enjoy bigger more expensive instance with more space. But sometimes you need just a space for a while or&#8230; just something for a backup ? You can always use [s3cmd][0], [gsutil][1] or another tool. Imagine that you have just regular folder on your drive, with almost unlimited space. Sounds good ? If so checkout &#8211; [s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse). Nice tool, which allows you to bind external storage as a director in your system.

 [0]: http://s3tools.org/s3cmd
 [1]: https://cloud.google.com/storage/docs/gsutil