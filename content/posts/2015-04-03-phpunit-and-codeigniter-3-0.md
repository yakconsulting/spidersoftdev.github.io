---
title: PHPUnit and CodeIgniter 3.0
author: admin
type: post
date: 2015-04-02T22:00:22+00:00
url: /2015/phpunit-and-codeigniter-3-0/
thumbnail: images/uploads/2015/04/codeigniter.png
dsq_thread_id:
  - 3651338496
categories:
  - PHP
  - Software
tags:
  - ci
  - codeigniter
  - php
  - phpunit

---
Quick tutorial how to setup proper unit testing with PHPUnit and CodeIgniter 3.0.  
We need couple elements

1. [CodeIgniter](http://www.codeigniter.com) – we are working with version 3.0rc3 
2. [PHPUnit](https://phpunit.de) – latest one

If you don&#8217;t have phpunit installed globally, you can go with composer, just add section to your `composer.json`

```
{
  "require-dev": {
    "phpunit/phpunit": "4.1.*"
  }
}
```


and then  
`composer.phar install`  
and after while we have  
`./vendor/bin/phpunit`  
working phpunit.

let&#8217;s create `phpunit.xml.dist`

{{< gist slav123 554d0a4ce91c8a0a68fe >}}

next step will require create separate bootstrap file for PHPUnit. Just copy `cp index.php tests/Bootstrap.php`  
We have to make 2 small amends.

  * update `$system_path = '../system';` and `$application_folder = '../application';`
  * change environment to testing `define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'testing');`

CI is pretty bad with PHPUnit by default &#8211; so we need to modify one more element &#8211; output library.

Let&#8217;s enable hooks &#8211;  `$config['enable_hooks'] = TRUE;` in **application/config/config.php** create a hook in **application/config/hooks.php**

```
$hook['display_override'] = array(
    'class' => 'DisplayHook',
    'function' => 'captureOutput',
    'filename' => 'DisplayHook.php',
    'filepath' => 'hooks'
  );
```

Actual hook code &#8211; **application/hooks/DisplayHook.php**

```
class DisplayHook
{
	public function captureOutput()
	{
		$this->CI =& get_instance();
		$output = $this->CI->output->get_output();

		if (ENVIRONMENT != 'testing') {
			echo $output;
		}
	}
}
```


And finally we can create out first test:

{{< gist slav123 f4014b4f3a6366de19eb >}}


And we can see if it works:

```
./vendor/bin/phpunit

PHPUnit 4.1.6 by Sebastian Bergmann.

Configuration read from /Library/WebServer/Documents/coreadvisory/scraper/phpunit.xml.dist

.

Time: 117 ms, Memory: 5.00Mb

OK (1 test, 1 assertion)
```


Sources:

[taiar.github.io/php/2013/11/08/testing-codeigniter-applications-with-phpunit.html](http://taiar.github.io/php/2013/11/08/testing-codeigniter-applications-with-phpunit.html