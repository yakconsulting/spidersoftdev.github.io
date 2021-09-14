---
title: Phalcon cheat sheet
author: admin
type: page
date: 2014-06-27T02:02:41+00:00

---
## Disable view

`$this->view->disable();`

## Change main view

 `$this->view->setMainView('public');`

## Set headears

`$this->response->setContentType('text/plain')->sendHeaders();`

&nbsp;

## Links to documentation

[Registering Router instance](http://docs.phalconphp.com/en/latest/reference/routing.html#registering-router-instance)

## 404 on Micro application

```
$app->notFound(
    function () use ($app) {
        $app->response->setStatusCode(404, "Not Found")->sendHeaders();
        echo 'This is crazy, but this page was not found!';
    }
);
```