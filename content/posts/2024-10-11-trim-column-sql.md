---
title: How to trim data in column with sql
author: slav
type: post
date: 2024-10-11T10:06:56+00:00
url: /2024/trim-column-sql/
description: Trim newline characters from text fields in SQL database using trim() and replace() functions.

categories:
  - Software
---

To trim newline characters from a text field in SQL database, you can use the `trim()` function along with the `replace()` function. Here's how you can do it:

```SQL
UPDATE your_table
SET your_column = trim(replace(replace(your_column, char(10), ''), char(13), ''))
```

This SQL statement does the following:

`replace(your_column, char(10), '')` removes line feeds (LF, \n)

`replace(..., char(13), '')` removes carriage returns (CR, \r)

`trim(...)` removes any leading or trailing whitespace

This approach handles both Unix-style (LF) and Windows-style (CR+LF) line endings.

If you only want to remove newlines at the beginning and end of the text, but keep internal newlines, you can use:
```SQL
UPDATE your_table
SET your_column = trim(your_column, char(10) || char(13))
```

This version uses trim() with a second argument specifying the characters to trim.