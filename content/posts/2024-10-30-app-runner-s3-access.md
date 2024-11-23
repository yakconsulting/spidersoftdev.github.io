---
title: How to Configure S3 Access for AWS App Runner A Complete IAM and VPC Setup Guide
author: admin
type: post
date: 2024-10-30T08:30:00+00:00
url: /2024/app-runner-s3-access
description: Set up secure S3 bucket access for AWS App Runner with IAM roles, policies & VPC endpoints
categories:
- Technologies
- DevOps
---
## Introduction

When deploying applications on AWS App Runner, you may need to access S3 buckets to store or retrieve data. However, by default, App Runner services don't have permission to interact with S3. This guide aims to solve that problem by walking you through the process of granting your App Runner service secure access to S3 buckets.

We'll achieve this by:
1. Creating an IAM role with the necessary S3 permissions
2. Configuring your App Runner service to use this role
3. Setting up networking components (if using a VPC) to ensure connectivity

By following these steps, you'll enable your App Runner service to securely read from and write to S3 buckets, allowing for seamless integration of S3 storage in your application.
<!-- more --> 
## Steps

### 1. Create an IAM Role

Create the IAM role:
```bash
aws iam create-role --role-name AppRunnerS3AccessRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "tasks.apprunner.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

Verify role creation:
```bash
aws iam get-role --role-name AppRunnerS3AccessRole
```

### 2. Create and Attach an IAM Policy

Create the policy:
```bash
aws iam put-role-policy --role-name AppRunnerS3AccessRole --policy-name S3AccessPolicy --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::*/*"
    }
  ]
}'
```

Verify policy attachment:
```bash
aws iam list-role-policies --role-name AppRunnerS3AccessRole
```

### 3. Update App Runner Service

Update the service:
```bash
aws apprunner update-service --service-arn YOUR_SERVICE_ARN --instance-configuration '{
  "InstanceRoleArn": "arn:aws:iam::YOUR_ACCOUNT_ID:role/AppRunnerS3AccessRole"
}'
```

Verify service configuration:
```bash
aws apprunner describe-service --service-arn YOUR_SERVICE_ARN --query 'Service.InstanceConfiguration.InstanceRoleArn' --output text
```

### 4. Create VPC Endpoint for S3 (if using VPC)

Get VPC and route table IDs:
```bash
VPC_ID=$(aws ec2 describe-vpcs --query 'Vpcs[0].VpcId' --output text)
ROUTE_TABLE_ID=$(aws ec2 describe-route-tables --filters "Name=vpc-id,Values=$VPC_ID" --query 'RouteTables[0].RouteTableId' --output text)
```

Create VPC endpoint:
```bash
aws ec2 create-vpc-endpoint --vpc-id $VPC_ID --service-name com.amazonaws.YOUR_REGION.s3 --route-table-ids $ROUTE_TABLE_ID
```

Verify endpoint creation:
```bash
aws ec2 describe-vpc-endpoints --filters "Name=vpc-id,Values=$VPC_ID" --query 'VpcEndpoints[*].[VpcEndpointId,ServiceName]' --output text
```

### 5. Update Security Group (if using VPC)

Get security group ID and update rules:
```bash
SG_ID=$(aws apprunner describe-service --service-arn YOUR_SERVICE_ARN --query 'Service.NetworkConfiguration.EgressConfiguration.SecurityGroupIds[0]' --output text)

aws ec2 authorize-security-group-egress --group-id $SG_ID --protocol all --port all --cidr 0.0.0.0/0
```

Verify security group rules:

```bash
aws ec2 describe-security-group-rules --filters Name=group-id,Values=$SG_ID --query 'SecurityGroupRules[*].[IpProtocol,FromPort,ToPort,CidrIpv4]' --output table
```

### 6. Redeploy App Runner Service

Start deployment:

```bash
aws apprunner start-deployment --service-arn YOUR_SERVICE_ARN
```

## Conclusion
By following these steps, you've successfully set up your AWS App Runner service to access S3 buckets. Each step includes a verification command to ensure the configuration was applied correctly. If any verification step fails, double-check the previous step's output for error messages.

Remember to:
* Replace placeholders (YOUR_SERVICE_ARN, YOUR_ACCOUNT_ID, YOUR_REGION) with your actual values
* Wait for each step to complete before proceeding to the next one
* Monitor the App Runner service logs if you encounter any issues
* Follow the principle of least privilege and refine the IAM permissions as needed for your specific use case