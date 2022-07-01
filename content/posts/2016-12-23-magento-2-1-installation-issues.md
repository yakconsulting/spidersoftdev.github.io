---
title: Magento 2.1 installation issues
author: admin
type: post
date: 2016-12-23T11:15:28+00:00
url: /2016/magento-2-1-installation-issues/
dsq_thread_id:
  - 5577622014
categories:
  - Technologies
  - Open Source
  - PHP
tags:
  - magento
  - php

---
I&#8217;ve been recently trying to install the latest Magento and was experiencing some issues with Magento installer unable to detect PHP version. My message was pretty weird:

`Your PHP version is . The required PHP version is`

also found couple 500 errors in XHR requests. 

<!--more-->

After googling for a while, I found simple solution for my problem. Apparently Magento expects SSL by default, and it was looking for path to certificates folders. You can easily disable it by modifying `composer.json` by modifying this section: 

```
 "config": {
    "use-include-path": true,
    "disable-tls": true
    },
```

After that change installation process run smoothly without any issues.