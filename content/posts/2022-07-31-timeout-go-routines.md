---
title: How to implement timeout in go routines 
lead: Go lang simple workers with timeout using context
author: admin
type: post
date: 2022-07-29T08:30:00+00:00
url: /2022/go-lang-simple-workers-with-timeout-using-context
thumbnail: /images/2014/08/gopher.jpg
categories:
- Technologies
- Go Lang
tags:
- context
- routines
---

I wanted to implement a timeout in go routines. There are a couple o ways doing that. We could use `context.WithTimeout()` or we go with classical `sync.WaitGroup` group with a trick. 

Let's start with the first one.

<!--more-->

## context timeout

Let's start with creating a context with a timeout.

```go
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
    defer cancel()
```

and a couple of channels:

```go
    jobs := make(chan int, noOfJobs)
    results := make(chan int, noOfJobs)
    quitCh := make(chan bool, 1)
```

I assume to spin up a couple of workers, to consume jobs, and one collector to collect all results:

```go
    for w := 1; w <= noOfWorkers; w++ {
        go worker(w, jobs, results)
    }
	
    go collector(ctx, results, quitCh)
```

and finally, let us send some things to do:

```go 
    for a := 1; a <= noOfJobs; a++ {
        jobs <- a
    }

    <-quitCh
	
    fmt.Printf("globalResult: %v\n", globalResult)
```

How the worker works, it's pretty straightforward. We get jobs from the `job` channel and push out results to `results` channel.

```go
func worker(id int, job <-chan int, results chan<- int) {
    for j := range job {
        fmt.Printf("worker %d started job %d\n", id, j)
        time.Sleep(time.Second)
        fmt.Printf("worker %d finished job %d\n", id, j)
        results <- j
	}
}

```

Collector is more sophisticated. We run in an infinite loop, collecting that from the channel. Two options to break it is either to collect all results (length of `globalResults` is equal to `noOfJobs`), or we get a timeout, and we are using `quitCh` as a way to send a close message.

```go
func collector(ctx context.Context, results <-chan int, quitCh chan<- bool) {
	for {
		select {
		case j := <-results:
			fmt.Printf("result: %d\n", j)
			globalResult = append(globalResult, j)
			// check if we are done
			if len(globalResult) == noOfJobs {
				println("full")
				quitCh <- true
			}
		case <-ctx.Done():
			println("ctx done")
			quitCh <- true
			break
		}
	}
}
```

Complete code here

{{< gist slav123 ddc836d99a3f20d7069df51ccbfb0039 >}}

## wait group


The second approach is not mine but works in simpler cases:

{{< gist x32net b060828f9e1be671b4c94036ea9ef553 >}}

