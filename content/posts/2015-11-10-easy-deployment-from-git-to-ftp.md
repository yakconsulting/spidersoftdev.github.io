---
title: Easy deployment from GIT to FTP
author: admin
type: post
date: 2015-11-10T13:17:00+00:00
url: /2015/easy-deployment-from-git-to-ftp/


dsq_thread_id:
  - 4306184642
categories:
  - Continuous Integration
tags:
  - ci
  - ftp
  - git

---
I&#8217;m huge fan of Continuous Integration and all possible automation which can save me any time during development process. I&#8217;m using plenty of different tools in my daily work, but there is always place for something new.

Basically each decent IDE has FTP client build in, but sometimes you don&#8217;t have access to your IDE but obviously you got your code in GIT repository. If you are using [Bitbucket](https://bitbucket.org) or [Github](https://github.com) you are lucky &#8211; you can use [FTPloy](https://github.com/rasshofer/ftploy) . It&#8217;s super simple service, which gives you option to bind your repository with FTP server. After change is made &#8211; it deploys your files on the server. Nothing more, nothing less.