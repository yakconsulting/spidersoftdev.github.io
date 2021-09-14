---
title: How to manage logs
author: admin
type: post
date: 2014-08-28T10:16:31+00:00
url: /2014/how-to-manage-logs/
thumbnail: images/uploads/2014/08/logs.png
dsq_thread_id:
  - 2968273405
categories:
  - Continuous Integration
  - Open Source

---
Capturing and storing longs it&#8217;s bit painful task. It&#8217;s not so bad if you are running one application on one server, but if you go with multiple servers, or just don&#8217;t want to &#8220;login&#8221; to check logs &#8211; you have to go with remote logging tools. I know only 2 and didn&#8217;t look for more. First of them is tool called [Sentry](https://getsentry.com/signup/r_D1MT/) second one is [LogEntries](https://logentries.com/).

<!--more-->

## Sentry

Got very good experience with [Sentry](https://getsentry.com/signup/r_D1MT/) &#8211; it&#8217;s very simple, got clients written in Java, JavaScript, Node.js, PHP, Python and  Ruby. Efficiency is very good &#8211; i tested with production in multiple occasions. Interace is nice and clean, you can track your logs, mark them as.

[<img loading="lazy" class="size-medium wp-image-1193" src="http://www.spidersoft.com.au/wp-content/uploads/2014/08/group_list-453x420.png" alt="group_list" width="453" height="420" srcset="https://www.spidersoft.com.au/wp-content/uploads/2014/08/group_list-453x420.png 453w,images/uploads/2014/08/group_list-259x240.png 259w,images/uploads/2014/08/group_list-1024x947.png 1024w,images/uploads/2014/08/group_list.png 1100w" sizes="(max-width: 453px) 100vw, 453px" />][1]

But the best part of it &#8211; you can install it on your own platform, because they have [Open Source Sentry](https://github.com/getsentry/sentry) version. It&#8217;s written in Python &#8211; installation is not very complex. Hosted version is better, and you don&#8217;t have to worried about traffic. Pricing is reasonable starting from $9.

## LogEntries

It&#8217;s a bit more advanced service &#8211; allows you analyse also static data / log entries coming from operating system and demons itself. Obviously we have also libraries for popular languages like  JavaScript, PHP, Ruby or even golang. I installed this service on one of my projects, and will see how it goes.

<img loading="lazy" class="size-medium wp-image-1194" src="http://www.spidersoft.com.au/wp-content/uploads/2014/08/logentries-560x321.jpg" alt="logentries" width="560" height="321" srcset="https://www.spidersoft.com.au/wp-content/uploads/2014/08/logentries-560x321.jpg 560w,images/uploads/2014/08/logentries-320x183.jpg 320w,images/uploads/2014/08/logentries-1024x587.jpg 1024w" sizes="(max-width: 560px) 100vw, 560px" /> 

&nbsp;

 [1]: https://getsentry.com/signup/r_D1MT/