---
title: How slow is FOUND_ROWS function in MySQL
author: admin
type: post
date: 2016-01-25T04:15:16+00:00
url: /2016/how-slow-is-found_rows-function-in-mysql/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
dsq_thread_id:
  - 4520534537
categories:
  - Technologies
  - PHP
tags:
  - mysql
  - php
  - speeed

---
From many different reasons I was always using [SQL_CALC_FOUND_ROWS][1] to get total number of records, when i was running limited query. Never especially thought about it, until i had some super performance issues with one of my projects. Obviously after quick profiling and googling  i found [people complaining about FOUND_ROWS() low performance](http://stackoverflow.com/questions/186588/which-is-fastest-select-sql-calc-found-rows-from-table-or-select-count). I wasn’t aware how big impact it was until i tested.

<!--more-->

If you don&#8217;t know what FOUND_ROWS does &#8211; this is super simple example:

`SELECT SQL_CALC_FOUND_ROWS * FROM tbl_name WHERE id > 100 LIMIT 10;
SELECT FOUND_ROWS();`

as you can tell it&#8217;s nice and simple way to check total number of results from MySQL. The other way to do that is just run it like that:

`SELECT COUNT(pk) FROM tbl_name WHERE id > 100;`

Which is bit more complicated if you have queries like that:

```SELECT SQL_CALC_FOUND_ROWS import_date, photo, IF(ISNULL(p.formatted_address), CONCAT(street_number, " ", street_name, " ", street_type, ", ", suburb_name, " ", state, " ", postcode), formatted_address) AS formatted_address, beds, baths, cars, quote_price_low FROM `campaign` INNER JOIN `property` `p` ON `p`.`property_id` = `campaign`.`property_id` WHERE `campaign`.`import_date` >= '2015-12-25' AND `campaign`.`archive` =0 AND `campaign`.`sold` =0 AND `p`.`latitude` IS NOT NULL AND `p`.`longitude` IS NOT NULL AND (NOT EXISTS (SELECT * FROM general_dismiss WHERE general_dismiss.campaign_id = campaign.campaign_id) ) AND (NOT EXISTS (SELECT * FROM general_reject WHERE general_reject.campaign_id = campaign.campaign_id) ) AND (3959 * acos ( cos ( radians(-27.5649) ) * cos( radians( p.latitude ) ) * cos( radians( p.longitude ) - radians(152.968) ) + sin ( radians(-27.5649) ) * sin( radians( p.latitude ) ) ) ) <=5 ORDER BY `import_date` DESC LIMIT 10```

But&#8230; what&#8217;s the actual time difference between this 2 queries &#8211; in database having around 640k records in MySQL. First query &#8211;  `FOUND_ROWS` was taking around 7.3932 seconds to run, second one 0.5466.

I wrote quick function to help replace this tricky part in MySQL query

{{<gist slav123 29294ce1d86ba6602ad6>}}

 [1]: http://dev.mysql.com/doc/refman/5.7/en/information-functions.html#function_found-rows