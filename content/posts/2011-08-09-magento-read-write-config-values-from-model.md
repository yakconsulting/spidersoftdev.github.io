---
title: Magento read / write config values from model
author: admin
type: post
date: 2011-08-09T04:23:20+00:00
url: /2011/magento-read-write-config-values-from-model/
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
  - 1158844048
categories:
  - Open Source
tags:
  - magento
  - php
  - snippet

---
You can create Magento config settings using XML files, or&#8230; do this directly from model. Here is example:  
<!--more-->

```
$value = "My Config Value";
Mage::getConfig()->saveConfig('MyVariableName', $value);
Mage::getConfig()->reinit();
Mage::app()->reinitStores();
```

Reading this value is much simplier:

`$value = Mage::getStoreConfig('MyVariableName');`
