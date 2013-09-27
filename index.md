---
layout: default
---

I Can't Believe It's a Control!
==============================

jquery-icbiacontrol is a jQuery plugin that helps you style native browser
controls, but not really.

It works by adding custom, styleable markup to the DOM right next to the
original control, which is then made transparent and positioned on top of your
custom widget. That way, when you interact with the styled widget, you're
actually interacting with the native browser control.

For example, when you use the plugin with a select box, you style only the
"display" part. When the widget is engaged, the normal browser dropdown is
shown. iOS will show its little scrolly wheel thing; desktop browsers will show
the native dropdown list.

Currently, jquery-icbiacontrol works with the following elements:

* select
* input[type=checkbox]
* input[type=radio]

## Demo

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

<a href="https://github.com/matthewwithanm/jquery-icbiacontrol/"><img src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>

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


Usage
-----

{% highlight js linenos %}
$('select').icbiaControl();
{% endhighlight %}

The orignal control will be wrapped in a container with the classes
"icbiacontrol" and "icbia<controlName>", along with a styleable widget (see
below for the default widget markup for each supported control type). Use CSS to
style the widget however you want. When the element has focus, a class of
"focus" will be added to the container (the element with the "icbiacontrol"
class).


Options
-------

Options can be passed either in an object when you initialize the plugin, or by
setting prefixed data-* attributes on the select box you're replacing. (For
example, if you want to set the option "widgetTemplate", you would use the
attribute "data-icbiacontrol-widgetTemplate".)

### widgetTemplate

Used if you aren't happy with the default widget markup icbiacontrol produces.
Can be either a function that returns a jQuery object or a selector that will be
used to find a template in the document. The classes "icbiacontrol-widget" and
"icbia<controlName>-widget" will be automatically added to your element.

#### Example

{% highlight text linenos %}
<script id="icbiaselect-template" type="text/html">
    <div>
        <div class="icbiaselect-display"></div>
        <div>CLICK ME!</div>
    </div>
</script>

<script type="text/javascript">
    $('select').icbiaControl({widgetTemplate: '#icbiaselect-template'});
</script>
{% endhighlight %}


Supported Controls
------------------

### select

#### Default Widget Template

{% highlight html linenos %}
<span class="icbiacontrol-widget icbiaselect-widget">
    <span class="icbiaselect-display-wrapper">
        <span class="icbiaselect-display"></span>
    </span>
    <span class="icbiaselect-arrow"><i></i></span>
</span>
{% endhighlight %}

Note: If providing a custom widget template, make sure it includes an element
with the class "icbiaselect-display". The plugin will use this to show the
selected label.

### checkbox & radio

#### Default Widget Template

{% highlight html linenos %}
<span class="icbiacontrol-widget icbiacheckbox-widget"><i></i></span>
<span class="icbiacontrol-widget icbiaradio-widget"><i></i></span>
{% endhighlight %}

The classes "checked" and "unchecked" will be added to the container (the
element with the "icbiacheckbox" class) to inidicate the current state of the
control.