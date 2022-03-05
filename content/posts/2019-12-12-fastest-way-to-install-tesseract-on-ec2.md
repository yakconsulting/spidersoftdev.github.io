---
title: Fastest way to install Tesseract on EC2
author: admin
type: post
date: 2019-12-12T12:03:07+00:00
url: /2019/fastest-way-to-install-tesseract-on-ec2/
categories:
  - Linux
  - Open Source
tags:
  - ec2
  - ocr
  - opensource

---
[Tesseract](https://github.com/tesseract-ocr/tesseract) it&#8217;s a great library Open Source library to supply free OCR solutions for multiple libraries. You can use it directly from command line, or in your own software using supplied libraries. 

<!--more-->

Tesseract lives in EPEL repo, but adding repo doesn&#8217;t solve it, as the packages in the amzn-main repository seem to override those in the epel repository. To install tesseract we need libwebp package to.


```
yum --enablerepo=epel --disablerepo=amzn-main install libwebp
yum --enablerepo=epel install tesseract
```