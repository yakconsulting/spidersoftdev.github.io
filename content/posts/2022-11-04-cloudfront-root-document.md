---
title: How to host static website on AWS CloudFront
lead: How and use S3 as an origin for CloudFront
author: admin
type: post
date: 2022-11-04T08:00:00+00:00
url: /2022/how-to-host-static-website-on-aws-cloudfront
categories:
- Technologies
description: Learn how to host static websites using AWS CloudFront and S3, including two methods to handle index.html files in subdirectories. A practical guide with CloudFront Functions
tags:
- aws
- cloudfront
---

I was looking for a way to host a static website on AWS. I found a couple of ways to do that. I decided to use CloudFront as a CDN and S3 as an origin. I will show you how to do that.

<!--more-->

The beginning is quite simple - creating a bucket in S3. And set it up as an origin for Cloudfront.

The biggest problem is obviously with hosting that serves `index.html` files. You can set up the default root object, but it works only for `/` path, but not with subdirectories. There are a couple of ways to do that.

## Cloudfront functions 

Cloudfront functions are a new feature that allows you to run a piece of code on the edge. You can use it to rewrite the request path.

You can find more information about Cloudfront functions [here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html).

![cloudfront-functions](/images/2022/11/cloudfront-functions.png)

We are going to create small function that will rewrite the request path. 

```js
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
```

Don't forget to assign the function to the Cloudfront distribution.

![cloudfront-functions](/images/2022/11/cloudfront-functions-associate.png)

## Website hosting

The other option is to use S3 website hosting. It is a bit more complicated, but it works with subdirectories.

Make sure that the web hosting option is enable on your bucket, and copy domain name from it:

![Website hosting](/images/2022/11/static-website-hosting.png)

Instead of chosing domain from the list, just paste your domain name.
![dropdown](/images/2022/11/dropdown-origin.png)