---
title: node.js run with root privileges on MacOS on start
author: slav
type: post
date: 2014-01-16T08:37:58+00:00
url: /2014/node-js-run-with-root-privileges-on-macos-on-start/
thumbnail: images/2013/07/node-logo.png
layout:
  - default
hide_post_title:
  - default
unlink_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
unlink_post_image:
  - default
dsq_thread_id:
  - 2129194079
categories:
  - JavaScript
tags:
  - javascript
  - mac os
  - nodejs
  - server

---
How long it&#8217;s quite easy to setup init.d services on linux boxes, same task on Max OS machines is pretty hard. Especially if you need to run it with root privileges.

<!--more-->

Create file

```
/Library/LaunchDaemons/com.spidersoft.cms.plist
```

Content of this file should be like that:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>KeepAlive</key>
<dict>
<key>SuccessfulExit</key>
<false/>
</dict>
<key>OnDemand</key>
<false/>
<key>Label</key>
<string>com.imagination.cms</string>
<key>ProgramArguments</key>
<array>
<string>/usr/local/bin/node</string>
<string>/usr/local/bin/forever</string>
<string>-a</string>
<string>-l</string>
<string>/Users/admin/Documents/cms/app.log</string>
<string>-e</string>
<string>/Users/admin/Documents/cms/app_error.log</string>
<string>/Users/admin/Documents/cms/app.js</string>
</array>
<key>RunAtLoad</key>
<true/>
<key>UserName</key>
<string>root</string>
</dict>
</plist>
```