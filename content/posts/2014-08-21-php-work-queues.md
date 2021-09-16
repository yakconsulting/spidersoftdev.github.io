---
title: PHP, work queues
author: admin
type: post
date: 2014-08-21T04:30:27+00:00
url: /2014/php-work-queues/
thumbnail: images/2014/08/php-logo.png
dsq_thread_id:
  - 2945856372
categories:
  - PHP
tags:
  - php
  - samples

---
Biggest pain point in PHP is lack of asynchronous calls. The only reasonable way is to use some kind of &#8220;backend&#8221; processing and task list to execute. Some people use cron to run given script each n-minutes and execute tasks. But there is a little bit more &#8220;professional&#8221; approach. [Beanstalk][1] is a simple, fast work queue. Idea is pretty simple &#8211; you can just throw tasks into queue and then have background worker which is pulling data from pipe and executes task.

Couple ideas: sending emails, processing images, making heavy queries into database. But the best part of it &#8211; you don&#8217;t have to use PHP for back processing. It could be anything, because protocol us universal and worker and client doesn&#8217;t have to be in the same language. So you can schedule task in PHP, and run it in Go. I&#8217;m not going too much into details. Just run some examples.

<!--more-->

You can install it on probably any Linux instance just pulling from repositories: `yum install beanstalkd`. Don&#8217;t forget to check port 11300 if you are connecting remotely. You just call `telnet hostname 113000` &#8211; you can run simple command like `stats` to see if you got anything in queue.

For PHP Client i&#8217;m using [pheanstalk](https://github.com/pda/pheanstalk) which can be installed from composer.

Code sample for creating task in PHP

```
<?php
   require_once('./vendor/pda/pheanstalk/pheanstalk_init.php'); // use it if you don't have autolader
   $pheanstalk = new Pheanstalk_Pheanstalk('127.0.0.1');
   $pheanstalk->useTube('core')->put('task name');

```

And worker:

```
<?php   
  $pheanstalk = new Pheanstalk_Pheanstalk("127.0.0.1");

  while ($job = $pheanstalk->watch('core')->ignore('default')->reserve()) {
    $data = json_decode($job->getData(), true);
    $pheanstalk->delete($job);
  }
```

Most important thinks to now:

  1. Worker needs to be running all time, so that&#8217;s why is looped &#8211; so run it in [screen](http://linux.die.net/man/1/screen) or as a bg process on your server: `php worker.php &`
  2. Don&#8217;t forget to remove job when it&#8217;s finished.

 [1]: http://kr.github.io/beanstalkd/