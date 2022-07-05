---
title: Getting started with AWS CLI
author: admin
type: post
date: 2017-11-02T07:25:29+00:00
url: /2017/getting-started-with-aws-cli/
thumbnail: images/2015/04/gpu_amazon_ec2_logo.png


dsq_thread_id:
  - 6260317939
categories:
  - Linux
tags:
  - aws
  - cli
  - command line
  - ec2
  - rds

---
AWS has extremely nice UI. But &#8211; with the time, you need to do something faster than just clicking via an interface. Sometimes you need to automate something (start/stop instances, make a backup. If you are wondering &#8211; there is a perfect time for CLI.

<!--more-->

  
Let&#8217;s start with setting up out configuration data:

`aws configure --profile client`

Why &#8211;profile ? Because sooner or later we get to the point we have to manage multiple accounts. It&#8217;s easier to set this up per client. Now we can use it in a regular way:

`aws ec2 describe-instances --profile client`

And now we can use command line, couple useful examples:

To run backup of your instance (create an AMi image) just type:

```SHELL
#!/bin/bash

m=$( date +"%Y-%m" )
b1=$(/usr/local/bin/aws ec2 create-image --profile client --instance-id=i-0000000 --name "$m-name" --description "$m backup")
```

To start/stop multiple instaces EC2/RDS i&#8217;m using something like that:

```SHELL
#!/bin/bash

case $1 in
stop)
	aws ec2 stop-instances --profile client --region ap-southeast-2 --instance-ids i-xxxx i-yyyy
	aws rds stop-db-instance --profile client --region ap-southeast-2 --db-instance-identifier mysql01a-aws-syd
;;
start)
	aws ec2 start-instances --profile client --region ap-southeast-2 --instance-ids i-xxxx i-yyyy
	aws rds start-db-instance --profile client --region ap-southeast-2 --db-instance-identifier mysql01a-aws-syd
	;;
esac

echo "Use with start / stop parameter"
```
