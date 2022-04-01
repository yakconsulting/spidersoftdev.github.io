---
title: Caddy & Error code SEC_ERROR_REVOKED_CERTIFICATE
author: admin
type: post
date: 2022-01-31T08:30:00+00:00
url: /2022/caddy-ssl-error
lead: How to deal with SEC_ERROR_REVOKED_CERTIFICATE
categories:
- Technologies
- Web Development
- Linux
tags:
- caddy

---
Recently I had a problem with my [Caddy server](https://caddyserver.com/). I wasn't aware that it's related to Caddy - the initial thought was that something went wrong with the SSL certificate. But I was wrong. The message was pretty "platonic"

`Error code: SEC_ERROR_REVOKED_CERTIFICATE`

<!--more-->

The issue was with the certificate, which didn't renew. I had to do a lot of research to find out what was wrong. I had not typical configuration: 

```
{
    on_demand_tls {
        ask      http://localhost:5555/check
        interval 2m
        burst    5
    }
}
```

Which means that you can point any domain to the server, and it will be served with the correct SSL certificate. The only condition is to pass checks on `http://localhost:5555/check` service. More details on this setup can be [found here](https://caddy.community/t/serving-tens-of-thousands-of-domains-over-https-with-caddy/11179).

After that I had also couple other services with standard like: 

```
domain.com {
    reverse_proxy 127.0.0.1:8085
}
```

But apparently, if it's `on_demend_tls`, all off domains in the configuration must pass this test. So I had to make sure that my regular domains also had to pass this test.


Just remove old certificates because this action forces Caddy to get new ones. They are located here:

`/root/.local/share/caddy/certificates/`