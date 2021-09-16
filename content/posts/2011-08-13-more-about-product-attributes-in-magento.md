---
title: More about product attributes in Magento
author: admin
type: post
date: 2011-08-13T05:10:41+00:00
url: /2011/more-about-product-attributes-in-magento/
thumbnail: images/2011/08/magento_logo.png
dsq_thread_id:
  - 1163140157
categories:
  - Blog
  - Open Source
tags:
  - magento
  - snippet

---
Last time I mentioned Magento attributes, how to create them from model. Ok &#8211; but examples was quite simple. This time a little more explanation.  
<!--more-->

  
How to create dropdown attribute, with values YES and NO:

```
  $entityTypeId = 'catalog_product';
    $code = 'my_attribute';
    $attr = array(
        'entity_type_id' => $entity_type_id,
        'backend_type' => 'int',
	'label' => 'Export to Lasoo',
	'type' => 'text',
        'input' => 'select',
	'option' => array ('value' => array(
                                            'yes' => array('Yes'), 
                                            'no' => array('No'))
                           ),
        'is_user_defined' => 1,
        'frontend_input' => 'text',
	'is_visible' => 0,
    );
	 
    $setup = new Mage_Eav_Model_Entity_Setup('core_setup');
    $r = $setup->addAttribute($entityTypeId, $code, $attr);
```

What else you can change?

```
array( 
   'is_global'                 => 1,
   'is_visible'                => 1,
   'is_required'               => 1,
   'is_user_defined'           => 0,
   'default_value'             => '',
   'is_searchable'             => 0,
   'is_filterable'             => 0,
   'is_comparable'             => 0,
   'is_visible_on_front'       => 0,
   'is_html_allowed_on_front'  => 0,
   'is_visible_in_advanced_search' 0,
   'is_used_for_price_rules'   => 1,
   'is_filterable_in_search'   => 0,
   'used_in_product_listing'   => 0,
   'used_for_sort_by'          => 0,
   'is_unique'                 => 0,
   'is_configurable'           => 1,
   'note'                      => '',
   'position'                  => 0) 
```