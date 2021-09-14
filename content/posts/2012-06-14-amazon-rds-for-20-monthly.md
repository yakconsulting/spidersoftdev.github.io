---
title: Amazon RDS for $20 monthly
author: slav
type: post
date: 2012-06-14T07:52:04+00:00
url: /2012/amazon-rds-for-20-monthly/
thumbnail: images/uploads/2012/06/amazon-web-services-logo3.jpg
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
unlink_post_image:
  - default
dsq_thread_id:
  - 1163581664
categories:
  - Blog
tags:
  - amazon
  - aws
  - cdn
  - cloud

---
Amazon AWS [just announced](http://aws.amazon.com/about-aws/whats-new/2012/06/11/amazon-rds-micro/) that Micro instances can be used for [Amazon RDS](http://aws.amazon.com/rds/) with MySQL database engine which is really good news. Previously cheapest option  was Small Instance which was quite “expensive” with $0.105 USD for on hour (without reserved instances). Now we can use RDS with MySQL for $0.025 hourly! We can go even lower with reserved instances. Details about pricing are [available here](http://aws.amazon.com/rds/pricing/).

<!--more-->

I made small table, to see how much actually we needs to pay for instances based on prices per hour and particular pricing options :

|instance type (usage)|upfront payment|hourly|average monthly price (upfront + hourly usage)|
--- | --- | --- | --- |
|micro &#8211; pay as you go||   $0.050  | $35.60  
|micro (light)|$23|$0.016| $13.31 |
|micro (medium)|$54| $0.010| $11.62|
|micro (heavy)|$62|$0.008|$10.86|
|small &#8211; pay as you go||   $0.210|      $149.52|
|small (light)|$69|$0.053|$43.49|
|small (lmedium)|$160|$0.037|$39.68|
|small (heavy)|$195|$0.027|$35.47|

Don&#8217;t forget that prices are only about running instance, you need to add price for storage (min 5GB), traffic, and IO requestes.