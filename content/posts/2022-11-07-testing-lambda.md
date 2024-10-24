---
title: How to test golang written lambda function locally
author: admin
type: post
date: 2022-11-07T08:00:00+00:00
url: /2022/how-to-test-lambda-function-locally
thumbnail: /images/2014/08/gopher.jpg
categories:
- Technologies
- Go Lang
tags:
- aws
description: Learn how to test Golang AWS Lambda functions locally without Docker or dependencies. A simple guide to using awslambdarpc for lightweight, hassle-free Lambda testing.
---
For a while I was looking for an easy we to test my lambda functions written in golang locally. We have awesome tools like [LocalStack](https://localstack.cloud/) but this is not what I was looking for. I wanted to test my lambda function locally, without any dependencies. Something lighter without [Docker](https://www.docker.com/). I will show you how to do that.

<!--more-->

## Installation

You have to build the binary for your lambda function: `go build -v -gcflags='all=-N -l' main.go`. You have to export one variable `export _LAMBDA_SERVER_PORT=3000` and run the binary. That's it.

## Payload
Second step will be to create payload which will be sent to your lambda functions. You can define multiple fields in the payload, but the most important one is `body`. It will be passed to your lambda function as an input. You can also define `headers` and `queryStringParameters`. You can find more information about the payload [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format).

```JSON
{
  "Headers": {
    "Content-Type": "application/json"
  },
  "Body": "this body will be pushed to lambda function",
  "HTTPMethod": "POST"
}
```

If your body is more sophisticated, you can base64 encode it and pass it to the lambda function with 2 more parameters
```JSON 
    { "isBase64Encoded": false } 
```

## Testing

We only need one more ingredient: [awslambdarpc](https://github.com/blmayer/awslambdarpc)

Finally, you can send payload to your lambda function:

`~/go/bin/awslambdarpc -a localhost:3000 -e payload.json`
