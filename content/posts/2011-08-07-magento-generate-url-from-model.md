---
title: Magento generate url from model
author: admin
type: post
date: 2011-08-07T04:16:23+00:00
url: /2011/magento-generate-url-from-model/
thumbnail: images/2011/08/magento_logo.png
layout:
  - default
hide_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
dsq_thread_id:
  - 1161757076
categories:
  - Blog
  - Open Source
tags:
  - magento
  - php
  - snippet

---
All links in Magento should be generated via url model. Here is simple examples working in backend.  
<!--more-->

```
$url = Mage::getModel('adminhtml/url');
    $url->setControllerName('adminhtml_settings');
    $url->setActionName('action');
    echo $url->getUrl();
```

This will produce full url like:

`http://my-srv.com/mag/index.php/model/adminhtml_settings/action/key/6998e/`

Where MODEL is model name which you are using, controller and action is generated via model and finally &#8211; if there is a existing secure key, will be created in url.