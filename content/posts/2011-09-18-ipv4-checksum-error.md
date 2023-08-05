---
title: IPv4 Checksum error
author: admin
type: post
date: 2011-09-18T00:09:49+00:00
url: /2011/ipv4-checksum-error/
categories:
  - DevOps

---
One of my Linux boxes started to reporting unexpected

`jme 0000:02:00.5: eth1: IPv4 Checksum error`

on ethernet interface.

<!--more-->

I&#8217;m using recent drivers for my card:

```
lspci
Ethernet controller: JMicron Technology Corp. JMC250 PCI Express Gigabit Ethernet Controller (rev 03)
```

Because errors are not affecting anything besides dumping warnings I decided to disable checksum checking. How? It&#8217;s quite simple:  
First &#8211; check settings for eth1:

`ethtool --show-offload eth1`

Then disable it

`ethtool --offload eth1 rx off tx off`

Changes are not permanent &#8211; after box restart I&#8217;ll lose settings.