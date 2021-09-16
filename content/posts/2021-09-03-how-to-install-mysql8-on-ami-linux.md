---
title: "How to upgrade MySQL on old Linux AMI"
author: admin
type: post
date: 2021-09-03T10:35:00+00:00
url: /2021/how-to-install-mysql8-on-ami-linux
description: "Example article description"
categories:
  - "Linux"
tags:
  - "ami"
  - "linux"
  - "mysql"
lead: "Upgrading old Linux AMI with MySQL 8" 
thumbnail: images/2021/08/mysql-logo.png
---
I have really "old" AMI Linux instances, and I need to go with more recent MySQL versions. 

<!--more-->

```
cat /etc/os-release
NAME="Amazon Linux AMI"
VERSION="2018.03"
ID="amzn"
ID_LIKE="rhel fedora"
VERSION_ID="2018.03"
PRETTY_NAME="Amazon Linux AMI 2018.03"
ANSI_COLOR="0;33"
CPE_NAME="cpe:/o:amazon:linux:2018.03:ga"
HOME_URL="http://aws.amazon.com/amazon-linux-ami/"
```

What we need is a new fresh source for MySQL

`yum install https://dev.mysql.com/get/mysql80-community-release-el6-3.noarch.rpm`

`yum update`

Just remember, that if you are upgrading from MySQL prior 5.7 it will not go smoothly :) It's better to do the backup via `mysqldump` and reimport it again.