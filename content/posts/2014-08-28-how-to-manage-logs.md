---
title: How to manage logs
author: admin
type: post
date: 2014-08-28T10:16:31+00:00
url: /2014/how-to-manage-logs/
thumbnail: images/2014/08/logs.png
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

![Sentry](/images/2014/08/group_list.png)

But the best part of it &#8211; you can install it on your own platform, because they have [Open Source Sentry](https://github.com/getsentry/sentry) version. It&#8217;s written in Python &#8211; installation is not very complex. Hosted version is better, and you don&#8217;t have to worried about traffic. Pricing is reasonable starting from $9.

## LogEntries

It&#8217;s a bit more advanced service &#8211; allows you analyse also static data / log entries coming from operating system and demons itself. Obviously we have also libraries for popular languages like  JavaScript, PHP, Ruby or even golang. I installed this service on one of my projects, and will see how it goes.

![Log Entries](/images/2014/08/logentries.jpg) 

&nbsp;

 [1]: https://getsentry.com/signup/r_D1MT/