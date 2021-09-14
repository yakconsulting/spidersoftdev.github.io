---
title: "How to replace all links in html to markup"
author: admin
type: post
date: 2021-09-03T13:06:00+00:00
url: /2021/how-to-replace-all-links-in-html-to-markup
thumbnail: /images/uploads/2021/09/replace.png
description: ""
categories:
  - Technologies
tags:
  - regexp
  - phpstorm
lead: "Regular expression to replace href to markup" 
---
Recently I moved my blog from Wordpress to Hugo, and that involved a lot of content fixing. One of the problems was that during the export not all HTML code was correctly transferred to markup. So I needed fix (replace) all pending `[aaa](http://)` to `[aaa](http://)`.

What we need is just 2 simple regular expressions. 

One to find links
```[(.+?)]((.+?))```

Second one to replace them in reverse order
```[$2]($1)```

You can run this in basically any IDE - [Sublime](https://www.sublimetext.com) will do the job, I was using PHPStorm
