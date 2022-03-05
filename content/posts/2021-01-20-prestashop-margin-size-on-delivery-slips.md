---
title: PrestaShop margin size on delivery slips
author: admin
type: post
date: 2021-01-20T13:02:23+00:00
url: /2021/prestashop-margin-size-on-delivery-slips/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
categories:
  - Technologies
  - PHP
tags:
  - prestashop

---
Recently one of my clients contacted me asking if I could make a change. The task was to shrink huge margins on PDF delivery slips. The mission wasn't easy because the settings were hidden in the files. You can change font size and amend or remove elements from the printout by modifying templates. Unfortunately, you can't decrease the margin on PDF printouts. 

<!--more-->

![prestashop-delivery-slips](images/2021/01/prestashop-delivery-slips.png)
  

All templates are located in folder PDF in the root directory of your deployment. You can modify multiple files to achieve the desired effect.

![prestashop-delivery-slips2.png](images/2021/01/prestashop-delivery-slips2.png)
  
But what you are really looking for is file `classes/pdf/PDFGenerator.php` where you can find something like that:
    
`$this->setMargins(10, 40, 10);`
    
This functions set&#8217;s up margins in order LEFT, TOP&#8230; so if you reduce 40 -> 10 &#8211; it will shrink margins to desired height.