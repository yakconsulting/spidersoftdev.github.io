---
title: Fetch page with proxy using The Go language
author: admin
type: post
date: 2014-08-13T06:16:24+00:00
url: /2014/fetch-page-with-proxy-using-the-go-language/
thumbnail: images/uploads/2014/08/gopher.jpg
dsq_thread_id:
  - 2922723383
categories:
  - Technologies
  - Go Lang
tags:
  - crawl
  - go
  - golang

---
For a while i&#8217;m playing with <a href="http://golang.org/" target="_blank">The Go Programming Language</a> &#8211; so far I loved it. I figure out that I&#8217;ll push some code snippets from time to time.  
Today I spend some time creating simple not ever crawler, but website fetcher.

Idea is very simple &#8211; download page, run xpath query on it and spit out results. I was looking for decent xpath library for Go and couldn&#8217;t find any. I tried to use <a href="http://gopkg.in/xmlpath.v2" target="_blank">xmlpath</a> but it sucks. I couldn&#8217;t even run queries like `id('product-details')/div[@class='product-price']"` Then I found something nicer &#8211; <a href="https://github.com/moovweb/gokogiri" target="_blank">Gokogiri</a> &#8211; which works pretty nicely, but &#8211; couldn&#8217;t find any examples except this <a href="https://www.moovweb.com/blog/gokogiri-the-best-way-to-parse-xml-in-go/" target="_blank">small article</a>.

The only problem with running Gokogiri is that it uses `libxml2` which is not a huge problem on Linux based systems, but on Mac OS X you have to install it via <a href="http://brew.sh/" target="_blank">homebrew</a>  
`brew install libxml2`

<!--more-->

Here is code

```
package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/moovweb/gokogiri"
	"io/ioutil"
        "os"
)

func main() {
	body := fetch("http://httpbin.org/html")

	doc, err := gokogiri.ParseHtml(body)
	if err != nil {
		log.Fatalln(err)
	}
	defer doc.Free()

	html := doc.Root().FirstChild()
	result, err := html.Search("/html/body/h1")
	if err != nil {
		log.Fatalln(err)

	}
	fmt.Println(result)

}

func fetch(url string) []byte {
        os.Setenv("HTTP_PROXY", "http://x.x.x.x:8080")
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatalln(err)
	}

	req.Header.Set("User-Agent", "Golang Spider Bot v. 3.0")

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	return body
}
```