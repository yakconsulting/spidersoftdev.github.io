---
title: Inline date edit with nojQuery
author: admin
type: post
date: 2021-09-24T08:30:00+00:00
url: /2021/html5-datepicker-nojquery
lead: Inline Datepicker with vanilla JavaScript
categories:
  - Technologies
  - JavaScript 
tags:
  - html5

---
I do write a lot of frontend, despite fact that I'm born to be backend guy. Long story short - we do have a lot of inline editing features especially elements like dates are pretty painful. HTML5 Introduced [input type=date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) which is good enough to cover most of the cases, and we no longer need ugly and slow `.datepicker()` component from jQuery od 3rd party suppliers. 

So if you do have _edit_ you can just use `<input type="date" value="yyyy-mm-dd">` field, and nice calendar will pop up. But we are looking for _inline_ solution. 

<!--more-->

We just need to mark somehow out editable part of the code:

`<div class="editable date" data-id="6">2021-09-23</div>`

I'm using `data-id` to indicate future use this to save data in DB.

Then we need bind `Double Click` event to our date and create actual replacement:

``` 
editable[i].addEventListener("dblclick", function (ev) {
  var input = document.createElement("input");
  input.type = "date";
  input.value = ev.currentTarget.innerText;
  input.addEventListener("blur", saveAction);

  ev.currentTarget.replaceChild(input, ev.currentTarget.childNodes[0]);

  input.focus();
});
```

This is basic version, which will give us date to calendar replacement. We have to handle data save, and going back to "text" version

```
function saveAction(ev) {
  const element = ev.currentTarget;
  console.log("saving... ", element.value);

  var txt = document.createTextNode(element.value);
  let id = element.parentElement.getAttribute("data-id");
  console.log("id", id);

  element.parentElement.replaceChild(txt, element.parentElement.childNodes[0]);
}
```

Final version will handle save on "enter". 



{{< gist slav123 1eb75e25057aa0e6ac7b16ec3204778b >}}

live demo is available here: [![Edit frosty-ives-36ing](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/frosty-ives-36ing?fontsize=14&hidenavigation=1&theme=dark&view=preview)

Big thanks to [Michal](https://github.com/michalsn) for helping with Chrome issues.