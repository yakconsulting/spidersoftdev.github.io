---
title: PHP returning wrong date
author: admin
type: post
date: 2019-01-07T10:56:37+00:00
url: /2019/php-returning-wrong-date/
thumbnail: images/2019/01/stress-2883648_1280.jpg
categories:
  - Technologies
  - PHP
tags:
  - date
  - php

---
From time to time we are working on small campaigns, where competition starts at given time. Because in Australia we have &#8220;so many&#8221; timezones, it&#8217;s critical to set things correctly according to the time zone. 

<!--more-->

So first thing first, let&#8217;s check a server time zone:

```shell
date
Wed Dec 12 18:46:11 AEDT 2018
```

Unfortunately, PHP turns something completely different:


```PHP
$today = date('YmdHi');
var_dump($today);
string(12) "201812120746"
```

The date is a little bit offset. After digging out, PHP also needs timezone setup correctly, either in `php.ini`:

`date.timezone =`

Or using:

`date_default_timezone_set('UTC');`