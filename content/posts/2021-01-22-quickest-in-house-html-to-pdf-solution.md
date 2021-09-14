---
title: Quickest in-house HTML to PDF solution
author: admin
type: post
date: 2021-01-22T12:44:18+00:00
url: /2021/quickest-in-house-html-to-pdf-solution/
categories:
  - Go Lang
tags:
  - golang
  - headless
  - pdf

---

You can find some online API&#8217;s use free tier to test them, but&#8230; you can make it your own. So without any further intruction here is a reciepe.
<!--more-->
Run headless chrome on your Mac:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --remote-debugging-port=9222 \
  --disable-gpu \
  --disable-translate \
  --disable-extensions \
  --disable-background-networking \
  --safebrowsing-disable-auto-update \
  --disable-sync \
  --disable-default-apps \
  --hide-scrollbars
  --metrics-recording-only \
  --mute-audio \
  --no-first-ru
  ```

Go get this library [cdp](https://github.com/mafredri/cdp) and run attached example. Done 🙂