---
title: Twitter Bootstrap typeahead and ajax
author: admin
type: post
date: 2012-09-12T09:16:53+00:00
url: /2012/twitter-bootstrap-typeahead-and-ajax/
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
  - 1160062837
categories:
  - JavaScript
  - Web Development
tags:
  - twitter bootstrap

---
[Typeahead](http://twitter.github.com/bootstrap/javascript.html#typeahead) is a basic, easily extended plugin for quickly creating elegant typeaheads with any form text input. Working with Twitter Bootstrap. Multiple options, are not explained in details on project website. So&#8230; Quick example of usage


```
$('.typeahead').typeahead({
    source: function (query, process) {
        return $.get('/typeahead', { query: query }, function (data) {
            return process(data);
        });
    }
});
```