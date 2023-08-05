---
title: Posftix Permission denied problem
author: admin
type: post
date: 2011-08-23T02:18:47+00:00
url: /2011/posftix-permission-denied-problem/
thumbnail: images/2011/08/logo-postfix.png
categories:
  - DevOps
tags:
  - configuration
  - DevOps
  - tips

---
Recently I stuck with WordPress installation which was unable to send emails using build in `wp_mail` function.

After investigation `tail -f /var/log/messages` I founded a pleasant line of code with really nice explanation:

`sendmail: fatal: chdir /var/spool/postfix: Permission denied`

In theory this should be a problem for sysadmin, but &#8211; I wanted to find faster solution.

After short adventure with Google I found a clue:

`/usr/sbin/getsebool httpd_can_sendmail`

My result was obvious:

`httpd_can_sendmail --> off`

Problem was solved by

`setsebool httpd_can_sendmail 1`

Permanent solution is possible via

`setsebool -P httpd_can_sendmail 1`

And don&#8217;t forget that I&#8217;m working on: `CentOS Linux release 6.0 (Final)`

