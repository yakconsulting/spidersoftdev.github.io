---
title: MySQL on Mac OS X with preference panel
author: slav
type: post
date: 2010-12-22T10:06:56+00:00
url: /2010/mysql-on-mac-os-x-with-preference-panel/
thumbnail: images/2010/12/mysql_logo.jpg
aktt_notify_twitter:
  - no
dsq_thread_id:
  - 1164084722
categories:
  - Blog
tags:
  - mysql
  - tips

---
In my daily work I really suffered because MySQL wasn&#8217;t work after fresh installation. Preference panel just didn&#8217;t start MySQL on system startup neither using it into Preferences.  
After a lot of google research I found many solutions but only [Angry Fly](http://www.angry-fly.com/post.cfm/getting-mysql-preference-pane-to-work-in-leopard) gives me some clues how to find proper fix.

<!--more-->

## Solution

Is quite simple 🙂 You need to go to the:  
`cd /usr/local/mysql/support-file`  
then  
using nano edit this beautiful file:  
`sudo nano mysql.server`  
find the line with  
`basedir`
and modify to
`basedir=/usr/local/mysql`  
Then save it, and... MySQL preference panel is working!

![MySQL preference panel](images/2010/12/mysql-preference-pane.png)