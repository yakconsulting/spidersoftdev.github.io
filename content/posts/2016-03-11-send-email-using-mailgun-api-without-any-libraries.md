---
title: Send email using mailgun API without any libraries
author: admin
type: post
date: 2016-03-11T10:39:09+00:00
url: /2016/send-email-using-mailgun-api-without-any-libraries/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
dsq_thread_id:
  - 5574674269
categories:
  - Technologies
  - PHP

---
Mailgun is well known service provider which allows you send emails via their API or just using regular SMTP servers. SMTP protocol is bit slower, but it&#8217;s so common that you can use it everywhere. Each modern application allows you define your own SMTP server to send emails. But&#8230; we love speed, SMTP from it&#8217;s nature it&#8217;s bit slower then regular API call.

<!--more-->

Code is super simple, you just need replace 2 variables: **key-example** and **samples.mailgun.org** with your own credentials.


{{< gist slav123 197bee1c04be83f0f764 >}}

If you are looking for more sophisticated examples, check out this [blog post][1].

&nbsp;

 [1]: http://blog.mailgun.com/the-php-sdk-the-first-of-many-official-mailgun-sdks/