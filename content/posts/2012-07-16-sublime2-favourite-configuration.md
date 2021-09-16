---
title: Sublime2 favourite configuration
author: admin
type: post
date: 2012-07-16T11:01:01+00:00
url: /2012/sublime2-favourite-configuration/
thumbnail: images/2012/07/sublime.png
layout:
  - default
hide_post_title:
  - default
unlink_post_title:
  - default
hide_post_meta:
  - default
hide_post_date:
  - default
hide_post_image:
  - default
unlink_post_image:
  - default
dsq_thread_id:
  - 1164729504
categories:
  - Blog
tags:
  - editor
  - ide

---
As long as I&#8217;m not huge fan of [Sublime Text 2](http://www.sublimetext.com/) &#8211; I have to admin it&#8217;s really fast. This is the fastest editor which I ever seen. So &#8211; for quick edit I&#8217;m usually using it. But there are 2 annoying default settings which I really can&#8217;t stand: opening each file in new tab, and moving to the end of the file on &#8220;end&#8221; keystroke. Finally I founded how to solve my daily problem.

<!--more-->

This set of changes in `.sublime-settings` file solves my problems with tabs and autoIdent default preferences:

```
{
  "autoIndent": true,
  "open_files_in_new_window": false,
  "tab_size": 4,
  "translate_tabs_to_spaces": false
}
```

and second set in `.sublime-keymap` solves my problems with `end` and `home`

```
{ "keys": ["home"], "command": "move_to", "args": {"to": "hardbol", "extend": false} },
{ "keys": ["end"], "command": "move_to", "args": {"to": "hardeol", "extend": false} }
```