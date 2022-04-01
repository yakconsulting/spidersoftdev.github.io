---
title: HTML5 Video tag, and webm
author: admin
type: post
date: 2019-01-14T10:58:34+00:00
url: /2019/html5-video-tag-and-webm/
thumbnail: images/2019/01/children-593313_1280.jpg
categories:
  - Technologies
  - Web Development
tags:
  - javascript
  - video

---
In ancient times, when youtube was born, we didn&#8217;t have a VIDEO tag. We used to have Flash. To play video on the website, we had to convert it to weird Flash video format, leave mp4 for safety and hope that everything would work fine. Later on, when HTML5 became an industry standard, our lives became much easier.

In theory, VIDEO tag solves all our issues. When the browser can handle webm (Chrome family) we play webm. If we deal with other browsers &#8211; mp4 should work for us. So let&#8217;s test our theory.

```HTML
<video controls="" id="video" width="960" height="720">
  <source src="video.mp4" id="mp4" type="video/mp4">
  <source src="video.webm" id="webm" type="video/webm">
 Your browser does not support the video tag.
</video>
```

Looks good. But if you run this code on Chrome browser, you can notice that the browser is still playing &#8220;mp4&#8221; instead of optimized webm. Why? Because browsers are dumb. They read source tags in order of appearance and chose first &#8220;playable&#8221; video format. So to correct this mistake, we need something like that:

```HTML
<video controls="" id="video" width="960" height="720">
  <source src="video.webm" id="webm" type="video/webm">
  <source src="video.mp4" id="mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
```

The second interesting case is when we are trying to manipulate video tag from the JavaScript level


```JAVASCRIPT
var video = document.getElementById('video');   
 
// load and play video
video.load();
video.play();
```

Without `video.load()` tag out video won&#8217;t recognize .webm file if it was created dynamically