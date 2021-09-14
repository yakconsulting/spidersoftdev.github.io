---
title: Using Google Cloud storage with AWS libraries in GO LANG
author: admin
type: post
date: 2015-05-15T01:08:15+00:00
url: /2015/google-cloud-storage-with-aws-libraries-go-lang/
thumbnail: images/uploads/2014/08/gopher.jpg
dsq_thread_id:
  - 3764913122
categories:
  - Go Lang
  - Technologies
tags:
  - aws
  - golang
  - google
  - s3
  - storage

---
[Google Cloud storage](https://cloud.google.com/storage/docs/overview) it’s Google answer to \[Amazon S3\]\[1\] service. As long one of them is very popular 😉 Second wasn’t so successful amongst developers due to quite complex processes around service. Amazon is super simple, and developer friendly – Google… well not so easy. So the questions – why you may consider using GS instead of well documented, and super easy S3. Not many people realise but Google Cloud Storage is [actually cheaper](http://www.cloudberrylab.com/blog/amazon-s3-azure-and-google-cloud-prices-compare/). The other reason to use Google Storage is having different provider as a backup solution. Anyway – let’s show how easy is to use GS with existing S3 libraries.

<!--more-->

Google wanted to steel some clients from Amazon and they introduced [Google Cloud Storage Interoperability](https://cloud.google.com/storage/docs/interoperability) which is basically same API which AWS S3 has.  According to [this document](https://cloud.google.com/storage/docs/migrating) there are couple differences, but in general they aren’t – except endpoint.

You have to enable it using Google Developers Console

![Storage-access-Google-Server](images/uploads/2015/05/Storage-access-Google-Server.jpg)

grab Access Key and Secret.

And here is simple example how to use it with GoLang [goamz](http://github.com/goamz/goamz/aws) library

{{< gist slav123 33076e3986a110238337 >}}

 [1]: http://aws.amazon.com/s3/