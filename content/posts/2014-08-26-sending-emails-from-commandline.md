---
title: Sending emails from commandline
author: admin
type: post
date: 2014-08-26T04:41:08+00:00
url: /2014/sending-emails-from-commandline/
thumbnail: images/2014/08/email-logo.jpg
dsq_thread_id:
  - 2964950902


categories:
  - DevOps
tags:
  - email
  - DevOps

---
Pretty easy but annoying task. Especially when you want to send email using specific SMTP server, or from GMAIL using SSL or add some attachment, or send RAW emails. Solution is there &#8211; [mailsend](https://github.com/muquit/mailsend/). Extremely simple command line tool for Linux, Mac OS X and even Windows ;). Compile / download binary and you can enjoy freedom of sending emails from command line.

<!--more-->

Sample usage:

send email  with attachment and copy to given address:

```BASH
mailsend -smtp localhost -t email@example.com -f test@otheraddress.com -attach attachment.zip -name from_name -M "bodycopy"
```

let&#8217;s send email RAW email using GMAIL account:

```BASH
mailsend -starttls -auth -smtp smtp.gmail.com -user myuser@gmail.com -pass mypass -t destintation@email.com -f myuser@gmail.com -attach test.zip,application/zip,a -name me -msg-body test.txt -sub email with attachment
```

Send email using Amazon SES

```BASH
mailsend -starttls -auth -smtp email-smtp.us-east-1.amazonaws.com -user KEY -pass PASS -t to@email.address -name me -f confimed@email.address -sub test -M "message"
```