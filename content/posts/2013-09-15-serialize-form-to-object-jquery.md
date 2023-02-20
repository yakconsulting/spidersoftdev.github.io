---
title: Serialize form to object – jQuery
author: admin
type: post
date: 2013-09-15T11:35:24+00:00
url: /2013/serialize-form-to-object-jquery/
thumbnail: images/2013/09/jquery-mark-light.gif
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
post_image:
  - http://www.spidersoft.com.au/wp-content/uploads/2013/09/jquery-mark-light.gif
dsq_thread_id:
  - 1762562582
categories:
  - JavaScript
tags:
  - javascript
  - jquery
  - plugin

---
It&#8217;s pretty easy to serialise form using jQuery &#8211;

```
$('#formid').serialize();
```

or by

```
$('#formid').serializeArray();
```

But neither of them it&#8217;s easy to modify. Really useful snippet &#8211; serialise form to object.

<!--more-->

    View the code on [Gist](https://gist.github.com/6569966).
{{< gist slav123 e0221bd97fc904434f76 >}}

