---
title: powerDNS with SQLite backend as a slave for BIND
author: admin
type: post
date: 2016-08-21T07:01:15+00:00
url: /2016/powerdns-with-sqlite-backend-as-a-slave-for-bind/


dsq_thread_id:
  - 5575959728
categories:
  - DevOps
tags:
  - config
  - dns
  - pdns
  - sqlite3

---
(powerDNS)[https://www.powerdns.com] it&#8217;s a great alternative for huge and bulky BIND server. Light footprint, and quick setup made that server as my obvious choice for slave server for primary BIND server. So let&#8217;s config begins:

<!--more-->

Let&#8217;s download software first:  

`sudo yum install pdns-backend-sqlite`  

Then we have to pull schema which PDNS will use to store records:  

`wget https://raw.githubusercontent.com/PowerDNS/pdns/master/modules/gsqlite3backend/schema.sqlite3.sql`  

Let&#8217;s create some some sqlite database:

```SHELL
mkdir /var/db/pdns
sqlite3 /var/db/pdns/pdns.db
.read schema.sqlite3.sql
.quit
```

If we are setting up slave &#8211; we need tell who is supermaster:  

`sqlite3 /var/db/pdns/pdns.db 'insert into supermasters values ('x.x.x.x', 'ns1.domain.com', 'admin');'`

Let&#8217;s make sure that pdns.db is writeable:  

`chown -R pdns:pdns /var/db/pdns`

`pdns.conf` it&#8217;s also straight forward:

`nano /etc/pdns/pdns.conf`

```INI
setuid=pdns
setgid=pdns
launch=gsqlite3
gsqlite3-database=/var/db/pdns/pdns.db
```

finaly we can check if master allows us to make tranfer:

`dig @ns1.gex.pl spidersoft.com.au AXFR` 

On bind end config is super simple:

```
options {
    notify explicit;
    also-notify { x.x.x.x; y.y.y.y; };
    allow-notify { x.x.x.x; y.y.y.y; };
    allow-transfer { x.x.x.x; y.y.y.y; };
    ...
```