I Can't Believe It's a Select!
==============================

jquery-icbiaselect is a jQuery plugin that helps you style select boxes, but not
really.

With icbiaselect, you style only the "display" part of the select box. When the
widget is engaged, the normal browser dropdown is shown. iOS will show its
little scrolly wheel thing; desktop browsers will show the native dropdown list.
It works by positioning the original select box on top of your styled widget and
setting its opacity to 0. So when you click on your widget, you're really
clicking on the browser select box.


Usage
-----

```html
<select id="my-select" name="numbers">
	<option value="0">0</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
</select>
```

```javascript
$('#my-select').icbiaSelect();
```

The new HTML will look like this:

```html
<span class="icbiaselect">
	<span class="icbiaselect-widget">
		<span class="icbiaselect-display"></span>
		<span class="icbiaselect-arrow"><i></i></span>
	</span>
	<select id="my-select" name="numbers">
		<option value="0">0</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
	</select>
</span>
```

The select box will be hidden and resized so that its dimensions match those of
"icbiaselect-widget". Use CSS to style the elements however you want.


Options
-------

Options can be passed either in an object when you initialize the plugin, or by
setting prefixed data-* attributes on the select box you're replacing. (For
example, if you want to set the option "widgetTemplate", you would use the
attribute "data-icbiaselect-widgetTemplate".)

### widgetTemplate

Used if you aren't happy with the default widget markup icbiaselect produces.
Can be either a function that returns a jQuery object or a selector that will be
used to find a template in the document. Whichever you use, make sure it
contains an element with the class "icbiaselect-display" if you want it to
reflect the state of your select box. The class "icbiaselect-widget" will be
automatically added to your element, and it (along with the original select box)
will be nested in a container with the class "icbiaselect".

#### Example

```html
<script id="icbiaselect-template" type="text/html">
	<div>
		<div class="icbiaselect-display"></div>
		<div>CLICK ME!</div>
	</div>
</script>

<script type="text/javascript">
	$('select').icbiaSelect({widgetTemplate: '#icbiaselect-template'});
</script>
```
