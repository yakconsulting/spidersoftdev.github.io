---
title: Facebook Page TAB mobile redirection problem
author: admin
type: post
date: 2013-03-06T08:16:21+00:00
url: /2013/facebook-page-tab-mobile-redirection-problem/
dsq_thread_id:
  - 1158855353
categories:
  - Software
  - Web Development
tags:
  - facebook

---
Yes… we have ongoing problem with that really simple function. So – what’s happening. Let’s assume that we have really simple Page Tab existing inside out Facebook Page. URL usually looks like that: [http://www.facebook.com/spidersoftau/app_334933569956732](http://www.facebook.com/spidersoftau/app_334933569956732) – works perfectly on Desktop browser, but if you would like to open this on mobile, you will get nasty error  

<!--more-->

!["facebook-mobile-error"](images/2013/03/facebook-mobile-error.png)

`&#8220;The page you requested was not found.&#8221;`

If there is any workaround? Yes it is! Couple of them. One of them is to use vanity URL’s for sharing, which is kind of workaround. But, second one is also tricky. Instead of using URL showed above you can use something a little bit different: [http://www.facebook.com/spidersoftau?sk=app\_334933569956732&ref=ts](http://www.facebook.com/spidersoftau?sk=app_334933569956732&ref=ts) which is basically running Desktop version of you Page TAB, but in the mobile. So – what next?
 
You can actually leave the frame using a piece of JavaScript inside `head` section of your HTML page:

```javascript
  isInIFrame = (window.location != window.parent.location) ? true : false;
    if (isInIFrame)
      {
        window.top.location = 'http://spidersoft.com.au/facebook';
      }

```

Where `http://spidersoft.com.au/facebook` it&#8217;s a mobile friendly version of your tab.