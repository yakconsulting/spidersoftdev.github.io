---
title: unrar on AMU Linux / CentOS boxes
author: admin
type: post
date: 2014-10-13T03:44:37+00:00
url: /2014/unrar-on-amu-linux-centos-boxes/
thumbnail: images/2014/10/rar-linux.png
dsq_thread_id:
  - 3116547913
categories:
  - Linux

---
From time to time you have to decompress .rar archives on your Linux. It&#8217;s pretty easy. Just download proper RPM package from [repoforge repository][1]. In my case it was

```
wget http://pkgs.repoforge.org/unrar/unrar-5.0.3-1.el6.rf.x86_64.rpm
sudo rpm -Uvh unrar-5.0.3-1.el6.rf.x86_64.rpm 
```

Done. To extract archive just use 

`unrar x yourfile.rar`

 [1]: http://pkgs.repoforge.org/unrar/