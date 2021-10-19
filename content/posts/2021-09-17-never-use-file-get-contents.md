---
title: Never use file_get_contents to make URL queries
author: admin
type: post
date: 2021-09-17T11:16:00+00:00
url: /2021/never-use-file-get-contents
lead: Why you should nt ever use file_get_contents
categories:
  - Technologies
  - PHP
tags:
  - curl
---
As each programmer by nature I'm lazy. I try to accomplish as much as possible in minimum effort. 

So whenever I use PHP to fetch something I'm using `file_get_contents` to make queries, and pull data from other services. So basically my favourite snippet is this guy here:

<!--more-->

{{< gist slav123 4e3a6c2f671cf0c2960a >}}

## Problem
It's not to bad - the only issue is error handling, if something goes wrong - it's really hard to know what is happening. Obviously you can do something like this:

```
  $result = file_get_contents("http://example.com");
  if ($result === false) {
    var_dump($http_response_header);
  }
  
```

but it's pretty shitty way to handle errors, and then look into array for details. 

## Solution
So what is the solution ? It's quite simple use `CURL` library instead:

{{< gist slav123 cf7779073ed16914b2ec9368140e067a >}}

What's the difference ? You are getting much detailed errors and you can easily take actions based on exact error. 