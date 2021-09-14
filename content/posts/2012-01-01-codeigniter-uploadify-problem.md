---
title: CodeIgniter Uploadify problem
author: admin
type: post
date: 2012-01-01T02:37:27+00:00
url: /2012/codeigniter-uploadify-problem/
dsq_thread_id:
  - 1160143198
categories:
  - Blog
tags:
  - codeigniter
  - php

---
I tried to implement Uploadify with [CodeIgniter upload class][1], and had some issues with recognising proper mime types.

<!--more--> First issue was solved by extending 

`application/config/mimes.php` with code:

```
'gif'	=>	array('image/gif','application/octet-stream'),
'jpeg'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'jpg'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'jpe'	=>	array('image/jpeg', 'image/pjpeg', 'application/octet-stream'),
'png'	=>	array('image/png',  'image/x-png', 'application/octet-stream'),
```

You also need to extend `Upload.php` by uploading this extension:  
[MY_Upload.php](http://commondatastorage.googleapis.com/spiderbucket/sources/MY_Upload.php)  
to `application/libraries`

Result from controller should look like this

```
if ( ! $this->upload->do_upload('Filedata')) {
                $error = array('error' => $this->upload->display_errors());
        } else {
                $data = $this->upload->data();
        }

$return = array('name' => $data['file_name'],
                'size' => round($data['file_size'] * 100),
                'type' => $data['file_type']);

echo json_encode(array('Filedata' => $return));
```


 [1]: http://codeigniter.com/user_guide/libraries/file_uploading.html