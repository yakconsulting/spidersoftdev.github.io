---
title: How to set up public bucket policy on Spaces
author: admin
type: post
date: 2022-07-25T08:30:00+00:00
url: /2022/setup-public-bucket-policy-digitalocean-spaces
categories:
- Technologies
- DevOps
tags:
- storage
- spaces
---

This one is really quick and easy to set up public bucket policy on [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces). Spaces are S3 type object storage, you can check out about it [here](https://docs.digitalocean.com/reference/api/spaces-api/).

<!--more-->
 

We need `policy.json` file with content like this:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::my-public-bucket/*"
            ]
        }
    ]
}
```

Please do remember about replacing `my-public-bucket` with your bucket name.

There is a huge chance that you already have `awscli` configured on your computer. So we use this to setup policy:

The other magical line is this one:
```bash
aws --profile=ocean --endpoint-url https://ams3.digitaloceanspaces.com s3api put-bucket-policy --bucket my-public-bucket --policy file://policy.json
```

Obviously uoi have to replace `my-public-bucket` with your bucket name and `ams3.digitaloceanspaces.com` with correct endpoint.

After this set of operations, all newly created object will be public by default.