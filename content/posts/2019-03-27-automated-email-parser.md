---
title: Automated email parser
author: admin
type: post
date: 2019-03-27T08:43:27+00:00
url: /2019/automated-email-parser/
thumbnail: /images/uploads/2019/03/email-parser.png
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
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
It&#8217;s a simple mechanic to decompose emails into useful parts, like some markup (to squiz emails directly into internal systems) and create file attachments &#8211; and extract inline images. 

Flow is pretty simple, but we have couple components.

  1. We need something to &#8220;receive&#8221; emails. Easiest way is to use Amazon SES or mailgun or&#8230; something else. There is a couple SASS solutions for that
  2. Next step is to be notified when email arrive, so we don&#8217;t have overhead with checking email every couple of minutes
  3. We have to &#8220;decompose&#8221; &#8211; decode email from it&#8217;s raw format to text, and attachments. We can achieve that using couple existing libraries, but you get the idea
  4. We have to save all data and expose it to public

So we know what to do, and roughly how to do whole process. Points 1 and 2 are pretty straight forward for anyone who uses AWS and their services. 

To decompose e-mails we need simple micro service, I used this go library: [https://github.com/jhillyerd/enmime](https://github.com/jhillyerd/enmime) – it’s pretty simple, just need a little bit of play with details of email. This is also perfect use case for [AWS Lambda](https://aws.amazon.com/lambda/) – because it’s just ideal for it. You don’t have to worry about no. of emails processed in the same time, and with low traffic you can get it for free.

Moving on &#8211; point 4 &#8211; super easy. You can upload your &#8220;elements&#8221; to S3, or anywhere and expose it to public (or not)  


> I gave you all ingredients to make this cake. If you wan&#8217;t me to bake it &#8211; you can [hire me](contact-us/).
 