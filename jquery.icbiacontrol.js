/*jslint browser: true */
(function ($, window, document) {
    'use strict';

    var IcbiaControl, AbstractCheckedControl, controlMap;

    IcbiaControl = function () {};

    IcbiaControl.prototype = {
        optionAttributePrefixes: ['data-', 'data-icbiacontrol-'],
        initialize: function ($el, options) {
            this.$el = $el;
            this.options = $.extend(this.defaultOptions, this.getHtmlOptions(), options);
            this.$el
                .change($.proxy(this.changeHandler, this))
                .focus($.proxy(this.focusHandler, this))
                .blur($.proxy(this.blurHandler, this));
            this.wrap();
            this.updateWidget();
        },

        blurHandler: function (event) {
            this.wrapper.removeClass('focus');
        },

        focusHandler: function (event) {
            this.wrapper.addClass('focus');
        },

        changeHandler: function (event) {
            this.updateWidget();
        },

        updateWidget: $.noop,

        getHtmlOptions: function () {
            var unprefixed, optName,
                self = this,
                opts = {},
                optionMap = {};

            $.each(self.defaultOptions, function (name) {
                optionMap[name.toLowerCase()] = name;
            });

            $.each(this.$el[0].attributes, function (i, attr) {
                $.each(self.optionAttributePrefixes, function (i, prefix) {
                    if (attr.name.indexOf(prefix) === 0) {
                        unprefixed = attr.name.substr(prefix.length);
                        optName = optionMap[unprefixed.toLowerCase()];
                        if (optName) {
                            opts[optName] = attr.value;
                        }
                    }
                });
            });
            return opts;
        },

        defaultOptions: {
            wrapperClass: null,
            emptyText: null,
            buttonText: null
        },

        createWidget: function () {
            var wt = this.options.widgetTemplate,
                widget = typeof wt === 'function' ? wt() : $($(wt).html());

            return widget
                .addClass('icbiacontrol-widget')
                .addClass('icbia' + this.controlName + '-widget');
        },

        wrap: function () {
            var wrapperClass = this.options.wrapperClass;
            if (!this.wrapper) {
                this.widget = this.createWidget();
                this.wrapper = $('<span class="icbiacontrol"></span>')
                    .addClass('icbia' + this.controlName)
                    .addClass($.isFunction(wrapperClass) ? wrapperClass(this.$el[0]) : wrapperClass || '')
                    .css({
                        position: 'relative',
                        display: 'inline-block'
                    })
                    .append(this.widget)
                    .insertBefore(this.$el)
                    .append(
                        this.$el.css({
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            border: '1px solid #fff',  // To force the dimensions to take effect.
                            top: 0,
                            left: 0,
                            opacity: 0
                        })
                    );
            }
        }
    };


    IcbiaControl.extend = function (attrs) {
        var SuperClass = this,
            ctor = function () {};
        ctor.prototype = new SuperClass();
        ctor.prototype.constructor = ctor;
        $.extend(ctor.prototype, attrs);
        ctor.extend = SuperClass.extend;
        return ctor;
    };


    // A base control for checkboxes and radio buttons.
    AbstractCheckedControl = IcbiaControl.extend({
        defaultOptions: $.extend({}, IcbiaControl.prototype.defaultOptions, {
            widgetTemplate: function () {
                return $('<span><i></i></span>');
            }
        }),
        updateWidget: function () {
            var isChecked = this.$el.is(':checked');
            this.wrapper
                .toggleClass('checked', isChecked)
                .toggleClass('unchecked', !isChecked);
        }
    });


    controlMap = {
        'select': IcbiaControl.extend({
            controlName: 'select',
            defaultOptions: $.extend({}, IcbiaControl.prototype.defaultOptions, {
                widgetTemplate: function () {
                    var template =
                            '<span>                                                        ' +
                            '    <span class="icbiaselect-display-wrapper">                ' +
                            '        <span class="icbiaselect-display"></span>             ' +
                            '    </span>                                                   ' +
                            '    <span class="icbiaselect-arrow"><i></i></span>            ' +
                            '</span>                                                       ';
                    return $(template);
                }
            }),
            updateWidget: function () {
                var value = this.$el.val(),
                    $option = this.$el.find('option:selected'),
                    label = $option.attr('label') || $option.html();
                this.widget.find('.icbiaselect-display').html(label || '&nbsp;');
                this.wrapper.attr('data-value', value);
            }
        }),
        'input[type=checkbox]': AbstractCheckedControl.extend({
            controlName: 'checkbox'
        }),
        'input[type=radio]': AbstractCheckedControl.extend({
            controlName: 'radio',
            initialize: function ($el, options) {
                IcbiaControl.prototype.initialize.call(this, $el, options);
                $('input[name="' + this.$el.attr('name') + '"]').not(this.$el)
                    .change($.proxy(this.changeHandler, this));
            }
        }),
        'input[type=file]': IcbiaControl.extend({
            controlName: 'file',
            defaultOptions: $.extend({}, IcbiaControl.prototype.defaultOptions, {
                widgetTemplate: function () {
                    var template =
                            '<span>                                                        ' +
                            '    <span class="icbiafile-display-wrapper">                  ' +
                            '        <span class="icbiafile-display"></span>               ' +
                            '    </span>                                                   ' +
                            '    <span class="icbiafile-uploadbutton">                     ' +
                            '        <i></i>                                               ' +
                            '        <span class="icbiafile-buttontext"></span>            ' +
                            '    </span>                                                   ' +
                            '</span>                                                       ';
                    return $(template);
                }
            }),
            updateWidget: function () {
                // HTML5 is protecting everyone involved in the file transaction
                // let's prune the fakepath for readibilities sake
                var value = this.$el.val().replace("C:\\fakepath\\", ""),
                    defaultEmptyText = 'No file chosen',
                    multiple = this.$el.attr('multiple'),
                    defaultButtonText = multiple === null || multiple === undefined ? 'Choose File' : 'Choose Files',
                    isSelected = this.$el.val();
                this.wrapper
                    .toggleClass('populated', isSelected)
                    .toggleClass('empty', !isSelected);
                this.widget
                    .find('.icbiafile-buttontext')
                        .html(this.options.buttonText || defaultButtonText)
                        .end()
                    .find('.icbiafile-display')
                        .html(value || this.options.emptyText || defaultEmptyText);
            }
        })
    };


    function createIcbiaControl($el, options) {
        var plugin;
        $.each(controlMap, function (selector, Cls) {
            if ($el.is(selector)) {
                plugin = new Cls();
                plugin.initialize($el, options);
                return false;
            }
        });

        if (!plugin) {
            $.error('There\'s no control for the ' + $el.prop('tagName') + ' element ' + $el);
        }

        return plugin;
    }


    $.extend($.fn, {
        icbiaControl: function (optionsOrMethod) {
            var returnValue = this,
                args = arguments;
            this.each(function (i, el) {
                var $el = $(el),
                    plugin = $el.data('icbiaControl'),
                    method = typeof optionsOrMethod === 'string' ? optionsOrMethod : null,
                    options = method === null ? optionsOrMethod || {} : {};

                if (!plugin) {
                    if (method) {
                        $.error('You can\'t call the icbiaControl method "' + method +
                                '" without first initializing the plugin by calling ' +
                                'icbiaControl() on the jQuery object.');
                    } else {
                        plugin = createIcbiaControl($el, options);
                        $el.data('icbiaControl', plugin);
                    }
                } else if (method) {
                    if (typeof plugin[method] !== 'function') {
                        $.error('Method "' + method + '" does not exist on jQuery.icbiaControl');
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
