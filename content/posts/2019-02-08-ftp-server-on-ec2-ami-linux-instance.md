---
title: FTP server on EC2 Ami Linux instance
author: admin
type: post
date: 2019-02-08T11:11:41+00:00
url: /2019/ftp-server-on-ec2-ami-linux-instance/
categories:
  - Linux
tags:
  - ami
  - ec2
  - ftp
  - linux

---
People say that FTP is dead. But not everyone knows or can use SFTP, SSH whatever to update their website. Sometimes you just need something as simple as good old FTP server on your instance. Let&#8217;s do it.

<!--more-->

```
yum install pure-ftpd
nano /etc/pure-ftpd/pure-ftpd.conf
```

We are going to use build in user management tools for our server. Using MySQL as a database is also super easy. Some changes are required in config file:

```
PureDB            /etc/pure-ftpd/pureftpd.pdb
PassivePortRange  30000 50000
ForcePassiveIP    public_ip
```

To add user into &#8220;virtual&#8221; database you have to use similar tool to regular pw command in Linux  


```
pure-pw useradd slav -u caddy -d /var/www/html/
pure-pw mkdb
```

And run server:

`/usr/sbin/pure-config.pl /etc/pure-ftpd/pure-ftpd.conf`

Couple usefull tricks can be [found here](https://help.ubuntu.com/community/PureFTP)