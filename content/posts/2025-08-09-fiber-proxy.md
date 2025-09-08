---
title: "How to Get Real Client IPs in Fiber When Using a Reverse Proxy"
author: admin
type: post
date: 2025-09-08T10:00:00+02:00
lead: "Build robust and modern HTTP servers in Go with practical code examples and best practices."
categories: ["Go Lang", "Web Development"]
keywords: ["golang", "http server", "golang tutorial", "web development"]
description: "A practical guide to solving the proxy IP problem in Fiber applications behind Caddy, Nginx, or Cloudflare. Learn proper configuration, security considerations, and debugging techniques."
---
# Getting Real Client IPs in Fiber Behind a Proxy

When your Fiber application runs behind a reverse proxy like Caddy, Nginx, or Cloudflare, you'll notice that `c.IP()` returns the proxy's IP address instead of your actual visitor's IP. This happens because Fiber sees the direct connection, which is from the proxy server, not the original client.

## Why This Happens

By default, Fiber reads the IP from the direct TCP connection for security reasons. Without proper configuration, it doesn't know there's a trusted proxy in front of it passing along the real client information in HTTP headers.

## The Solution

Configure Fiber to trust and read forwarded headers from your proxy. Most reverse proxies add headers like `X-Forwarded-For` that contain the original client IP.

```go
app := fiber.New(fiber.Config{
    EnableTrustedProxyCheck: true,
    TrustedProxies: []string{
        "172.16.0.0/12", // Docker's default range
        "10.0.0.0/8",    // Another common Docker range
    },
    ProxyHeader: fiber.HeaderXForwardedFor,
})

app.Get("/", func(c *fiber.Ctx) error {
    ip := c.IP() // Now returns the real client IP
    return c.SendString("Your IP: " + ip)
})
```

## Configuration Explained

Each setting serves a specific security purpose:

| Setting | Purpose | Details |
|---------|---------|---------|
| `EnableTrustedProxyCheck` | Activates proxy header reading | Must be `true` to read forwarded headers |
| `TrustedProxies` | Defines which proxies to trust | Only these IPs can set client headers, preventing spoofing |
| `ProxyHeader` | Specifies the header with client IP | Usually `X-Forwarded-For`, sometimes `X-Real-IP` |

## Common Proxy Scenarios

Different environments require different trusted IP ranges. Here are the most common setups:

**Local Docker Development:**
```go
TrustedProxies: []string{
    "172.16.0.0/12", // Docker bridge networks
    "10.0.0.0/8",    // Docker swarm/compose networks
    "127.0.0.1",     // Localhost
}
```

**Behind Cloudflare:**
```go
TrustedProxies: []string{
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    // Get full list from Cloudflare's IP ranges page
}
```

**Quick Development Setup (Not for Production):**
```go
TrustedProxies: []string{"*"} // Trusts all - security risk!
```

## Finding Your Docker Network Range

When running in Docker, you need to know your container network's IP range. Here's how to find it:

```bash
# For the default bridge network
docker network inspect bridge

# For docker-compose projects
docker network ls
docker network inspect yourproject_default
```

Look for the "Subnet" value in the IPAM configuration:
```json
"IPAM": {
    "Config": [
        {
            "Subnet": "172.18.0.0/16"  // Use this in TrustedProxies
        }
    ]
}
```

## Debugging IP Detection

When things aren't working as expected, add this debug endpoint to see what headers your proxy is actually sending:

```go
app.Get("/debug/headers", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "detected_ip":     c.IP(),
        "forwarded_for":   c.Get("X-Forwarded-For"),
        "real_ip":         c.Get("X-Real-IP"),
        "cf_connecting":   c.Get("CF-Connecting-IP"), // Cloudflare
        "direct_connection": c.Context().RemoteAddr().String(),
    })
})
```

This endpoint reveals exactly what Fiber sees, helping you identify if headers are missing or if trust configuration is incorrect.

## Multiple Proxies (Chain)

When traffic passes through multiple proxies (like Cloudflare → Nginx → Your App), the `X-Forwarded-For` header accumulates IPs:

```
X-Forwarded-For: real-client-ip, cloudflare-ip, nginx-ip
```

Fiber automatically parses this chain and extracts the original client IP when properly configured.

## Security Considerations

**Never use `TrustedProxies: ["*"]` in production.** This allows anyone to spoof their IP address by sending fake `X-Forwarded-For` headers. Always specify the exact IP ranges of your infrastructure.

For production environments, be specific about which proxies you trust. This prevents malicious users from bypassing IP-based rate limiting or geographic restrictions.

## Quick Troubleshooting Checklist

If client IPs aren't working correctly, verify:

✓ `EnableTrustedProxyCheck` is set to `true`  
✓ Your proxy's IP is within `TrustedProxies` ranges  
✓ The proxy is actually sending `X-Forwarded-For` headers  
✓ You're using the correct `ProxyHeader` for your proxy  
✓ No firewall or network policy is stripping headers  

Most issues come from either missing the `EnableTrustedProxyCheck` setting or using incorrect IP ranges in `TrustedProxies`.