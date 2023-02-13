---
title: How to scrape page source with Go and chromedp
author: admin
type: post
date: 2022-11-07T08:00:00+00:00
url: /2023/scraping-pages-with-go-and-chromedp
thumbnail: /images/2014/08/gopher.jpg
categories:
- Technologies
- Go Lang
tags:
- chromedp
- docker
---

It's clear what we are trying to achieve, so let's think about the indigents.
We need something to render a page because, nowadays, almost all pages are rendered with the help of JavaScript. Moving on, we also need something to talk to the browser. Because our browser is headless, we need to use some API. And finally, we need to save the result.
Getting a result is tricky because browsers are designed to interact with rendered results rather than directly with the source code.

## Headless browser

So we are looking for a headless browser. We are going to use [Chrome's headless-shell](https://github.com/chromedp/docker-headless-shell) because it's easy to use, and it's based on [Chromium](https://www.chromium.org/Home). The most significant advantage is docker image, which we can efficiently run on our local machine or anywhere in the cloud.

With one line of code, we can deploy headless-shell in docker container:

`docker run -d -p 9222:9222 --rm --name headless-shell --shm-size 2G chromedp/headless-shell`

This part will solve us a lot of problems with running browser.  

## Make it dance

The next step will be to command our headless browser to do what we want. We are going to use [chromedp](https://github.com/chromedp/chromedp) to talk with the headless browser. The code is simple:

```GO
package main

import (
	"context"
	"flag"
	"fmt"
	"github.com/chromedp/cdproto/dom"
	"github.com/chromedp/chromedp"
	"os"
)

const (
	websiteUrl = "https://www.spidersoft.com.au/"
	dockerUrl = "wss://localhost:9222"
)

func main() {

	// create allocator context for use with creating a browser context later
	allocatorContext, cancel := chromedp.NewRemoteAllocator(context.Background(), dockerUrl)
	defer cancel()

	// create context
	ctx, cancel := chromedp.NewContext(allocatorContext)
	defer cancel()

	var res string

	err := chromedp.Run(ctx,
		chromedp.Navigate(websiteUrl),
		chromedp.ActionFunc(func(ctx context.Context) error {
			node, err := dom.GetDocument().Do(ctx)
			if err != nil {
				return err
			}
			res, err = dom.GetOuterHTML().WithNodeID(node.NodeID).Do(ctx)
			return err
		}),
	)

	if err != nil {
		fmt.Println(err)
	}

	err = os.WriteFile("output.html", []byte(res), 0644)
	
	if err != nil {
		fmt.Println(err) 
    }
}

```

## What next

You can do a lot more with `chromedp` than just scraping the page source. You can also take do initial scraping inside the browser itself, or even interact with the page. There is plenty [examples](https://github.com/chromedp/examples). I was looking to build a microservice that will just grab a page source and deliver .html file to storage, and scraping was happening in the different place, and using different technology [htmlquery](https://github.com/antchfx/htmlquery).