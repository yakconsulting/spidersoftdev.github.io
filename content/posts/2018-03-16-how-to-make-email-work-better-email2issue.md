---
title: How to make email work better email2issue
author: admin
type: post
date: 2018-03-16T09:02:56+00:00
url: /2018/how-to-make-email-work-better-email2issue/
thumbnail: images/2018/03/mail-bug-interface-symbol.png
categories:
  - Case studies
  - Go Lang
tags:
  - automation
  - email

---
## The problem:

We are using a bug tracking system, like most software development companies. Creating an issue is quite simple. Open bug tracking system, fill some inputs, upload attachments &#8211; done. The issue is created. Sometimes an issue is described with multiple attachments (screenshots). A bug tracking system allows us to embed images into a description. All issues come from users in the form of an email.

<!--more-->

## Current process:

It&#8217;s just slow and time-consuming. We have to read the email and download the attachments. Copy and paste the body into the right field. Upload attachments and embed them again into the correct place. It&#8217;s not rocket science but takes a lot of time, especially when you have multiple issues with multiple attachments.

## Solution:

  1.  AWS SES to handle incoming emails. Simple, fast, and reliable. Send email &#8211; get output as an object on S3 bucket &#8211; get notification via SNS with body of the email
  2. Go microservice to explode email to usable parts 
```JSON
{
    "From":"",
    "To":"",
    "Subject":"",
    "Text":"",
    "Inlines":[
      {"ContentID":"image001.png@01D3B226.F43A5000","FileName":"image001.png"},{"ContentID":"image002.jpg@01D3B226.F43A5000","FileName":"image002.jpg"}
      ],
    "Dir":"2018/03/16/095418/"},
    "Html" : "",
    "Markup" : ""
}
```
  As simple as powerful it is, can be reused for any other purpose. Micro service get&#8217;s email body as an input, outputs JSON with structure and ready to use links to attachments.
  
  3. Just a simple post query to Issue Tracker API to create new issue.

  4. Bonus feature: email notification to issue reporter that given issue was created.

&nbsp;


Icons made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
