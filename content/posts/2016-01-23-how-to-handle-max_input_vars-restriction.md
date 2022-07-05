---
title: How to handle max_input_vars restriction.
author: admin
type: post
date: 2016-01-22T20:47:04+00:00
url: /2016/how-to-handle-max_input_vars-restriction/


dsq_thread_id:
  - 4520503191
categories:
  - Technologies
  - PHP
tags:
  - javascript
  - php.ini
  - server-side

---
From time to time we could breach [max_input_vars][1] restriction. Which basically limitation for server which allows only limited number of input server to reach out server. Usually this number is around 1000. In this short tutorial I will describe, how to easily avoid this problem.

<!--more-->

Recently I had a project, when i was sending super long list of small numbers, and by default list was coming from the form &#8211; it was named order[] and had numeric values. Obviously server was getting error. Because server admin wasn&#8217;t present at the moment i figure out to find some kind of workaround. The easiest way to pass this restriction is just limit array size, to something reasonable.

Here was my buggy code:

```JAVASCRIPT
var order = $(this).sortable("serialize");
   $.post("admin/sort", {order: order}, function(theResponse){
      ...
   });
}
```

Aa you can tell, I was passing data coming from [jQuery UI Sortable Widget](https://api.jqueryui.com/sortable/#method-serialize). Issue there was that data was already serialised. I wanted it as an array… I found [this nice function](https://gist.github.com/slav123/00dd17fa4b44592d0c1f) to deserialise my array, and then I needed to join it to regular string, so I could send it via POST:


```JS
var order = $(this).sortable("serialize");
var s = $.unserialize(order); 
order = s["r[]"].join();
```

On the server side task wasn&#8217;t to complicated &#8211; instead of processing array coming from `$my_arr = $_POST['order']` I had to explode it first `$my_arr = explode(',', $_POST['order']);`

And that solved my issue with [max_input_vars][1] restriction.

 [1]: http://php.net/manual/en/info.configuration.php#ini.max-input-vars