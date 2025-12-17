---
title: "MikroTik Dual WAN Failover & Policy-Based Routing"
author: admin
type: post
date: 2025-12-17T10:00:00+02:00
lead: "Configure dual-WAN failover and policy-based routing on MikroTik RouterOS v7 so your backup link takes over automatically and selected destinations always use a specific WAN."
categories: ["DevOps"]
description: "Step-by-step MikroTik RouterOS v7 CLI setup for dual WAN failover with route distances plus policy-based routing to force specific destinations via the secondary WAN."
---

# MikroTik RouterOS v7: Dual WAN Failover & Policy-Based Routing

If you have a MikroTik router and two internet connections (a primary high-speed line and a secondary backup line), you probably have two goals:

1.  **Automatic Failover:** If the Main Connection drops, the router should switch to the Backup Connection automatically.
2.  **Policy Routing:** You may want to force specific destinations (like a work server, a gaming server, or a specific streaming service) to *always* use the for example Backup Connection, regardless of the main connection status.

This guide covers how to set this up using **RouterOS v7** via the Command Line (CLI).

## The Scenario

* **Ether1 (WAN1):** Main Connection (Primary, Distance 1).
* **Ether5 (WAN2):** Backup Connection (Secondary, Distance 2).
* **Local Network:** 10.0.0.0/24.

## Step 1: Configure the Backup Interface (Ether5)

First, we need to configure the secondary interface (`ether5`) to accept an IP address via DHCP, but with a lower priority than the main connection.

In RouterOS, priority is determined by **Distance**. Lower numbers are preferred.
* **Main Connection:** Distance 1
* **Backup Connection:** Distance 2

### 1. Configure DHCP Client
Run the following commands to configure the DHCP client on ether5. Note that we set the `default-route-distance` to `2`.

```bash
/interface bridge port remove [find interface=ether5]
/ip dhcp-client add interface=ether5 disabled=no add-default-route=yes default-route-distance=2 use-peer-dns=no use-peer-ntp=no comment="WAN2 Backup"

```

*Note: If `ether5` was part of a bridge (LAN), the first command removes it so it can act as a WAN port.*

### 2. Configure NAT (Masquerade)

We need a NAT rule so traffic leaving `ether5` is properly translated.

```bash
/ip firewall nat add chain=srcnat out-interface=ether5 action=masquerade comment="NAT for WAN2"

```

## Step 2: Define the Specific Traffic (Address List)

Now we create a list of IP addresses that you want to force through the secondary connection (`ether5`). We will call this list `FORCE_WAN2`.

```bash
/ip firewall address-list
add list=FORCE_WAN2 address=1.1.1.1 comment="Example: Route 1.1.1.1 via WAN2"
add list=FORCE_WAN2 address=8.8.4.4 comment="Example: Route 8.8.4.4 via WAN2"

```

## Step 3: Configure Policy-Based Routing (PBR)

In RouterOS v7, PBR requires a specific Routing Table and Mangle rules.

### 1. Create a New Routing TableWe must declare the table before we can use it.

```bash
/routing table add name=via-wan2 fib

```

### 2. Mark the Traffic (Mangle)

We use the firewall to "tag" any traffic destined for an IP in our `FORCE_WAN2` list.

```bash
/ip firewall mangle
add chain=prerouting dst-address-list=FORCE_WAN2 action=mark-routing new-routing-mark=via-wan2 passthrough=yes comment="Mark traffic for WAN2"

```

### 3. Create the Route

Finally, we tell the router: *"If traffic is marked 'via-wan2', send it out the WAN2 gateway."*

**Important:** You need to know your Backup Gateway IP. You can find this by running `/ip dhcp-client print detail` and looking at the "gateway" field for ether5. In the command below, replace `[BACKUP_GATEWAY_IP]` with your actual gateway address.

```bash
/ip route
add dst-address=0.0.0.0/0 gateway=[BACKUP_GATEWAY_IP] routing-table=via-wan2 comment="Force specific list via WAN2"

```

## Step 4: Verification

### Verify Failover

Check your routing table:

```bash
/ip route print

```

You should see two default routes (`0.0.0.0/0`). The Main Connection route should be active (Distance 1), and the Backup Connection route should be inactive/backup (Distance 2).

### Verify Policy Routing

Run a traceroute from your computer to an IP in your list (e.g., 1.1.1.1):

* **Windows:** `tracert 1.1.1.1`
* **Mac/Linux:** `traceroute 1.1.1.1`

The first hop should be the Backup Connection's gateway IP, not the Main Connection's gateway.

---

## Cheatsheet:

Managing the IP ListOnce everything is running, you don't need to touch the routes or firewall rules. You simply add or remove IPs from the list.

**View the list:**

```bash
/ip firewall address-list print where list=FORCE_WAN2

```

**Add a new IP:**

```bash
/ip firewall address-list add list=FORCE_WAN2 address=192.0.2.55 comment="New Server"

```

**Remove an IP:**

```bash
/ip firewall address-list remove [find address=192.0.2.55 list=FORCE_WAN2]

```
