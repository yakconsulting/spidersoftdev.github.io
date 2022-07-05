---
title: How to choose the right technology for your next project
lead: what is the best stack for your next project
description: "How to choose technology stack for your web project. Thoughts and consideration about correct stack."
author: admin
type: post
date: 2017-03-31T06:41:56+00:00
url: /2017/how-to-choose-the-right-technology-for-your-next-project/
dsq_thread_id:
  - 5682740464
categories:
  - Technologies
  - Blog
tags:
  - golang
  - php
  - mysql

---
People quite often asking me about *technology stack*, and where to go with next big project. The answer isn&#8217;t simple &#8211; it depends. Usually, we have couple components which are critical for the whole system. If we are talking about a web-based solution or any API we have to decide about DATABASE, then we have STORAGE, moving on &#8211; some BACKEND service language.

<!--more-->

## Database

As for today, database choice is pretty straightforward – either SQL or NoSQL. If you go with SQL – definitely [MySQL](https://www.mysql.com/) or something coming from this family [MariaDB](https://mariadb.org/), [MemSQL](http://www.memsql.com/). Why ? Because is well known, and you can quickly scale it out. Just by adding another instance, read replica and so on. Community support is massive so you can get help or instructions without any problems. Also – all cloud providers offer their solutions; you have [Amazon RDS](https://aws.amazon.com/rds/), [Google Cloud SQL](https://cloud.google.com/appengine/docs/go/cloud-sql/) – so… whatever you like.

If you go with NoSQL – I have no idea what to advise. So many options. Personally, don’t have any positive experience with MongoDB so I would recommend some cloud-hosted solution – pretty good list available here: [NoSQL Wikipedia](https://en.wikipedia.org/wiki/NoSQL). For smaller deployments, I recommend  [TieDot](https://github.com/HouzuoGuo/tiedot) it works pretty well.

## Storage

Time, when we kept our data directly on the server, are far gone. Right now we have [Amazon S3](https://aws.amazon.com/s3/), [Cloud Storage](https://cloud.google.com/storage/), [B2 Cloud Storage](https://www.backblaze.com/b2/cloud-storage.html) or even [Azure Storage](https://azure.microsoft.com/en-us/services/storage/); the answer is simple – don’t keep your data on the server. Always use some kind of storage, ideally setup 2 of them with replication with different providers (i.e., S3 as a primary and Cloud Storage as a second one)

## Programming Language

Just wondering how many people would hate me if I say go with [PHP](http://php.net/). But it’s 2017 – and yes, that’s why you should go with PHP 7. It’s fast enough with deployment, plenty of good devs, great support. It’s easy and cheap to scale (just drop more servers, or faster).

The only way to use PHP – you have to build it, smartly – make [small services](https://en.wikipedia.org/wiki/Microservices) which are working independently. So when the time comes (you reach your 10k, 100k, 1m of users) you can replace some of them with [GoLang](https://golang.org/).

## What about the frontend ?

Should we use any frontend framework or just play with vanilla JavaScript and HTML5. The answer depends on scope of the project. If you are prototyping to validate idea, you don't have to go full [React](https://reactjs.org) or [VueJS](https://vuejs.org) - you can start simple with pure JavaScript and decide if you're really looking for more, or something is missing.

What I&#8217;m trying to say &#8211; build and deploy fast &#8211; and iterate often.

You like what you see? Leave a comment, and I will elaborate more.