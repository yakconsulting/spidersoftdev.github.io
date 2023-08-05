---
title: Setting up Prometheus to collect Caddy metrics
author: admin
type: draft
date: 2022-07-23T08:30:00+00:00
url: /2022/setting-up-prometheus-to-collect-caddy-metrics
lead: Prometheus and Caddy-metrics
thumbnail: /images/2014/08/gopher.jpg
categories:
- Technologies
- Go Lang
- DevOps
tags:
- caddy
- metrics
- prometheus
---
This is a simple example of how to setup Prometheus to collect Caddy metrics.
<!--more-->

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz
tar zxvf prometheus-2.37.0.linux-amd64.tar.gz
cd prometheus-2.37.0.linux-amd64
nano prometheus.yaml
```

```yaml
# prometheus.yaml
global:
  scrape_interval: 15s # default is 1 minute

scrape_configs:
  - job_name: caddy
    static_configs:
      - targets: ['localhost:2019']
```

```bash
./prometheus --config.file=prometheus.yaml --web.listen-address=:8080
```



