---
title: VPN server on EC2 instance
author: admin
type: post
date: 2014-07-30T05:44:17+00:00
url: /2014/vpn-server-on-ec2-instance/
thumbnail: images/2014/07/Static-IP-VPN.png
dsq_thread_id:
  - 2884431315
categories:
  - Linux
  - Open Source
tags:
  - aws
  - ec2
  - vpn

---
The easiest way to setup VPN server on Amazon EC2 instance.

<!--more-->

We need pptpd deamon &#8211; [POPTOP](http://sourceforge.net/projects/poptop/) is our choice. Let&#8217;s pull it, and install:

```
wget http://poptop.sourceforge.net/yum/stable/rhel6/x86_64/pptpd-1.4.0-1.el6.x86_64.rpm
sudo yum localinstall pptpd-1.4.0-1.el6.x86_64.rpm
```


We have to setup IP pull to use for out VPN clients:

```
sudo nano /etc/pptpd.conf
localip 192.168.0.1
remoteip 192.168.0.234-238,192.168.0.2
```

Also, you have to comment out

`logwtmp`

line.

Also we have to enable DNS servers, we are going to use Google one &#8211; you are free to use any other open servers, or your provider DNS settings.

`sudo nano /etc/ppp/options.pptpd`

```
ms-dns    8.8.8.8
ms-dns    8.8.4.4
```

We need to setup users  
`sudo nano /etc/ppp/chap-secrets`

```
slav pptpd password *
```

obviously _slav_ is out username, and _password_ is our unique password

let&#8217;s enable ip forwarding:

`sudo nano /etc/sysctl.conf`

`net.ipv4.ip_forward = 1`

`sudo /sbin/sysctl -p`

And enable MASQUERADE in iptables

```
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

to make changes permanent we have to add this line to  
`sudo nano /etc/rc.local` file

Let&#8217;s start pptpd  
`sudo service pptpd start`  
and make changes permanent  
`chkconfig pptpd on`

Final step is to open ports on firewall:

!()[images/2014/07/rules.png]