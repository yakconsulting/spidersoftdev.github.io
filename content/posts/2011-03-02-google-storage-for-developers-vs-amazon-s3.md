---
title: Google Storage for Developers vs Amazon S3
author: admin
type: post
date: 2011-03-01T18:35:40+00:00
url: /2011/google-storage-for-developers-vs-amazon-s3/
thumbnail: images/2011/03/Mme.png
aktt_notify_twitter:
  - no
layout:
  - default
hide_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
unlink_post_title:
  - default
unlink_post_image:
  - default
dsq_thread_id:
  - 1159443096
categories:
  - Blog
  - Featured
tags:
  - amazon
  - aws
  - google
  - s3
  - storage

---
I just got activation for [Google Storage for Developers](http://code.google.com/apis/storage/). Service is similar to [Amazon S3](http://aws.amazon.com/s3/) but it&#8217;s served by Google and it&#8217;s still in beta mode &#8211; that&#8217;s mean that you can&#8217;t just register and use, and you have limited warranty about quality and uptime.  
<!--more-->

In general &#8211; all functions are the same. You get the unlimited storage, you can create bucket in google cloud. All your data are accessible by API, you can create public files (classic CDN) and you can manage your account using webapp called [Storage Manager][1].

Google UI look pretty &#8220;poor&#8221; &#8211; especially if you compare it to Amazon S3:

![Google UI](images/2012/10/gsd.png "Google UI")

Amazon S3 :

![S3 UI](images/2012/10/s3.png "S3 UI")

## Pricing

### Google storage pricing

  * Storage: $0.12/GB/Month
  * PUT, POST, GET bucket\*, GET service\* Requests: $0.01 per 1,000 Requests
  * GET, HEAD requests: $0.01 per 10,000

Download data:

  * $0.12/GB to Americas, Europe, the Middle East, and Africa
  * $0.21/GB to Asia-Pacific

#### Free Trial Usage

Google Storage offers a free trial quota until June 30, 2012. This quota is only applicable to your first project that uses Google Storage and gives you free usage of resources within that project, up to:
  
* 5 GB of storage
* 25 GB of download data (20 GB to Americas, Europe, the Middle East and Africa; 5 GB to Asia-Pacific)
* 25 GB of upload data (20 GB to Americas, Europe, the Middle East and Africa; 5 GB to Asia-Pacific)
* 30,000 GET, HEAD requests
* 3,000 PUT, POST, LIST* requests
  
  
Full details can be found here [google storage pricing](https://developers.google.com/storage/docs/pricingandterms)
  
  ### Amazon S3 pricing

 * Storage pricing: First 1 TB / month $0.125 per GB
 * Request Pricing: PUT, COPY, POST, or LIST Requests $0.01 per 1,000 requests, GET and all other Requests $0.01 per 10,000 requests
 * Data Transfer Pricing:
   * Data Transfer IN: All data transfer in $0.000 per GB
   * Data Transfer OUT: First 1 GB / month $0.000 per GB, Up to 10 TB / month $0.120 per GB
   * Full pricing grid: [Amazon S3 pricing](https://aws.amazon.com/s3/pricing/)

## Speed
Google is *much faster* then S3 &#8211; I&#8217;ve checked it from Australia. In GS settings you can&#8217;t chose location of your servers (actually you can chose between: US and EU), Amazon S3 you can chose exact location of your bucket, but biggest advantage of Google Storage is that it&#8217;s actually build in CDN. Each time when you try to fetch file, GS will chose closest location to you.With Amazon &#8211; this service is called [CloudFront](http://aws.amazon.com/cloudfront/) and you have to pay extra for it.

## Final results
  
I believe that Google has much more servers than Amazon and probably better infrastructure. Problem with Google in general that it&#8217;s build by Geeks and usually is used by geeks. API is not so simple, and GUI is not so polished as competition. Event when it&#8217;s better.
  
Amazon gives you more tools, more features and definitely better GUI. But it&#8217;s slower, and if you compare exact pricing &#8211; with additional features (CloudFront) it&#8217;s more expensive than Google.
  
## UPDATE

Hi all, I updated this article 26 Apr 2012 &#8211; all prices all up to date, and links are working correctly.

[1]: https://sandbox.google.com/storage/