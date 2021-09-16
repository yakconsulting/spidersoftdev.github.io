---
title: How update Go library
author: admin
type: post
date: 2015-05-05T04:49:24+00:00
url: /2015/how-update-go-library/
thumbnail: images/2014/08/gopher.jpg
dsq_thread_id:
  - 3736974794
categories:
  - Technologies
  - Go Lang
tags:
  - go
  - update

---
Installation of go library is pretty simple:
`go get github.com/garyburd/redigo/redis`

From time to time, you want to get fresh version of it. If you run that command again it will NOT update the library &#8211; because it&#8217;s already there. To update it you need to use the `-u` switch:

`go get -u github.com/garyburd/redigo/redis`