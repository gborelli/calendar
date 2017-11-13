    (function ($) {
      var init = function () {
        $('#calendar').calendarwidget({
          settings: {
            firstDay: 1,
            columnFormat: {
              month: 'dddd',
              week: 'ddd d/M',
              day: 'dddd d MMMM'
            },
            titleFormat: {
              month: 'MMMM yyyy',
              week: "d MMMM [ yyyy]{ '&#8212;' d [ MMMM] yyyy}",
              day: 'dddd d MMMM yyyy'
            },
            monthNames: [
              'Gennaio', 'Febbraio', 'Marzo', 'Aprile',
              'Maggio', 'Giugno', 'Luglio', 'Agosto',
              'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
            ],
            monthNamesShort: [
              'Gen', 'Feb', 'Mar', 'Apr',
              'Mag', 'Giu', 'Lug', 'Ago',
              'Set', 'Ott', 'Nov', 'Dic'
            ],
            dayNames: [
              'Domenica', 'Lunedì', 'Martedì',
              'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
            ],
            dayNamesShort: [
              'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'
            ],
            buttonText: {
              prev: '&lsaquo;',
              next: '&rsaquo;',
              prevYear: '&laquo;',
              nextYear: '&raquo;',
              today: 'Oggi',
              month: 'Mese',
              week: 'Settimana',
              day: 'Giorno'
            }
          },

          eventClick: function (calEvent, jsEvent, view) {
            alert('Event: ' + calEvent.title);
            // alert('Description: ' + calEvent.description);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);
            // change the border color just for fun
            // $(this).css('border-color', 'red');
            jsEvent.preventDefault();
          }


        });

      };

      $(document).ready(init);

    }(jQuery));
