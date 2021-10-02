---
title: iframe won’t display content..
author: admin
type: post
date: 2018-11-29T09:40:18+00:00
url: /2018/iframe-wont-display-content/
categories:
  - Programming


---
There is a website, with iframe. I frame source is correct, but won&#8217;t display content of the website. No visible errors. There only small detail in the console:

`Load denied by X-Frame-Options: https://... does not permit cross-origin framing. `

Some crazy admin figure out that it&#8217;s going to be better&#8230; and put some crazy code into headers:

`X-Frame-Options: SAMEORIGINX-XSS-Protection: 1; mode=blockX-Content-Type-Options: nosniff`

Solution: talk to the hand, because admin won&#8217;t listen ;P