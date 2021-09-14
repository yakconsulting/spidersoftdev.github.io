---
title: CodeIgniter Uploadify problem
author: admin
type: post
date: 2012-01-01T02:37:27+00:00
url: /2012/codeigniter-uploadify-problem/
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
  - 1160143198
categories:
  - Blog
tags:
  - codeigniter
  - php
  - uploadify

---
I tried to implement Uploadify with [CodeIgniter upload class][1], and had some issues with recognising proper mime types.

<!--more--> First issue was solved by extending 

`application/config/mimes.php` with code:

<pre class="brush: php; title: ; notranslate" title="">'gif'	=>	array('image/gif','application/octet-stream'),
'jpeg'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'jpg'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'jpe'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'png'	=>	array('image/png',  'image/x-png', 'application/octet-stream'),
</pre>

You also need to extend `Upload.php` by uploading this extension:  
<a class="button large red rect" href="http://commondatastorage.googleapis.com/spiderbucket/sources/MY_Upload.php" target="_blank">Download</a>  
to `application/libraries`

Result from controller should looks like this

<pre class="brush: php; title: ; notranslate" title="">if ( ! $this->upload->do_upload('Filedata')) {
                $error = array('error' => $this->upload->display_errors());
        } else {
                $data = $this->upload->data();
        }

$return = array('name' => $data['file_name'],
                'size' => round($data['file_size'] * 100),
                'type' => $data['file_type']);

echo json_encode(array('Filedata' => $return));
</pre>

 [1]: http://codeigniter.com/user_guide/libraries/file_uploading.html