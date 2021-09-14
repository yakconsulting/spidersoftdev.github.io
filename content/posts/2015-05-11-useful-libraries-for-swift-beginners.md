---
title: Useful libraries for SWIFT beginners
author: admin
type: post
date: 2015-05-11T06:45:01+00:00
url: /2015/useful-libraries-for-swift-beginners/
thumbnail: images/uploads/2015/05/swift.png
dsq_thread_id:
  - 3753589231
categories:
  - Swift
tags:
  - api
  - ios
  - rest
  - swift

---
Recently we started working with [Apple Swift][1] language. It&#8217;s pretty simple but very power full language. Learning curve is hard &#8211; because it&#8217;s pretty new language, but from the other hand it&#8217;s good &#8211; because there is a lot of freshmen questions on StackOverflow and plenty of articles .

Because most of the stuff is related with REST communication with APIs core of my software works with JSON objects. In general we are looking also something for HTTP communication, uploading files and so on.

<!--more-->

### Parsing JSON in SWIFT

Let&#8217;s start with JSON &#8211; [json-swift](https://github.com/dankogai/swift-json) and [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).

Both of them are giving super easy wrappers around parsing JSON streams.

Instead of

```
let JSONObject: AnyObject? = NSJSONSerialization.JSONObjectWithData(data, options: nil, error: nil)

if let username = (((JSONObject as? [AnyObject])?[0] as? [String: AnyObject])?["user"] as? [String: AnyObject])?["name"] as? String {
    // ... do your job
}
```

With:Swifty

```
let json = JSON(data: dataFromNetworking)
if let userName = json[0]["user"]["name"].string{
  // ... much cleaner 
}
```


&nbsp;

### Making REST API Calls

[Alamofire](https://github.com/Alamofire/Alamofire) is an HTTP networking library written in Swift.

Calls are so easy as:

```
request(.GET, "http://mygetrequesturl.com").responseString { (_, _, string, _) in
println(string)
```


### Uploading file directly from imagePickerController

And small bonus. I wanted to upload image directly to from imagePickerController &#8211; here is a recipe.

{{< gist slav123 5bc82bb48749ac13926a >}}

 [1]: https://developer.apple.com/swift/