---
title: Why I don’t recommend mailgun…
author: admin
type: post
date: 2013-09-23T23:26:49+00:00
url: /2013/why-i-dont-recommend-mailgun/
layout:
  - default
hide_post_title:
  - default
unlink_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
unlink_post_image:
  - default
dsq_thread_id:
  - 1791077936
categories:
  - Software
tags:
  - aws
  - cloud
  - mailgun
  - rackspace

---
Couple months ago I listed  services having [API for sending and receiving emails][1]. One of them was <a href="http://www.mailgun.com/" target="_blank">mailgun</a> &#8211; I was using it for a while since&#8230; yesterday. My account was locked without any valid reason. Something related with SPAM:

> <a href="http://documentation.mailgun.com/razor.html" target="_blank">http://documentation.mailgun.<wbr />com/razor.html</a> Reference: #rzr01.

Because I know exactly what emails are being sent using my accounts (I keep track of each email coming out from the system) I was really interested how it could happen. Who reported message as a SPAM, and which one was that.

I contacted support, after 12hours (my account is suspended!) got answer similar to automated one:

> Mailgun uses industry recognized third party sources for some of our SPAM tests and one of them has indicated that there is a fingerprint in your message that they are flagging as SPAM. I have reached out to them for further information. I will update you with any information I get.

So&#8230; you know why you why disabled my account on not ? The truth is that i&#8217;m not sending thousands of emails &#8211; it&#8217;s around 10-50 emails per day &#8211; so traffic is really low. So&#8230; can anyone can afford having such a long brake ? The have my CC details, company details &#8211; so how they can assume that I&#8217;m sending SPAM (50 emails per day?) Seriously ?

My answer is: no more mailgun. Moving out, closing down accounts &#8211; try to try <a href="http://aws.amazon.com/ses/" target="_blank">SES</a> or <a href="http://sendgrid.com/" target="_blank">Sendgrid</a>.

 [1]: http://www.spidersoft.com.au/2013/send-and-receive-emails-via-api/ "Send and receive emails via API"