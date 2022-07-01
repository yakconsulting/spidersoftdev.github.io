---
title: Getting started with go language on Mac OS X
author: admin
type: post
date: 2014-07-13T06:42:43+00:00
url: /2014/getting-started-with-go-language-on-mac-os-x/
thumbnail: images/2014/08/gopher.jpg
dsq_thread_id:
  - 2922773325


categories:
  - Go Lang
  - Software
tags:
  - go
  - golanguage
  - setup

---
Node.js is like space shuttle &#8211; very sophisticated, very fast but one simple mistake and&#8230; it goes down.

So recently i tried [The Go Language](http://golang.org/) which is advertised as

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

Because google is a creator of this langauge documentation sucks. Plenty of random documents of everwhere, no clean how to documentation.

<!--more-->

If you would like to start play with golang &#8211; firsting first &#8211; download package for Mac OS X. It is located here: [download go](http://golang.org/dl/). Then edit your `.profile` file and put this 2 lines into it:

&nbsp;

```
nano ~/.profile
export GOROOT=/usr/local/go/
export GOPATH=/Users/slawomir.jasinski/go/
```

Or… if you are using [Homebrew](http://brew.sh) you can setup path like so:

```
GOVERSION=$(brew list go | head -n 1 | cut -d '/' -f 6)
export GOROOT=$(brew --prefix)/Cellar/go/$GOVERSION/libexec
```

Obviously replace **slawomir.jasinski** with your default username&#8230; and make such directory in your folder structure:

```
mkdir ~/go
mkdir ~/go/src
```

Next step is pretty simple &#8211; if you would like to try out some hello world code, just create subfolder in `~/go/src/hello` and create your file there.  
If you need any libraries, just call `go get url` and source will be dowloaded right to correct folder.