---
title: Phalcon – super simple REST API example
author: admin
type: post
date: 2014-07-10T04:24:38+00:00
url: /2014/phalcon-simple-rest-api-example/
thumbnail: images/2014/06/High-performance-PHP-framework.jpg
dsq_thread_id:
  - 2831572619
categories:
  - Open Source
  - PHP
  - Software
tags:
  - api
  - phalcon
  - php
  - rest

---
Throughout this first tutorial, i’ll walk you through the creation of an application with a simple REST API from the ground up. I assume you have [Phalcon][1]. installed already.

<!--more-->

We start with basic setup described here: [Micro][2] &#8211; what we need it&#8217;s only couple lines of code:

```
$app = new Phalcon\Mvc\Micro();
  $app->get('/say/welcome/{name}', function ($name) {
    echo "Welcome $name!";
  });
  $app->handle();
```


Code is pretty clear &#8211; we are creating new instance of Micro Application, and capturing routes directed to &#8216;/say/welcome/&#8230;&#8217; where after welcome you can pass some parameters.

What about proper responses ? What if we would like to spit out JSON or custom headers ?

we need [Response][3] object.

```
$response = new Phalcon\Http\Response();
$response->setStatusCode(200, "OK");
$response->setContent("Hello");
$response->send();
```

Let&#8217;s do this in proper way &#8211; using [Dependency Management][4].

```
use Phalcon\DI\FactoryDefault,
      Phalcon\Mvc\Micro,
      Phalcon\Http\Response,
      Phalcon\Http\Request;

  $di = new FactoryDefault();

  //Using an anonymous function, the instance will be lazy loaded
  $di["response"] = function () {
    return new Response();
  };

  $di["request"] = function() {
    return new Request();
  };

  $app = new Micro();

  $app->setDI($di);

  $app->get('/api', function () use ($app) {
    echo "Welcome";
  });

  $app->post('/api', function() use ($app) {
    $post = $app->request->getPost();
    print_r($post);
  });

  app->handle();
```


Easy &#8211; isn&#8217;t it ?

The last missing part of our puzzle is 404 handling. Because right now we can check out only one url /api.

Let&#8217;s add

```
$app->notFound(
    function () use ($app) {
        $app->response->setStatusCode(404, "Not Found")->sendHeaders();
        echo 'This is crazy, but this page was not found!';
    }
);
```

Just before `$app->handle();`

You can check this [out here](https://github.com/slav123/phalcon-examples/blob/master/simple.php)

next time &#8211; we are going to extend out app with models.

 [1]: http://phalconphp.com/en/
 [2]: http://docs.phalconphp.com/en/latest/reference/micro.html
 [3]: http://docs.phalconphp.com/en/latest/api/Phalcon_Http_Response.html
 [4]: http://docs.phalconphp.com/en/latest/reference/tutorial.html#dependency-management