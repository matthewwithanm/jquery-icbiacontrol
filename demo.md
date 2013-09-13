---
layout: page
permalink: /demo/
title: Demo
tags: [jquery, css, plugin, demo, example]
share: true
---

## Minimal Theme

<form>
  <fieldset class="minimal-theme">
    <legend>Minimal Theme</legend>

    <label for="minimal-select">Select</label>
    <select name="minimal-select" id="minimal-select">
      <option disabled selected></option>
      <option value="minimal-option">This is an option</option>
      <option value="minimal-another">And another option</option>
    </select>

    <hr />

    <label for="minimal-radio1">One</label>
    <input type="radio" id="minimal-radio1" name="minimal-radio" value="1" />
    <label for="minimal-radio2">Two</label>
    <input type="radio" id="minimal-radio2" name="minimal-radio" value="2" />
    <hr />

    <label for="minimal-checkbox">Agree</label>
    <input type="checkbox" id="minimal-checkbox" name="minimal-checkbox" />
  </fieldset>
</form>

Checkout our minimal example [theme.css](theme.css)

{% highlight css linenos %}
@import 'icbiacontrol.css';

/* Minimal Theme */
.minimal-theme .icbiacontrol {
  border: 4px solid #f5f5f5;
  background: #fff;
  font-size: .85em;
  color: #999;
}
.minimal-theme .icbiacontrol:focus,
.minimal-theme .icbiacontrol.focus {
  border-color: #d0d0d0;
}
.minimal-theme .icbiacontrol i {
  color: #05a7a9;
}

/* Checkboxes and Radios */
.minimal-theme .icbiaradio,
.minimal-theme .icbiacheckbox {
  width: 28px;
  height: 28px;
}

/* Selected Checkboxes and Radios */
.minimal-theme .icbiaradio.checked i:after {
  content: '\25C9';
}
.minimal-theme .icbiacheckbox.checked i:after {
  content: '\2713';
  font-size: 1.4em;
  line-height: 1;
}

/* Selectboxes */
.minimal-theme .icbiaselect {
  width: 300px;
  height: 38px;
  background: white;
  line-height: 20px;
}
.minimal-theme .icbiaselect-display-wrapper {
  padding-right: 30px;
  padding: 6px 0 6px 6px;
}
.minimal-theme .icbiaselect-arrow {
  width: 30px;
  height: 30px;
  background-color: #f7f7f7;
  border: 1px solid #cccfd8;
}
.minimal-theme .icbiaselect-arrow i:after {
  content: '\25BE';
  line-height: 28px;
  font-size: 1.2em;
}
{% endhighlight %}

## Default Display
Using nothing but [icbiacontrol.css](icbiacontrol.css)

<form>
  <fieldset>
    <legend>Unstyled</legend>

    <label for="select">Select</label>
    <select name="select" id="select">
      <option disabled selected></option>
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
<script type="text/javascript" src="jquery/jquery.min.js"></script>
<script type="text/javascript" src="jquery-icbiacontrol/jquery.icbiacontrol.js"></script>
<script type="text/javascript">
  $('select, [type="radio"], [type="checkbox"]').icbiaControl();
</script>