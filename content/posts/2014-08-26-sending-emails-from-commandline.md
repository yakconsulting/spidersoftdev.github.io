---
title: Sending emails from commandline
author: admin
type: post
date: 2014-08-26T04:41:08+00:00
url: /2014/sending-emails-from-commandline/
thumbnail: images/uploads/2014/08/email-logo.jpg
dsq_thread_id:
  - 2964950902
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
categories:
  - Linux
tags:
  - email
  - linux

---
Pretty easy but annoying task. Especially when you want to send email using specific SMTP server, or from GMAIL using SSL or add some attachment, or send RAW emails. Solution is there &#8211; <a href="https://github.com/muquit/mailsend/" target="_blank" rel="noopener">mailsend</a>. Extremely simple command line tool for Linux, Mac OS X and even Windows ;). Compile / download binary and you cam enjoy freedom of sending emails from command line. Or you can also download Max OS X Binary of mailsend from [here][1]

<!--more-->

Sample usage:

send email  with attachment and copy to given address:

```
mailsend -smtp localhost -t email@example.com -f test@otheraddress.com -attach attachment.zip -name from_name -M "bodycopy"
```

let&#8217;s send email RAW email using GMAIL account:

```
mailsend -starttls -auth -smtp smtp.gmail.com -user myuser@gmail.com -pass mypass -t destintation@email.com -f myuser@gmail.com -attach test.zip,application/zip,a -name me -msg-body test.txt -sub email with attachment
```

Send email using Amazon SES

```
mailsend -starttls -auth -smtp email-smtp.us-east-1.amazonaws.com -user KEY -pass PASS -t to@email.address -name me -f confimed@email.address -sub test -M "message"
```

 [1]: http://demo.spidersoft.com.au/download/mailsend