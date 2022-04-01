---
title: Automated email parser
author: admin
type: post
date: 2019-03-27T08:43:27+00:00
url: /2019/automated-email-parser/
thumbnail: /images/2019/03/email-parser.png
categories:
  - Case studies
  - Go Lang
tags:
  - aws
  - email
  - go
  - golang
  - lambda
  - parse

---
It's a simple mechanic to decompose emails into valuable parts, like some markup (to push emails directly into internal systems), create file attachments and extract inline images. 

Flow is pretty simple, but we have a couple of components.

  1. We need something to &#8220;receive&#8221; emails. The easiest way is to use Amazon SES or mailgun or&#8230; something else. There are a couple of SASS solutions for that.
  2. Next step is to be notified when the email arrives, so we don&#8217;t have overhead with checking email every couple of minutes
  3. We have to &#8220;decompose&#8221; &#8211; decode email from it&#8217;s raw format to text, and attachments. We can achieve that using couple of existing libraries, but you get the idea
  4. We have to save all data and expose it to public

So we know what to do and roughly how to do the whole process. Points 1 and 2 are pretty straightforward for anyone who uses AWS and their services. 

To decompose emails, we need a simple microservice; I used this go library: [https://github.com/jhillyerd/enmime](https://github.com/jhillyerd/enmime) – it’s pretty simple and needs a little bit of play with details of email. 
It is also a perfect use case for [AWS Lambda](https://aws.amazon.com/lambda/) – because it’s just ideal for it. You don’t have to worry about many emails processed simultaneously, and with low traffic, you can get it for free.

Moving on &#8211; point 4 &#8211; super easy. You can upload your &#8220;elements&#8221; to S3, or anywhere and expose it to the public (or not)  

> I gave you all ingredients to make this cake. If you wan&#8217;t me to bake it &#8211; you can [hire me](/contact-us/).
