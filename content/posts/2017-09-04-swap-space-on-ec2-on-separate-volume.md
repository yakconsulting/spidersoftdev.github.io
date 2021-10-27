---
title: SWAP space on EC2 on separate volume
author: admin
type: post
date: 2017-09-04T04:27:20+00:00
url: /2017/swap-space-on-ec2-on-separate-volume/
categories:
  - Linux
tags:
  - ami
  - aws
  - ec2
  - swap

---
It&#8217;s an extension of my previous article &#8211; how to create [SWAP on EC2 instance.](/2013/ec2-instance-and-swap-space/)

This time, we are going to create separate volume.

<!--more-->

We start with creating new Volume:

![EC2-Management-Console](/images/2017/09/EC2-Management-Console.jpg)

Make sure that your volume is in the same zone, as your instance:

![EC2-Management-Console-1](/images/2017/09/EC2-Management-Console-1.jpg)

Attach volume to your desired instance:

&nbsp;

![attach-volume](/images/2017/09/attach-volume.png)


After attaching &#8211; don&#8217;t forget to note Device &#8211; `/dev/sdf` in our case&#8230;

![attach-volume](/images/2017/09/attach-volume-1.png)

&nbsp;

Finally

&nbsp;

```
sudo mkswap -f /dev/sdf
Setting up swapspace version 1, size = 4194300 KiB
no label, UUID=0d446dc1-bd25-4a51-92e0-44d80a343fb5
```


`sudo swapon /dev/sdf`


```
lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  16G  0 disk
└─xvda1 202:1    0  16G  0 part /
xvdf    202:80   0   4G  0 disk [SWAP]
```


works as a charm&#8230;

```
free -m
             total       used       free     shared    buffers     cached
Mem:           993        657        336         20         53        277
-/+ buffers/cache:        325        668
Swap:         5119          0       5119
```


make it permanent:

```
nano /etc/fstab
/dev/sdf	swap	swap	defaults	0	0
```