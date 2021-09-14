---
title: XCache vs APC PHP 5.4.x
author: admin
type: post
date: 2015-04-24T08:13:23+00:00
url: /2015/xcache-vs-apc-php-5-4-x/
thumbnail: images/uploads/2014/08/php-logo.png
dsq_thread_id:
  - 3707943134
categories:
  - Linux
  - PHP

---
Recently I&nbsp;decided to run some upgrades on my servers, and go up to PHP 5.5. I&#8217;ve been using [APC](http://pecl.php.net/package/APC) for a while (convenience) &#8211; usually is also bundled with all available repositories, or you can just grab it via PECL. Before that I was always with [XCache](http://xcache.lighttpd.net/). But&#8230; as long APC is no lonager maintained (last upgrade 2012) I make a call about going to XCache. Run some benchmarks, and here what we got.

<!--more-->

Testing hardware:

2.3 GHz Intel Core i7 &#8211; 8GB of ram, SSD drives. Website which I was benchmarking was a have WordPress installation with multiple running scripts.

I run `ab -n 100 -c 20`

Here is what I&nbsp;got:

&nbsp;

<table dir="ltr" border="1" cellspacing="0" cellpadding="0">
  <colgroup> <col width="120"> <col width="100"> <col width="100"> <col width="100"> <col width="100"> <col width="100"> <col width="100"></colgroup> <tr>
    <td>
    </td>
    
    <td data-sheets-value="[null,2,&quot;ap-clean&quot;]">
      apache 1st
    </td>
    
    <td>
      apache 2nd
    </td>
    
    <td data-sheets-value="[null,2,&quot;xcache&quot;]">
      XCache 1st
    </td>
    
    <td>
      &nbsp;XCache 2nd
    </td>
    
    <td data-sheets-value="[null,2,&quot;apc&quot;]">
      APC 1st
    </td>
    
    <td>
      &nbsp;APC 2nd
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Time taken for tests&quot;]">
      Time taken for tests [seconds]
    </td>
    
    <td data-sheets-value="[null,3,null,11.11]">
      11.11
    </td>
    
    <td data-sheets-value="[null,3,null,11.11]">
      11.11
    </td>
    
    <td data-sheets-value="[null,3,null,9.029]">
      9.029
    </td>
    
    <td data-sheets-value="[null,3,null,9.073]">
      9.073
    </td>
    
    <td data-sheets-value="[null,3,null,5.474]">
      5.474
    </td>
    
    <td data-sheets-value="[null,3,null,5.343]">
      5.343
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Complete requests&quot;]">
      Complete requests
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
    
    <td data-sheets-value="[null,3,null,100]">
      100
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Failed requests&quot;]">
      Failed requests
    </td>
    
    <td data-sheets-value="[null,3,null,69]">
      69
    </td>
    
    <td data-sheets-value="[null,3,null,69]">
      69
    </td>
    
    <td data-sheets-value="[null,3,null,69]">
      69
    </td>
    
    <td data-sheets-value="[null,3,null,41]">
      41
    </td>
    
    <td data-sheets-value="[null,3,null,46]">
      46
    </td>
    
    <td data-sheets-value="[null,3,null,40]">
      40
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Requests per second&quot;]">
      Requests per second&nbsp;[#/sec] (mean)
    </td>
    
    <td data-sheets-value="[null,3,null,9]">
      9
    </td>
    
    <td data-sheets-value="[null,3,null,9]">
      9
    </td>
    
    <td data-sheets-value="[null,3,null,11.08]">
      11.08
    </td>
    
    <td data-sheets-value="[null,3,null,11.02]">
      11.02
    </td>
    
    <td data-sheets-value="[null,3,null,18.27]">
      18.27
    </td>
    
    <td data-sheets-value="[null,3,null,18.72]">
      18.72
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Time per request:&quot;]">
      Time per request:&nbsp;[ms] (mean)
    </td>
    
    <td data-sheets-value="[null,3,null,2221.978]">
      2221.978
    </td>
    
    <td data-sheets-value="[null,3,null,2221.978]">
      2221.978
    </td>
    
    <td data-sheets-value="[null,3,null,1805.76]">
      1805.76
    </td>
    
    <td data-sheets-value="[null,3,null,1814.617]">
      1814.617
    </td>
    
    <td data-sheets-value="[null,3,null,1094.74]">
      1094.74
    </td>
    
    <td data-sheets-value="[null,3,null,1068.568]">
      1068.568
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Transfer rate&quot;]">
      Transfer rate:[ms] (mean, across all concurrent requests)
    </td>
    
    <td data-sheets-value="[null,3,null,111.099]">
      111.099
    </td>
    
    <td data-sheets-value="[null,3,null,111.099]">
      111.099
    </td>
    
    <td data-sheets-value="[null,3,null,90.288]">
      90.288
    </td>
    
    <td data-sheets-value="[null,3,null,90.731]">
      90.731
    </td>
    
    <td data-sheets-value="[null,3,null,54.737]">
      54.737
    </td>
    
    <td data-sheets-value="[null,3,null,53.428]">
      53.428
    </td>
  </tr>
  
  <tr>
    <td data-sheets-value="[null,2,&quot;Transfer rate&quot;]">
      Transfer rate[Kbytes/sec] received
    </td>
    
    <td data-sheets-value="[null,3,null,420.67]">
      420.67
    </td>
    
    <td data-sheets-value="[null,3,null,420.67]">
      420.67
    </td>
    
    <td data-sheets-value="[null,3,null,517.63]">
      517.63
    </td>
    
    <td data-sheets-value="[null,3,null,515.11]">
      515.11
    </td>
    
    <td data-sheets-value="[null,3,null,853.83]">
      853.83
    </td>
    
    <td data-sheets-value="[null,3,null,874.73]">
      874.73
    </td>
  </tr>
</table>

&nbsp;

Surprisingly &nbsp;XCache is much slower then APC &#8211; I was expecting better results, but as long we are losing support for APC in PHP 5.5 doesn&#8217;t make any sense to keep it runing.