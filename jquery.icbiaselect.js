/*jslint browser: true */
(function ($, window, document) {
	'use strict';

	function IcbiaSelect($el, options) {
		this.$el = $el;
		this.options = $.extend(this.defaultOptions, this.getHtmlOptions(), options);
	}

	var DATA_ATTR_PREFIX = 'data-icbiaselect-';

	IcbiaSelect.prototype = {
		initialize: function () {
			this.$el
				.change($.proxy(this.selectHandler, this))
				.focus($.proxy(this.focusHandler, this))
				.blur($.proxy(this.blurHandler, this));
			this.wrap();
			this.updateHitArea();
			this.updateDisplayValue();
		},

		blurHandler: function (event) {
			this.wrapper.removeClass('focus');
		},

		focusHandler: function (event) {
			this.wrapper.addClass('focus');
		},

		selectHandler: function (event) {
			this.updateDisplayValue();
		},

		updateDisplayValue: function () {
			var label = this.$el.find('option:selected').html();
			this.widget.find('.icbiaselect-display').html(label || '&nbsp;');
			this.updateHitArea();
		},

		updateHitArea: function () {
			this.$el
				.css({
					width: this.widget.width(),
					height: this.widget.height()
				});
		},

		getHtmlOptions: function () {
			var opts = {};
			$.each(this.$el[0].attributes, function (i, attr) {
				if (attr.name.indexOf(DATA_ATTR_PREFIX) !== -1) {
					opts[attr.name.substr(DATA_ATTR_PREFIX.length)] = attr.value;
				}
			});
			return opts;
		},

		defaultOptions: {
			widgetTemplate: function () {
				return $(' ' +
						'<span>                                                            ' +
						'    <span class="icbiaselect-display-wrapper">                    ' +
						'        <span class="icbiaselect-display"></span>                 ' +
						'    </span>                                                       ' +
						'    <span class="icbiaselect-arrow"><i></i></span>                ' +
						'</span>                                                           '
					);
			}
		},

		createWidget: function () {
			var wt = this.options.widgetTemplate,
			    widget = typeof wt === 'function' ? wt() : $($(wt).html());

			return widget
				.addClass('icbiaselect-widget');
		},

		wrap: function () {
			if (!this.wrapper) {
				var parent = this.$el.parent();
				this.widget = this.createWidget();
				this.wrapper = $('<span class="icbiaselect"></span>')
					.css({
						position: 'relative',
						display: 'inline-block'
					})
					.append(this.widget)
					.append(
						this.$el.css({
							position: 'absolute',
							border: '1px solid #fff',  // To force the dimensions to take effect.
							top: 0,
							left: 0,
							opacity: 0
						})
					)
					.appendTo(parent);
			}
		}
	};


	$.extend($.fn, {
		icbiaSelect: function (optionsOrMethod) {
			var returnValue = this,
			    args = arguments;
			this.each(function (i, el) {
				var $el = $(el),
				    plugin = $el.data('icbiaSelect'),
				    method = typeof optionsOrMethod === 'string' ? optionsOrMethod : null,
				    options = method === null ? optionsOrMethod || {} : {};

				if (!plugin) {
					if (method) {
						$.error('You can\'t call the icbiaSelect method "' + method
								+ '" without first initializing the plugin by calling '
								+ 'icbiaSelect() on the jQuery object.');
					} else {
						plugin = new IcbiaSelect($el, options);
						plugin.initialize();
						$el.data('icbiaSelect', plugin);
					}
				} else if (method) {
					if (typeof plugin[method] !== 'function') {
						$.error('Method "' + method + '" does not exist on jQuery.icbiaSelect');
					} else {
						// NOTE: If you call a method that returns a value, you will only get the result from the last item in the collection.
						returnValue = plugin[method].apply(plugin, Array.prototype.slice.call(args, 1));
					}
				}
			});
			return returnValue;
		}
	});
}(this.jQuery, window, document));
