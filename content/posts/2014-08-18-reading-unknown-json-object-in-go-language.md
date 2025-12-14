---
title: Reading unknown JSON object in go language
author: admin
type: post
date: 2014-08-18T07:19:08+00:00
lastmod: 2021-08-24
url: /2014/reading-unknown-json-object-in-go-language/
thumbnail: images/2014/08/gopher.jpg
dsq_thread_id:
  - 2945479591
categories:
  - Go Lang
tags:
  - golang
  - json

---
Exploring [The Go Language][1] is so much fun. Everything is brand new, and different then any other language. This time I&#8217;m going to show quick snippet which shows how to read JSON object with unknown structure, and map elements to something like hash table.

<!--more-->

  
Out JSON object looks pretty simple:

```JSON
{
    "created_at": null,
    "name": "product name",
    "object_id": 123,
    "price": "$180.91",
    "updated_at": null,
    "url": "http://www.google.com"
}
```

Let&#8217;s GO

```GO
func getrecord() {
	body := fetch("http://localhost/our.json")
	var f interface{}
	err := json.Unmarshal(body, &f)
	if err != nil {
		fmt.Println("error:", err)
	}
	fmt.Printf("%+v\n", f)
	m := f.(map[string]interface{})
	fmt.Printf("\n:%s:", m["price"])
```

}
```

 [1]: http://golang.org/