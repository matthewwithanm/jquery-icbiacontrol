---
layout: page
permalink: /demo/
title: Demo
tags: [jquery, css, plugin, demo, example]
share: true
---

<form>
  <fieldset>
    <legend>Minimal Theme</legend>

    <label for="select">Select</label>
    <select name="select" id="select">
      <option disabled selected>Select One</option>
      <option value="option">This is an option</option>
      <option value="another">And another option</option>
    </select>

    <hr />

    <label for="radio1">One</label>
    <input type="radio" id="radio1" name="radio" value="1" />
    <label for="radio2">Two</label>
    <input type="radio" id="radio2" name="radio" value="2" />
    <hr />

    <label for="checkbox">Agree</label>
    <input type="checkbox" id="checkbox" name="checkbox" />
  </fieldset>
</form>

## HTML
This minimal [HTML Example](demo-src.html) showcases how to get up and running quickly.
{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>jquery-icbiacontrol demo</title>
  </head>
  <body>
    <form>
      <fieldset>
        <legend>Minimal Theme</legend>

        <label for="select">Select</label>
        <select name="select" id="select">
          <option disabled selected>Select One</option>
          <option value="option">This is an option</option>
          <option value="another">And another option</option>
        </select>

        <hr />

        <label for="radio1">One</label>
        <input type="radio" id="radio1" name="radio" value="1" />
        <label for="radio2">Two</label>
        <input type="radio" id="radio2" name="radio" value="2" />
        <hr />

        <label for="checkbox">Agree</label>
        <input type="checkbox" id="checkbox" name="checkbox" />
      </fieldset>
    </form>
    <link rel="stylesheet" type="text/css" href="theme.css" />
    <script src="jquery/jquery.min.js"></script>
    <script src="jquery-icbiacontrol/jquery.icbiacontrol.js"></script>
    <script>
      $('select, [type="radio"], [type="checkbox"]').icbiaControl();
    </script>
  </body>
</html>
{% endhighlight %}

### CSS
Checkout our minimal example [theme.css](theme.css). This css file makes use of the [icbiacontrol-base.css](icbiacontrol-base.css) which is a base css file providing just enough styling to make the elements visible in the browser. But lack (in)active states.

{% highlight css linenos %}
@import 'icbiacontrol-base.css';

/* Minimal Theme */
.icbiacontrol {
  border: 4px solid #f5f5f5;
  background: #fff;
  font-size: .85em;
  color: #999;
}
.icbiacontrol:focus,
.icbiacontrol.focus {
  border-color: #d0d0d0;
}
.icbiacontrol i {
  color: #05a7a9;
}

/* Checkboxes and Radios */
.icbiaradio,
.icbiacheckbox {
  width: 28px;
  height: 28px;
}

/* Selected Checkboxes and Radios */
.icbiaradio.checked i:after {
  content: '\25C9';
}
.icbiacheckbox.checked i:after {
  content: '\2713';
  font-size: 1.4em;
  line-height: 1;
}

/* Selectboxes */
.icbiaselect {
  width: 300px;
  height: 38px;
  background: white;
  line-height: 20px;
}
.icbiaselect-display-wrapper {
  padding-right: 30px;
  padding: 6px 0 6px 6px;
}
.icbiaselect-arrow {
  width: 30px;
  height: 30px;
  background-color: #f7f7f7;
  border: 1px solid #cccfd8;
}
.icbiaselect-arrow i:after {
  content: '\25BE';
  line-height: 28px;
  font-size: 1.2em;
}
{% endhighlight %}

<link rel="stylesheet" type="text/css" href="theme.css" />
<script src="jquery/jquery.min.js"></script>
<script src="jquery-icbiacontrol/jquery.icbiacontrol.js"></script>
<script>
  $('select, [type="radio"], [type="checkbox"]').icbiaControl();
</script>
