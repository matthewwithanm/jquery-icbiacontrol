---
layout: page
permalink: /
title: jQuery-icbiacontrol
tags: [jquery, css, plugin]
image:
  feature: butter.jpg
  credit: Siona Karen
  creditlink: http://www.flickr.com/photos/26149290@N02/3871517484/in/photolist-6U7xgs-6UftE7-6X87WP-71rojm-77Mk4e-77MkzB-77Rff1-77RfoN-7e8yew-7nisgv-7ysenx-ado18v-b1hNFn-bVLU9d-aVcbRR-87dQAy-f9teSB-8aeYRG-9ndSA7-bc5UpX-bBZy1N-8kPnfB-8kPnjp-8kSyiY-a9CU8j-94fJLD-7MTJxB-7RpMSt-bBR8iG-avDHdg-7ZyHNZ-7ZBUaE-7ZyHVp-7ZyHzF-7ZyHtH-coNL47-9PXGBT-9SDCQV-a9CTTU-8vdrvw-dYsPor-bFePRM-bFePPi-bFeP9V-bsjWdU-aXnUNg-ac58oJ-ej2w51-dY1dmh-7V8mqm-8xrwuJ
share: true
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

{% highlight html linenos %}
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