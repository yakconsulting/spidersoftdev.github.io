---
title: Attribute value in Magento
author: admin
type: post
date: 2011-08-15T02:37:29+00:00
url: /2011/attribute-value-in-magento/
thumbnail: images/uploads/2011/08/magento_logo.png
dsq_thread_id:
  - 1158950137
categories:
  - PHP
  - Open Source
tags:
  - magento
  - php
  - snippet

---
Some useful function for managing attribute values in Magento.  
<!--more-->

## Check if attribute value exists

```private function attributeValueExists($arg_attribute, $arg_value)
    {
        $attribute_model        = Mage::getModel('eav/entity_attribute');
        $attribute_options_model= Mage::getModel('eav/entity_attribute_source_table') ;

        $attribute_code         = $attribute_model->getIdByCode('catalog_product', $arg_attribute);
        $attribute              = $attribute_model->load($attribute_code);
        
        $attribute_table        = $attribute_options_model->setAttribute($attribute);
        $options                = $attribute_options_model->getAllOptions(false);
        
        foreach($options as $option)
        {
            if ($option['label'] == $arg_value)
            {
                return $option['value'];
            }
        }
        
        return false;
    }
```

## return available attributes values

```
private function attributeValues($arg_attribute)
    {
        $attribute_model        = Mage::getModel('eav/entity_attribute');
        $attribute_options_model= Mage::getModel('eav/entity_attribute_source_table') ;

        $attribute_code         = $attribute_model->getIdByCode('catalog_product', $arg_attribute);
        $attribute              = $attribute_model->load($attribute_code);
        
        $attribute_table        = $attribute_options_model->setAttribute($attribute);
        $options                = $attribute_options_model->getAllOptions(false);
        
        return $options;
    }
```

Get One attribute value

```
private function getAttributeValue($arg_attribute, $arg_option_id)
    {
        $attribute_model        = Mage::getModel('eav/entity_attribute');
        $attribute_table        = Mage::getModel('eav/entity_attribute_source_table');
        
        $attribute_code         = $attribute_model->getIdByCode('catalog_product', $arg_attribute);
        $attribute              = $attribute_model->load($attribute_code);
        
                                  $attribute_table->setAttribute($attribute);
                                  
        $option                 = $attribute_table->getOptionText($arg_option_id);
        
        return $option;
    }
```