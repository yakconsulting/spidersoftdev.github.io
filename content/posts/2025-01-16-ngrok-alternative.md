---
title: "Setting Up Cloudflare Tunnel: A Modern Alternative to Ngrok"
author: admin
type: post
date: 2025-01-16T10:00:00+00:00
thumbnail: /images/2025/01/cloudflare-tunnel.png
lead: "Learn how to securely expose your local services using Cloudflare Tunnel"
categories: ["DevOps", "Security", "Web Development"]
keywords: ["cloudflare tunnel", "ngrok alternative", "local development", "secure tunnel", "cloudflared", "web security"]
description: "Discover how to use Cloudflare Tunnel as a secure and reliable alternative to ngrok for exposing your local development environment"
---

# Quick and Free Way to Share Your Local Docker Service with Clients

Ever been in that situation where you've built something cool in Docker and want to quickly show it to your client? Yeah, me too. Recently, I was wrapping up a database admin panel project and needed a way to let my client review it before the final deployment.

My go-to solution used to be Ngrok. It works, but the free tier gives you random URLs that look like `8f4d-192-158-1-38.ngrok.io`. Not very professional when sending to clients, right? Plus, these URLs change every time you restart the tunnel.

## Enter Cloudflare Tunnels 

After some digging, I found that Cloudflare offers a free tunneling service that lets you use your own domain. Here's how I set it up in just a few minutes:

1. First things first, installed cloudflared:
```bash
brew install cloudflared
```

2. Authenticated with Cloudflare (just one command and a browser login):
```bash
cloudflared login
```

3. Created and configured the tunnel:
```bash
cloudflared tunnel create mytunnel
cloudflared tunnel route dns mytunnel myservice.mydomain.com
```

4. Connected my Docker service running on port 8888:
```bash
cloudflared tunnel run --url http://localhost:8888 mytunnel
```

And that was it! My client could now access the service at `myservice.mydomain.com`. No more awkward URLs, no time limits, and no port restrictions.

## The Cherry on Top

The best part? When I'm done with the review, cleaning up is just as simple:
```bash
cloudflared tunnel cleanup mytunnel
cloudflared tunnel route dns delete myservice.mydomain.com
cloudflared tunnel delete mytunnel
```

This whole setup probably saved me more time than writing this post. If you're building and showing stuff to clients regularly, give it a try. Your clients will appreciate the professional touch of a proper domain name, and your wallet will appreciate not having to pay for yet another service.

*Pro tip: You can even set up a permanent configuration file if you find yourself doing this often. But that's a story for another post!*