---
title: DirectAdmin enable PUT and DELETE requests
author: admin
type: post
date: 2017-01-13T17:12:30+00:00
url: /2017/directadmin-enable-put-and-delete-requests/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
dsq_thread_id:
  - 5577618596
categories:
  - Open Source
  - PHP

---
Recently I&nbsp;realised that my [DirectAdmin](https://www.directadmin.com) hosting doesn&#8217;t support PUT and DELETE requests by default. Apparently it&#8217;s necessary to make requests to my recent [PrestaShop](https://www.prestashop.com/en/) API adventures. As usually quick and dirty solution below. All you need to do, just to drop it to custom configuration.
<!--more-->

_admin&nbsp;»&nbsp;Custom Httpd Configurations_

Code:

```
<Limit GET POST PUT DELETE OPTIONS PROPFIND>
 Order allow,deny
 Allow from all
</Limit>
<LimitExcept GET POST PUT DELETE OPTIONS PROPFIND>
 Order deny,allow
 Deny from all
</LimitExcept>
```

Visual reference:

![custom-httpd-config-2x](images/uploads/2017/01/custom-httpd-config-2x.png) 

Or there is another way. You can use code below and use it as on image:

```
<directory home="" admin="" domains="" inter-idea.pl="" private_html="">
    AllowMethods GET HEAD POST OPTIONS DELETE PUT
</directory>
```

![GET_POST_OPTIONS_directadmin](images/uploads/2019/12/GET_POST_OPTIONS_directadmin.png) 