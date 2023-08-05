---
title: How to Restore Files from Glacier on Amazon S3 Storage using Bash Script
author: admin
type: post
date: 2023-03-31T08:00:00+00:00
url: /2023/how-to-restore-objects-from-glacier-with-a-script/
thumbnail: /images/2023/03/glacier.jpg
categories:
- Technologies
- DevOps
tags:
- aws
---

Amazon S3 storage is a popular cloud storage service that provides scalable object storage for data backup, archive, and disaster recovery. One of the storage options available on Amazon S3 is Amazon Glacier, which provides a low-cost, long-term storage solution for data archiving and backup. However, retrieving data from Amazon Glacier can be time-consuming and expensive. In this tutorial, we'll show you how to restore files from Glacier on Amazon S3 storage using a Bash script.

<!--more-->

## Prerequisites
To follow along with this tutorial, you'll need the following:

- An AWS account with permissions to access Amazon S3 storage.
- The AWS CLI installed on your local machine.
- Basic knowledge of Bash scripting.

## Step 1 - Set AWS Region and S3 Bucket Name
The first step is to set the AWS region and S3 bucket name in the script. Open your preferred text editor and create a new Bash script with the following code:

```BASH
#!/bin/bash

# Set your AWS region and S3 bucket name
REGION=eu-central-1
BUCKET=bucket-name

```
Replace "eu-central-1" with your desired AWS region, and "bucket-name" with the name of your Amazon S3 bucket.


## Step 2 - List Objects and Change Storage Class
The next step is to list all objects in the S3 bucket and change the storage class to Standard. Add the following code to the Bash script:

```BASH
# List all objects in the bucket and change the storage class to Standard
aws s3api list-objects --region "$REGION" --bucket "$BUCKET" --query "Contents[?StorageClass=='GLACIER'].[Key]" --output text | while read -r line; do
  # Skip directories
  if [[ "$line" == */ ]]; then
    continue
  fi
  
  echo "Restoring \"$line\" to Standard storage class"
  
  # Use double quotes around the key variable to handle spaces
  aws s3api restore-object --bucket "$BUCKET" --key "$line" --restore-request '{"Days":25,"GlacierJobParameters":{"Tier":"Standard"}}' --no-cli-pager 2>&1
done

```

This code uses the AWS CLI to list all objects in the S3 bucket with the Glacier storage class, and then loops through each object. The script skips any directories and changes the storage class to Standard using the restore-object command. The `--no-cli-pager` option is added to the restore-object command to suppress the pager output and wait for user input.

## Step 3 - Run the Script
Save the Bash script and make it executable by running the following command in your terminal:

```BASH
chmod +x /path/to/script.sh
```

Replace `"/path/to/script.sh"` with the path to your Bash script. Then, run the script using the 
following command:
```BASH
./path/to/script.sh
```

The script will output a message for each object being restored and wait for user input before continuing to the next object.

## Conclusion
In this tutorial, we showed you how to restore files from Glacier on Amazon S3 storage using a Bash script. The script lists all objects in the S3 bucket with the Glacier storage class and changes the storage class to Standard. This can help reduce the time and cost of retrieving data from Amazon Glacier.

Complete script:
## 
{{< gist slav123 4b6d09a36f29376f08e532c0990b6073 >}}


