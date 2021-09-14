---
title: AngularJS awesome JavaScript framework
author: admin
type: post
date: 2012-07-08T11:27:19+00:00
url: /2012/angularjs-awesome-javascript-framework/
thumbnail: images/uploads/2012/07/angularjs.png
dsq_thread_id:
  - 1162016228
categories:
  - JavaScript
  - Open Source
  - Web Development
tags:
  - framework
  - javascript

---
I was looking for easy and nice solution to maintain my growing JavaScript. I tried [Backbone.js][1] which is my opinion a little bit &#8220;to&#8221; complicated. Of course &#8211; you can do everything, but.. it was to much hassle with coding in details. Second approach was to [KnockoutJS][2] &#8211; this one is really nice but from the other hand &#8211; I didn&#8217;t have much on control on my code and details, but everything was really nice and sleek. So&#8230; Quite similar like with choosing PHP Framework. I wanted something which will do some job for me, but I also wanted to have control on everything. That&#8217;s why I chose CodeIgniter which was perfect for me. But&#8230; with JavaScript &#8211; Finally i funded: [AngularJS](http://angularjs.org/). Made by Google engineers &#8211; but super nice and sleek.

<!--more-->

So&#8230; really simple working example:

I wanted to create proportion calculator:

```
<input class="input-mini" type="number" name="x" /> x
<input class="input-mini" type="number" name="y" />

<input class="input-mini" type="number" name="rx" /> x
<input class="input-mini" type="number" name="ry" />
```


and javascript


```
function Controller($scope) {

   $scope.change = function(what) {
      if (what == 1){
	 $scope.prop.ry = $scope.prop.rx * $scope.prop.y / $scope.prop.x;
      } else {
	 $scope.prop.rx = $scope.prop.ry * $scope.prop.x / $scope.prop.y;
      }
   };
}
```


Check [on-line demo](http://jsfiddle.net/slav123/beDRU/).

 [1]: http://www.spidersoft.com.au/2012/collection-of-backbone-js-tutorials/ "Collection of Backbone.js tutorials"
 [2]: http://www.spidersoft.com.au/2012/collection-of-knockout-js-tutorials/ "Collection of Knockout.js tutorials"