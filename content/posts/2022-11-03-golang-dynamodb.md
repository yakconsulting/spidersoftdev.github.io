---
title: Golang and DynamoDB 
lead: How to put data into dynamodb
author: admin
type: post
date: 2022-11-03T08:30:00+00:00
url: /2022/how-to-populate-dynamodb-with-golang
thumbnail: /images/2014/08/gopher.jpg
description: Overcome DynamoDB hesitations & migrate from costly S3 with our expert tips on storing JSON data securely
categories:
- Technologies
- Go lang
---
I have been avoiding [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) for a long time. Each time I tried to use it, either with PHP or GoLang always gave up very quickly.
A while ago, I built up a solution storing a lot of JSON files on S3 buckets, and the costs of this solution (number of GET requests) started to escalate very quickly. I decided to try to migrate data to DynamoDB, and this time I was successful. I will try to explain how I did it and what I learned along the way.

<!--more-->

Generic documentation is not very clear about storing data without using "weird" notation of objects, so I thought this was the only way to go.

## PutItem
If you go along documentation basic `PutItem` could look like this:

```GO
   out, err := svc.PutItem(context.TODO(), &dynamodb.PutItemInput{
        TableName: aws.String("my-table"),
        Item: map[string]types.AttributeValue{
            "id":    &types.AttributeValueMemberN{Value: 12346},
            "name":  &types.AttributeValueMemberS{Value: "John Doe"},
            "email": &types.AttributeValueMemberS{Value: "john@doe.com"},
        },
    })
```
It doesn't look very convenient to me. But if you go deeper in the documentation you can find something 
[table_basics.go](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/gov2/dynamodb/actions/table_basics.go) which is using [attributevalue](https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue#MarshalMapWithOptions).

This magical liberate allows you to marshal your struct into a map of `AttributeValue`, and you have can also power of annotations to pass additional meta value to your marshaller:

```GO

    import (
        "github.com/aws/aws-sdk-go-v2/aws"
        "github.com/aws/aws-sdk-go-v2/config"
        "github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
        "github.com/aws/aws-sdk-go-v2/service/dynamodb"
    )

    type ItemStruct struct {
        ID    int    `dynamodbav:"id"`
        Name  string `dynamodbav:"name"`
        Email string `dynamodbav:"email"`
    }
	
	var myItem ItemStruct

	myItem.ID = 12346
	myItem.Name = "John Doe"
	myItem.Email = "john@doe.io"
				
    item, err := attributevalue.MarshalMapWithOptions(myItem)
	if err != nil {
		panic(err)
	}
	_, err = basics.DynamoDbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(basics.TableName), Item: item,
	})
	if err != nil {
		log.Printf("Couldn't add item to table. Here's why: %v\n", err)
	}
	return err
}

```

Looks much better, right?