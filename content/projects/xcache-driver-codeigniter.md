---
title: XCache driver CodeIgniter
author: admin
type: page
date: 2011-08-10T03:51:44+00:00
layout:
  - list-post
page_layout:
  - sidebar-none
hide_page_title:
  - default
section_categories:
  - default
display_content:
  - excerpt
hide_title:
  - default
hide_date:
  - default
hide_meta:
  - default
hide_image:
  - default
hide_navigation:
  - default
unlink_title:
  - default
unlink_image:
  - default
dsq_thread_id:
  - 1160841968

---
Here is a missing [XCache](http://xcache.lighttpd.net/) driver for [CodeIgniter Caching Class](http://codeigniter.com/user_guide/libraries/caching.html). All You need to do is to modify `/system/libraries/Cache/Cache.php` library and add additional Cache driver to drivers list:

<!--more-->

```
protected $valid_drivers = array('cache_apc', 'cache_file', 'cache_memcached', 'cache_dummy', 'cache_xcache');
```

Then you need to upload Cache_xcache.php file, to this directory: `/system/libraries/Cache/drivers/`

## Usage

Load cache drivers as usually:

`$this->load->driver('cache', array('adapter' => 'xcache'));`

and use as it

```
$this->cache->save('my_variable', array(0=>'data', 1=>'other data'));

print_r($this->cache->get('my_variable'));
```

Due to XCache limitations You can&#8217;t store objects in cache, but you can serialize them before saving 🙂

[Download from github](https://github.com/slav123/codeigniter-xcache)