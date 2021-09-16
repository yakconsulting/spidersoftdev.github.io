---
title: Magento get all categories into array
author: admin
type: post
date: 2011-08-11T00:26:49+00:00
url: /2011/magento-get-all-categories-into-array/
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
  - 1158966362
categories:
  - Blog
  - Open Source
tags:
  - magento
  - php
  - snippet

---
You can grab all existing categories in Magento to array, here is quick example:  
<!--more-->

```
$categories = Mage::getModel('catalog/category')
                    ->getCollection()
                    ->addAttributeToSelect('*')
                    ->addIsActiveFilter();
		
	$all = array();
	foreach ($categories as $c) {
	   $all[$c] = $c->getName();
	}
	return $all;
    }
    ```