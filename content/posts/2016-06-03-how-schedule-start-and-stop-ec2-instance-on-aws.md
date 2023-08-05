---
title: How schedule start and stop EC2 instance on AWS
author: admin
type: post
date: 2016-06-02T14:53:57+00:00
url: /2016/how-schedule-start-and-stop-ec2-instance-on-aws/
thumbnail: images/2016/06/gpu_amazon_ec2_logo.png


dsq_thread_id:
  - 5577122846
categories:
  - DevOps
tags:
  - aws
  - ec2
  - route53

---
Biggest advantage with AWS &#8211; EC2 service, is that you are paying for each minute of usage. So &#8211; why run instances 24/7 if you need them only for 12 hours par day ? You can just start and stop whenever you need them. Obviously we don&#8217;t want to forgot to shutdown our instance, or start when we need it. Here is a simple recipe how to automate whole task

<!--more-->

## 1. Common information

We have to collect some information from our Management Console. What exactly do we need:

  1. Our instance ids,
  2. Our Route53 Zone ID
![instance Id](../../images/2016/06/ec2-instance-id.jpg)
![zone Id](../../images/2016/06/route53-zoneid.jpg)
  
  
## 2. AWS command line setup

In each instance you have command line tool to manage your AWS service, it&#8217;s called AWS. Let&#8217;s configure it:

```
aws configure
AWS Access Key ID [None]: -your-aws-key-id
AWS Secret Access Key [None]: -your-aws-access-key
Default region name [None]: ap-southeast-2
Default output format [None]:
```

## 3. How to start EC2 instance from command line

You just need to run simple command:

`/usr/bin/aws ec2 start-instances --region ap-southeast-2 --instance-ids i-xxxxxx`

And ad this task to your crontab

`00      15      *       *       1-5     /usr/bin/aws ec2 start-instances...`

## 4. How to stop EC2 instance form command line

Same story here:

`/usr/bin/aws ec2 stop-instances --region ap-southeast-2 --instance-ids i-xxxxxx`

And add this task to crontab

`00      23      *       *       1-5     /usr/bin/aws ec2 stop-instances...`

## 3. Update Route53 to keep our CNAME up to date

Last task is to make sure, that your instance will &#8220;self assign&#8221; their hostname to actual IP. Here is a simple script to make user that we can update Route53 zone after reboot:

{{< gist slav123 5a1466cc05e74f939972e7380a3b8ea6 >}}

Don&#8217;t forget to add this to `/etc/init.d`
