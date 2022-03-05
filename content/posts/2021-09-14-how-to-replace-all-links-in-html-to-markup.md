---
title: "How to replace all links in html to markup"
author: admin
type: post
date: 2021-09-03T13:06:00+00:00
url: /2021/how-to-replace-all-links-in-html-to-markup
thumbnail: /images/2021/09/replace.png
description: ""
categories:
  - Technologies
tags:
  - regexp
  - phpstorm
  - hugo
lead: "Regular expression to replace href to markup" 
---
I recently moved my blog from WordPress to [Hugo](https://gohugo.io), which involved a lot of content fixing. One of the problems was that not all HTML code was correctly transferred to markup during the export. So I needed fix (replace) all pending `<a href="https://spidersoft.com.au">spidersoft</a>` to `[spidersoft](https://spidersoft.com.au)`.

What we need are just two simple regular expressions. 

One to find links
`<a.*?href="(.+?)".*?>(.+?)</a>`

Second one to replace them in reverse order
`[$2]($1)`

You can run this in basically any IDE - [Sublime](https://www.sublimetext.com) will do the job, I was using PHPStorm

Same thing you can do with `<pre>` or embedded images.