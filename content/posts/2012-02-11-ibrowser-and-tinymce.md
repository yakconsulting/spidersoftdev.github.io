---
title: iBrowser and TinyMCE
author: admin
type: post
date: 2012-02-11T12:18:17+00:00
url: /2012/ibrowser-and-tinymce/
dsq_thread_id:
  - 1159415733
categories:
  - Blog
tags:
  - javascript
  - tinymce
  - wysiwyg

---
You can find plenty of tutorials how to setup tinyMCE and iBrowser, but non of them mention about common problems, like &#8220;error building image list!&#8221;, or how to bind regular image browser to iBrowser. Here you can find full instructions.

<!--more-->

Firs thing first &#8211; download [iBrowser](http://www.net4visions.com/ibrowser.html), and [TinyMCE](http://www.tinymce.com/download/download.php). After that you need to of course unzip/untar everything. After this operation you will get TinyMCE installed, next step will by upload iBrowser to plugins directory. Be aware about lowercase in `iBrowser` directory name. Finally, you should get something like this: `/plugins/iBrowser` with all iBrowser files.

Remember about permission on this two directories:


```
iBrowser/scripts/phpThumb/cache
iBrowser/temp
```


Basic configuration of iBrowser:

```
$cfg['ilibs'] = array (	
	array ( 
		'value'	=> '/uploads/images/',  				 
		'text'	=> 'Site Pictures',
	),
	array ( 
		'value'	=> '/uploads/gallery/', 				
		'text'	=> 'Gallery',
	) 
);
```


Be aware that this is not ABSOLUTE path, it&#8217;s relative to DOCUMENT_ROOT value.  
So&#8230; if you absolute to upload images is `/var/www/html/data/uploads/images/` and document root is `/var/www/html/data` path to images should be `/uploads/images/`

I recommend to cleanup `cache` folder because there are plenty of old files there.  
Lets move with TinyMCE configuration.

What is our goal? We want to get additional button to upload images via iBrowser:

![t1](/images/2012/02/t1.png)

And second goal is to extend default image browser with &#8220;browse&#8221; function:

![t2](/images/2012/02/t2.png)
[ibrowser-and-tinymce](/2012/ibrowser-and-tinymce/t2/)

Basic configuration:

```
plugins: "ibrowser",
theme_advanced_buttons2 : "image,ibrowser",
file_browser_callback : 'myFileBrowser',
relative_urls : false,
remove_script_host : false,
```

and create callback for **myFileBrowser**

```
function myFileBrowser (field_name, url, type, win) {

    var cmsURL = '/js/tiny_mce/plugins/ibrowser/ibrowser.php'    // script URL - use an absolute path!
    if (cmsURL.indexOf("?") < 0) {
        //add the type as the only query parameter
        cmsURL = cmsURL + "?type=" + type;
    }
    else {
        //add the type as an additional query parameter
        // (PHP session ID is now included if there is one at all)
        cmsURL = cmsURL + "&type=" + type;
    }

    tinyMCE.activeEditor.windowManager.open({
        file : cmsURL,
        title : 'My File Browser',
        width : 660,  // Your dimensions may differ - toy around with them!
        height : 460,
        resizable : "no",
        inline : "yes",  // This parameter only has an effect if you use the inlinepopups plugin!
        close_previous : "yes"
    }, {
        window : win,
        input : field_name
    });
    return false;
  }

```

Final effect:  
![t2](/images/2012/02/t3.png)

[ibrowser-and-tinymce](http://www.spidersoft.com.au/2012/ibrowser-and-tinymce/t3/)