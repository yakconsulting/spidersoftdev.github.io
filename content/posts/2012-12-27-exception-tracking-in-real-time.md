---
title: Exception tracking in real time
author: admin
type: post
date: 2012-12-27T01:26:38+00:00
url: /2012/exception-tracking-in-real-time/
thumbnail: images/uploads/2012/12/sentry.jpg
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
  - 1240274108
categories:
  - Open Source
  - Software

---
Everyone knows that Exception tracking, debugging and checking logs is pain in the ass. Especially when our APP works on multiple servers, or we have different environments, languages which are working as a part of big project. Recently I found exceptional tool created by [Disqus](http://disqus.com/) team called [Sentry](https://getsentry.com/signup/r_D1MT/). What is Sentry ?

<!--more-->

> Sentry is an event logging system which excels at handling application error reporting. It however, should not be seen as a replacement for standard logging, but a complimentary tool for your infrastructure.

So it’s a software which allows you track errors and logs from multiple sources in real time. It has really nice interface, and it’s open source – so you can install it on your own server, or use [hosted online version](https://getsentry.com/signup/r_D1MT/).