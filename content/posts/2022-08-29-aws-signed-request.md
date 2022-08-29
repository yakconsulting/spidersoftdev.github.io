---
title: How to create AWS Signature on GET POST request 
lead: Signing request with AWS Signature
author: admin
type: post
date: 2022-08-29T08:30:00+00:00
url: /2022/aws-signature-request
thumbnail: /images/2014/08/gopher.jpg
categories:
- Technologies
- Go Lang
tags:
- aws
- api
---

Postman, it's a great tool for debuging, testing and other activities performed by us - developers. It has a build in option to sign requestes with [AWS Signature](https://learning.postman.com/docs/sending-requests/authorization/#aws-signature). We do have [AWS SDK for Go v2](https://github.com/aws/aws-sdk-go-v2), but I couldn't find any good examples except a [test file](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/signer/v4/v4_test.go). The other useful file will be [const.go](https://github.com/aws/aws-sdk-go-v2/blob/main/aws/signer/internal/v4/const.go) where we can find a couple of interesting variables.  

<!--more-->

Code for making a query look like that (this part is for GET query). Actions happening here:

1. we create a reader for the body (for POST requests)
2. we `buildRequest` which enriches our request with some extra headers
3. we send our request via standard `http.Client`

```GO

func getQuery(body string, debug bool) (string, error) {

	var credentials = aws.Credentials{AccessKeyID: "AccessKeyID", SecretAccessKey: "SecretAccessKey"}

	reader := strings.NewReader(body)

	req, body, err := buildRequest(fmt.Sprintf("%s/v1/item/%s", apiUrl, clientUUID), reader, "GET")

	query := req.URL.Query()
	req.URL.RawQuery = query.Encode()

	signer := v4.NewSigner()

	err = signer.SignHTTP(context.Background(), credentials, req, body, service, region, time.Now())
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	if debug {
		fmt.Printf("%s\n", req.URL.String())
	}

	// An HTTP client for sending the request
	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		fmt.Print(err)
		return "", err
	}

	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {

		// Check if server sent gzipped response. Decompress if yes.
		var respReader io.ReadCloser
		switch resp.Header.Get("Content-Encoding") {
		case "gzip":
			respReader, err = gzip.NewReader(resp.Body)
			defer respReader.Close()
		default:
			respReader = resp.Body
		}

		bodyString, err := ioutil.ReadAll(respReader)
		if err != nil {
			fmt.Print(err)
			return "", err
		}

		fmt.Printf("%s\n", string(bodyString))
		return string(bodyString), nil
	}
	return "", nil
}
```

Let's go with builiding request to enrich our query:

```GO
// buildRequest builds an http.Request with the given body and method
func buildRequest(url string, body io.Reader, requestType string) (*http.Request, string, error) {
    const (
        TimeFormat        = "20060102T150405Z"
	    EmptyStringSHA256 = `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
    )

	var bodyLen int
	type lenner interface {
		Len() int
	}
	if lr, ok := body.(lenner); ok {
		bodyLen = lr.Len()
	}
	req, err := http.NewRequest(requestType, url, body)
	if err != nil {
		return nil, "", err
	}
	if bodyLen > 0 {
		req.ContentLength = int64(bodyLen)
	}

	req.Header.Add("X-Amz-Date", time.Now().UTC().Format(TimeFormat))
	req.Header.Add("date", time.Now().UTC().Format(TimeFormat))

	var payloadHash string

	if bodyLen == 0 {
		payloadHash = EmptyStringSHA256
	} else {
		h := sha256.New()
		_, _ = io.Copy(h, body)
		payloadHash = hex.EncodeToString(h.Sum(nil))
	}

	return req, payloadHash, nil
}
```

A couple of interesting things are happening here. We must determine if this is a `POST` or `GET` query. If it's a GET query, we have to use `EmptyStringSHA256` from the `const.go` file mentioned before. Also, we are going to utilise `TimeFormat`

{{< gist slav123 ceb704ee99ccc1f2d2d6e3b1e8eccb26 >}}

