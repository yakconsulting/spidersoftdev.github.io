---
title: JSON objects in PHP
author: admin
type: post
date: 2016-07-25T15:05:22+00:00
url: /2016/json-objects-in-php/


dsq_thread_id:
  - 5584470432
categories:
  - Technologies
  - PHP
tags:
  - json
  - php

---
PHP is easy. You don&#8217;t have to know type of variable, before you use it. But sometimes it&#8217;s very problematic especially when we are dealing with JSON.

<!--more-->

Here is an example:

```JSON
{
  "page-size":50,
  "channel":"buy",
  "sort":{}, 
  "filters":{
    "surrounding-suburbs":true
  },
  "localities":[{
     "subdivision":"DO",
     "locality":"Unknown"}
]}
```

It&#8217;s a very odd combination of arrays and objects. To build this type of object we have to typecast some of the variables:

```
  $builder = [
            'page-size' => 50,
            'channel' => 'buy',
            'sort'  => (object)[],
            'filters' => (object)['surrounding-suburbs' => true],
            'localities' => [(object)['subdivision' => 'DO', 'locality' => 'Unknown']]
          ];

  print_r(json_encode($builder));
```