---
title: SSH and SFTP tunnels via ProxyCommand
author: admin
type: post
date: 2015-05-21T00:36:50+00:00
url: /2015/ssh-and-sftp-tunnels-via-proxycommand/
dsq_thread_id:
  - 3781061812
categories:
  - Linux
tags: 
  - ssh

---
Recently on [CyberCity][1] nice article appeared about using middle server to connect to our destination servers. Most of servers have firewalls which  allow connect only from given pool of IP addresses. So tunnelling is very useful as long we are using it in smart way.

<!--more-->Quick round up of vivek&#8217;s article

## SFTP connection with ProxyCommand

`sftp -o 'ProxyCommand=/usr/bin/ssh username@middle.server.com -p 66 /usr/bin/nc %h %p %r' username@destination.server.com`

Just be awere that we are not using standard SSH 22 port &#8211; it&#8217;s 66

##  SSH tunnel with ProxyCommand

`nano ~/.ssh/config`

```
Host nickname
HostName destination.server.com
User username
ProxyCommand /usr/bin/ssh username@middle.server.com -p 66 /usr/bin/nc %h %p %r
```


to connect you just type `ssh nickname`

 [1]: http://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/