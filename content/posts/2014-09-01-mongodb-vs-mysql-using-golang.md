---
title: MongoDB vs MySQL using golang
author: admin
type: post
date: 2014-09-01T04:48:36+00:00
url: /2014/mongodb-vs-mysql-using-golang/
thumbnail: images/2014/09/mongo-vs-mysql.jpg
dsq_thread_id:
  - 2977645860
categories:
  - Go Lang
  - DevOps
tags:
  - fo
  - golang
  - mongodb
  - mysql

---
I&#8217;m the guy who like to test. Benchmark is my&#8230; middle name. You can find dozens articles about speed one or other solution. I mean [MongoDB][1] and [MySQL][2]. I tried MongoDB couple times, and each time I wasn&#8217;t  moved by it speed. Got project coming in, when I have to deal with large amount of concurrent connection. It&#8217;s not very big, but bigger then casual MySQL load.

So&#8230; how did I test &#8211; very dump way. Got 2 tables, one around 11k records, second one close to 200k record. Not much. Fields were indexed in both MySQL and MongoDB. And then i run benchmarks. First one had string fields, second one numeric.

<!--more-->

## Testing procedure

It&#8217;s not very sophisticated. With MySQL we have query like that `SELECT something FROM table WHERE key=?` (not primary) and with MongoDB pretty mych the same: `Find({key:string_value})`. Again &#8211; it&#8217;s not primary &#8211; it&#8217;s indexed field.

Both of them running in the same machine &#8211; my Mac Book Pro with SSD drives. Code is lunched from golang.

Measuring code is pretty ugly:

```
t0 := time.Now()
for i := 0; i < loop; i++ {
	getmongo()
}
t1 := time.Now()
fmt.Printf("The mongo 1 call took %v to run.\n\n", t1.Sub(t0))
```

and for MongoDB

```
t0 = time.Now()
	for i := 0; i < loop; i++ {
		getmysql()
	}
	t1 = time.Now()
	fmt.Printf("The mysql 1 call took %v to run.\n", t1.Sub(t0))
```

Let&#8217;s see results:

## Running queries

```
The mongo 1 call took 2.230508ms to run.
The mysql 1 call took 900.2us to run.
------------------
The mongo 2 call took 1.229932ms to run.
The mysql 2 call took 718.89us to run.
```

Surprise surprise &#8211; MySQL is much more faster then MongoDB. Let&#8217;s run the same query 100 times.

```
The mongo 1 call took 85.661532ms to run.
The mysql 1 call took 56.858658ms to run.
------------------
The mongo 2 call took 89.683713ms to run.
The mysql 2 call took 54.091382ms to run.
```

Again &#8211; MySQL wins. So&#8230; where is the catch ? Let&#8217;s run the same query 500 times

```
The mongo 1 call took 396.514457ms to run.
The mysql 1 call took 254.117612ms to run.
------------------
The mongo 2 call took 409.387653ms to run.
The mysql 2 call took 269.543978ms to run.
```

It&#8217;s even worse. MongoDB still far behind. Let&#8217;s go crazy, and run the same query in parallel.

##  Concurrency

We are going to modify out code to run them as [go routines][3]:


```
t0 := time.Now()
    for i := 0; i < loop; i++ {
	go getmongo()
    }
    t1 := time.Now()
fmt.Printf("The mongo 1 call took %v to run.\n\n", t1.Sub(t0))
```

Let&#8217;s start with 100 in the same time:

```
The mongo 1 call took 250.5us to run.
The mysql 1 call took 216.609us to run.
------------------
The mongo 2 call took 217.295us to run.
The mysql 2 call took 243.412us to run.
```

And 500

```
The mongo 1 call took 1.153202ms to run.
The mysql 1 call took 1.201624ms to run.
------------------
The mongo 2 call took 1.19199ms to run.
The mysql 2 call took 1.202942ms to run.
```


So&#8230; MongoDB is start leading, when we run the same query as a concurrent queries. But still&#8230; difference is bit small to be excited about.

## The Winner Is&#8230;

Unfortunately there is no winner here. If you are looking for an answer &#8220;what is better&#8221; the answer, will be &#8220;it depends&#8221;. MySQL is good enough for most of purposes. MongoDB is good when you don&#8217;t have fixed structure os just looking for easy way just to chunk data into storage.

 [1]: http://www.mongodb.org/
 [2]: http://www.mysql.com/
 [3]: http://www.golang-book.com/10/index.htm