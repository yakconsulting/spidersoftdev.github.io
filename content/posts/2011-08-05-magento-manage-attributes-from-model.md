---
title: Magento manage attributes from model
author: admin
type: post
date: 2011-08-05T04:05:06+00:00
url: /2011/magento-manage-attributes-from-model/
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
  - 1162868285
categories:
  - Blog
  - Open Source
tags:
  - magento
  - php

---
You can create and remove Magento product attributes from model. It&#8217;s quite simple if you know how.  
<!--more-->
  
Ok. Lets create attribute:

```
$entityTypeId = 'catalog_product';
$code = 'my_attribute';
 
$attr = array(
  'entity_type_id' => $entity_type_id,
  'backend_type' => 'int',
  'is_user_defined' => 1,
  'frontend_input' => 'text',
  'is_visible' => 0,
);
	 
$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
$r = $setup->addAttribute($entityTypeId, $code, $attr);
```


And now we can remove attribute from model:

```
$entityTypeId = 'catalog_product';
$code = 'my_attribute';

$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
	
$info = $setup->getEntityType($entityTypeId);
	
$setup->removeAttribute($info['entity_type_id'], $code);
```
