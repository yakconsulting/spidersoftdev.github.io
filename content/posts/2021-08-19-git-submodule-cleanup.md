---
title: Clearing up git submodules problems
author: admin
type: post
date: 2021-08-19T12:44:18+00:00
url: /2021/clearing-up-git-submodule-problem
thumbnail: images/2021/08/hugo-logo-wide.png
categories:
 - Software
tags:
 - git
 - hugo
  
---

As some of you noted, I moved my blog into [Hugo](https://gohugo.io). You have to pull many git repositories during the build process to compile the entire project. Because begging is always challenging, for me, it's always trial and error, and I ended up having many sub-repositories missing. I'm not going to show the whole journey how to solve "the issue".

<!--more-->

To list submodule you can use something like that:

`git submodule`

And then you can look deeper:

`git ls-files --stage | grep 160000`

and you get something like that:

```
160000 cef4cf89570a56ca85abcfc6b685844ed605875f 0	Mainroad
160000 b2bdfdb625f38211ca8f107566175c71ea479c6a 0	themes/mainroad
160000 cef4cf89570a56ca85abcfc6b685844ed605875f 0	themes/mymainroad
```

To fix missing dependencies just use:

```
2799  git rm --cached themes/mainroad
```
