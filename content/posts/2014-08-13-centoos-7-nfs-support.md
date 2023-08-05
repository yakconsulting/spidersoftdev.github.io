---
title: CentoOS 7 NFS support
author: admin
type: post
date: 2014-08-13T06:45:44+00:00
url: /2014/centoos-7-nfs-support/
thumbnail: images/2014/08/centos-org-new-website.png
dsq_thread_id:
  - 2923079213
categories:
  - DevOps
tags:
  - centos
  - DevOps

---
CentOS is pretty new, and some default stuff is just missing. Like NFS suport out of the box.

We have to install package called `nfs-utils`

```
yum -y install nfs-utils
```

we can mount using standard `mount 192.168.1.15:/c/share`

```
mount -a 
```

to make it parmament

edit `/etc/fstab`

```
192.168.1.15:/c/share /mnt/nfs nfs defaults 0 0
```