---
title: iBrowser and TinyMCE
author: admin
type: post
date: 2012-02-11T12:18:17+00:00
url: /2012/ibrowser-and-tinymce/
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

Firsting first &#8211; download [iBrowser](http://www.net4visions.com/ibrowser.html), and [TinyMCE](http://www.tinymce.com/download/download.php). After that you need to of course unzip/untar everything. After this operation you will get TinyMCE installed, next step will by upload iBrowser to plugins directory. Be aware about lowercase in `iBrowser` directory name. Finally you should get something like this: `/plugins/iBrowser` with all iBrowser files.

Remember about permission on this two directories:

<pre class="brush: plain; title: ; notranslate" title="">iBrowser/scripts/phpThumb/cache
iBrowser/temp
</pre>

Basic configuration of iBrowser:

<pre class="brush: php; title: ; notranslate" title="">$cfg['ilibs'] = array (	
	array ( 
		'value'	=> '/uploads/images/',  				 
		'text'	=> 'Site Pictures',
	),
	array ( 
		'value'	=> '/uploads/gallery/', 				
		'text'	=> 'Gallery',
	) 
);
</pre>

Be aware that this is not ABSOLUTE path, it&#8217;s relative to DOCUMENT_ROOT value.  
So&#8230; if you absolute to upload images is `/var/www/html/data/uploads/images/` and document root is `/var/www/html/data` path to images should be `/uploads/images/`

I recommend to cleanup `cache` folder because there are plenty of old files there.  
Lets move with TinyMCE configuration.

What is our goal? We want to get additional button to upload images via iBrowser:

<img loading="lazy" class="size-full wp-image-504" title="t1" src="http://www.spidersoft.com.au/wp-content/uploads/2012/02/t1.png" alt="" width="426" height="82" srcset="https://www.spidersoft.com.au/wp-content/uploads/2012/02/t1.png 426w,images/uploads/2012/02/t1-320x61.png 320w" sizes="(max-width: 426px) 100vw, 426px" /> 

And second goal is to extend default image browser with &#8220;browse&#8221; function:

[<img loading="lazy" class="size-full wp-image-505" title="t2" src="http://www.spidersoft.com.au/wp-content/uploads/2012/02/t2.png" alt="" width="470" height="376" srcset="https://www.spidersoft.com.au/wp-content/uploads/2012/02/t2.png 470w,images/uploads/2012/02/t2-300x240.png 300w" sizes="(max-width: 470px) 100vw, 470px" />](http://www.spidersoft.com.au/2012/ibrowser-and-tinymce/t2/)  
Basic configuration:

<pre class="brush: jscript; title: ; notranslate" title="">plugins: "ibrowser",
theme_advanced_buttons2 : "image,ibrowser",
file_browser_callback : 'myFileBrowser',
relative_urls : false,
remove_script_host : false,
</pre>

and create callback for **myFileBrowser**

<pre class="brush: jscript; title: ; notranslate" title="">function myFileBrowser (field_name, url, type, win) {

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

</pre>

Final effect:  
[<img loading="lazy" class="alignright size-medium wp-image-506" title="t3" src="http://www.spidersoft.com.au/wp-content/uploads/2012/02/t3-560x409.png" alt="" width="560" height="409" srcset="https://www.spidersoft.com.au/wp-content/uploads/2012/02/t3-560x409.png 560w,images/uploads/2012/02/t3-320x233.png 320w,images/uploads/2012/02/t3.png 673w" sizes="(max-width: 560px) 100vw, 560px" />](http://www.spidersoft.com.au/2012/ibrowser-and-tinymce/t3/)