---
title: How to install latest golang on EC2
author: admin
type: post
date: 2015-10-15T11:41:54+00:00
url: /2015/how-to-install-latest-golang-on-ec2/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
dsq_thread_id:
  - 4239111981
categories:
  - Go Lang
tags:
  - aws
  - ec2
  - go
  - golang

---
If you are looking for simple way to upgrade yourt golang installation on EC2, you can experience error like that:  

```
Error: Package: golang-bin-1.5.1-0.el6.x86_64 (epel)
Requires: go = 1.5.1-0.el6
Installing: golang-1.4.2-3.19.amzn1.x86_64 (amzn-main)
```

Because on amzn-main repo, there is an older version of golang &#8211; on epel, there is a newer. Nothing simplier just disable for a momement amzn-main repo, and install golang compeltly from epel.

`sudo yum --disablerepo=amzn-main --enablerepo=epel install golang-bin`