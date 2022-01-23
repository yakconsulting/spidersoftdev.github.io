---
title: Docker, GO and CGO application build
author: admin
type: post
date: 2021-07-23T06:16:24+00:00
url: /2021/docker-go-cgo
thumbnail: images/2014/08/gopher.jpg
categories:
  - Technologies
  - Go Lang
tags:
  - go
  - golang
  - docker
  - vips
  - image
---

I’ve been avoid Docker for a very long time. I started my career as a sysadmin setting up servers running FreeBSD and early versions of Debian on bare-bone servers. As soon as “cloud” came into to the market I switch to AWS, and GCE and have been using them since then. EC2 was my always goto choice to quickly deploy something on the internet. But Docker — from some reason I was avoiding it until this 2 years ago, when I actually started using it. Without to much trust but…

But today history is not about my love & hate relationship with docker, but about trying to deploy Go application and VIPS library. Couple problems appeared during the process and it’s worth mentioning it for future generations because could find much help around my issues.
<!--more-->

## So… you think you can get away with golang:alpine building go GCO app?
Ain’t gonna happen. Why? Without going into details — because alpine is “lightweight” version of linux, and it does not contain all necessary tools to properly build and run applications with CGO bindings.

## How to pimp up your docker image with never versions of packages
Long story short: golang:latest is build on Debian buster, and it contains pretty old version of VIPS — I figure out, that I can update it with never version coming from “bullseye” distribution. Because we can’t just hack our image with modifying image, the way to go is to install software-properties-common and then add bullseye repository before installing actual dependencies. It works :)

```DOCKER
FROM golang:latest AS base

RUN apt-get update && \
    apt-get -y --no-install-recommends install software-properties-common && \
    add-apt-repository "deb http://httpredir.debian.org/debian bullseye main" && \
    apt-get update && \
    apt-get -qq install -y libvips-dev && rm -rf /var/lib/apt/lists/*

```

## Making sure about correct build architecture
So… As I mentioned before I do have M1 chip, so without setting up anything “default” GOARCH is arm64 — I wasn’t aware of that until I couldn’t run it on my “regular” Intel based server.

```DOCKER
FROM base AS build
ARG TARGETOS
ARG TARGETARCH
ENV CGO_ENABLED=1
ENV TARGETOS=linux
ENV TARGETARCH=amd64
ENV PKG_CONFIG_PATH="/usr/lib/pkgconfig"
ENV CC=gcc

RUN --mount=target=. --mount=type=cache,target=/root/.cache/go-build \
GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o /out/worker cmd/worker/main.go
```