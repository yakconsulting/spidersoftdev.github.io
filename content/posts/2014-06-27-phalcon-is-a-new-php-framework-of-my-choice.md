---
title: Phalcon is a new PHP Framework of my choice
author: admin
type: post
date: 2014-06-27T07:11:17+00:00
url: /2014/phalcon-is-a-new-php-framework-of-my-choice/
thumbnail: images/uploads/2014/06/High-performance-PHP-framework.jpg
dsq_thread_id:
  - 2798822317
categories:
  - Open Source
  - PHP
  - Web Development
tags:
  - phalcon
  - php

---
I’m working on multiple PHP based projects. Most of them using [CodeIgniter](http://ellislab.com/codeigniter) as a base framework. I mastered it into stage, where has no secrets for me. The problem is that I also know disadvantages of this bit outdated framework. Recently core [team announced](http://ellislab.com/blog/entry/ellislab-seeking-new-owner-for-codeigniter) that they are dropping future development so it means that CI is dead. Doesn’t mean that I don’t like it anymore. I just started looking for something new.

I like CI because I got control over everything. Modern PHP frameworks trying to solve all problems for you. It&#8217;s amazing, but lack of control is what you don&#8217;t need in when you developing projects. What do you need it&#8217;s this easy flow during development process. Full control over your MVC structure, but also a lot of &#8220;help&#8221; from framework itself.

<!--more-->

## How Phalcon is different the others

Phalcon is written as a PHP Extension &#8211; it means that it&#8217;s very fast, and&#8230; you need to have server or separate extension to run it. Forget about cheap shared hosting, look for custom good hosting or&#8230; spent couple dollars on EC2 instance.

## How Phalcon compares to CodeIgniter

Transition was quite easy. We have Controllers, Models and Views. The biggest difference is within build in features of Phalcon. Out of the box, we have beautiful ORM, template system, and plenty small features which makes your live so easy. I&#8217;m not going to talk about obvious features, but small goodies like template system. So easy to create and use layouts, or just to create  rest API.

You don’t any any extra libraries to do your “stuff”. With CI my basic stack was including some [CRUD](https://github.com/jamierumbelow/codeigniter-base-model), [Template](https://github.com/philsturgeon/codeigniter-template), [Auth](http://benedmunds.com/ion_auth/), [REST](https://github.com/philsturgeon/codeigniter-restserver) API librares. I end up with huge library of everything to handle basic project. In Phalcon it comes out of the box. CRUD is there, template engine is build in. Auth – well… yo have to create it by yourself, but you are getting nice REST client and server features straight away.

## What is annoying

For me it&#8217;s still learning curve, so i&#8217;m discovering each module step after step. So far lack of clear bootstraping structure is bit confusing. Paths & dependency injection &#8211; you can do this in so many ways, that it&#8217;s hard to chose one correct way on the beginning.
