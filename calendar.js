/*global window, jQuery, document, alert */

(function ($) {
    "use strict";

    if (window.calendarwidget === undefined) {
        window.calendarwidget = {};
    }
    var App = window.calendarwidget, methods;

    App.CalendarWidget = function (trigger, options) {
        var self = this;

        $.extend(self, options);
        if (self.sources === undefined) {
            self.sources = $("#legend div");
        }

        self.trigger = $(trigger);
        self.init();
    };

    // === MapWidget prototype ===
    //
    // extends CalendarWidget class with some methods
    App.CalendarWidget.prototype = {

        init: function () {
            var self = this,
                settings = $.extend({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: false,
                    eventClick: self.eventClick
                }, self.settings);

            self.trigger.fullCalendar(settings);
            self.data = self.getEventsData();
            self.initEvents();
            self.bindLegend();
        },

        getEventsData: function() {
            var self = this,
                data = {},
                name,
                el;

            self.sources.each(function () {
                el = $(this);
                name = el.attr('class').split(' ')[0];
                data[name] = {
                    url: el.data("calendar-url"),
                    className: name
                };
            });
            return data;
        },

        initEvents: function () {
            var self = this,
                el;
            self.sources.each(function () {
                el = $(this).find('input');
                if (el.is(":checked") === true) {
                    self.displayEvents(el.val());
                }
            });
        },

        showAllEvents: function () {
            var self = this,
                key;

            for (key in self.sources) {
                // see: http://goo.gl/cySQ2
                if (self.sources.hasOwnProperty(key)) {
                    self.displayEvents(key);
                }
            }
        },

        eventClick: function (calEvent, jsEvent, view) {
            alert('Event: ' + calEvent.title);
            alert('Description: ' + calEvent.description);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);
            // change the border color just for fun
            // $(this).css('border-color', 'red');
        },

        displayEvents: function (name) {
            var self = this;
            self.trigger.fullCalendar(
                'addEventSource',
                self.data[name]
            );
        },

        hideEvents: function (name) {
            var self = this;
            self.trigger.fullCalendar(
                'removeEventSource',
                self.data[name]
            );
        },

        toggleEvents: function (el) {
            var self = this,
                input = $(el),
                name = input.val();
            if (input.is(':checked') === true) {
                self.hideEvents(name);
                input.attr('checked', false);
            } else {
                self.displayEvents(name);
                input.attr('checked', true);
            }
        },

        // legendElements: function () {
        //     var self = this;
        //     return self.legend.find('div');
        // },

        bindLegend: function () {
            var self = this,
                el,
                input;
            self.sources.each(function () {
                $(this).bind('click', function (evt) {
                    el = $(this)
                    el.toggleClass('unchecked');
                    input = el.find('input');
                    self.toggleEvents(input);
                });
            });
        }

    };


    // == jQuery plugin's methods ==
    //
    // this object contains all jQuery's plugin methods.
    methods = {
        // === init ===
        // initialize the calendar
        init : function (options) {

            return this.each(function () {
                var $this = $(this),
                    data = $this.data('calendarwidget'),
                    calendarwidget;

                // If the plugin hasn't been initialized yet
                if (!data) {
                    calendarwidget = new App.CalendarWidget(this, options);
                    $(this).data('calendarwidget', {
                        target: $this,
                        calendarwidget: calendarwidget
                    });
                }
            });

        },

        destroy : function () {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('calendarwidget');
                if (data) {
                    data.calendarwidget.remove();
                    $this.removeData('calendarwidget');
                }
            });
        },


        refresh: function () {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('calendarwidget');
                if (data) {
                    alert("TODO");
                }
            });
        }

    };

    $.fn.extend({
        calendarwidget: function (method) {

            // Method calling logic
            if (methods[method]) {
                return methods[method].apply(
                    this,
                    Array.prototype.slice.call(arguments, 1)
                );
            }

            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }

            $.error('Method ' +  method + ' does not exist on jQuery.calendarwidget');

        }
    });

}(jQuery));
