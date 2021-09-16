---
title: Riot.js – nice React alternative
author: admin
type: post
date: 2015-03-06T05:46:55+00:00
url: /2015/riot-js-nice-react-alternative/
thumbnail: images/2015/03/riotjs.jpg
dsq_thread_id:
  - 3579277210
categories:
  - JavaScript
  - Open Source
tags:
  - alternatives
  - javascript
  - riot

---
Recently I’m looking for easier versions of popular libraries. There is a lot of buzz around Facebook [React.js](http://facebook.github.io/react/) library, but i found it not especially user / developer friendly – at least at first glitch. Obviously some people says that it’s not so complicated, but… there is something super simple and super light – [Riot.js](https://muut.com/riotjs/).

<!--more-->

Advertised as A REACT- LIKE, 3.5 KB USER INTERFACE LIBRARY &#8211; i&#8217;ve been using it so far only for routing (it&#8217;s small, it&#8217;s nice and fast) but looks like a good candidate for more serious actions. Obviously it&#8217;s very modular, it has observable, custom tags, mentioned earlier router. Looks pretty straight forward, especially with examples like that:

&nbsp;

```
// Login API
var auth \= riot.observable()

auth.login \= function(params) {
  $.get('/api', params, function(json) {
    auth.trigger('login', json)
  })
}

 <login\>
  <form onsubmit\="{ login }"\>
    <input name\="username" type\="text" placeholder\="username"\>
    <input name\="password" type\="password" placeholder\="password"\>
  form\>

  login() {
    opts.login({
      username: this.username.value,
      password: this.password.value
    })
  }

 // any tag on the system can listen to login event
  opts.on('login', function() {
    $(body).addClass('logged')
  })
login\>
```