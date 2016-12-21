//Global Variables
var currentDate = moment();

var myCalendar = {

    init: function (event) {

        $('#year').append(currentDate.year());
        $('#month').append(currentDate.format('MMMM'));
        myCalendar.buildCalendar(currentDate);
        $('#yearNext').on('click', this.yearNext);
        $('#yearPrev').on('click', this.yearPrev);
        $('#monthNext').on('click', this.monthNext);
        $('#monthPrev').on('click', this.monthPrev);
    },

    buildCalendar: function (date) {
        $('#calendarDays').html('');
        var startDay = date.startOf('month').day();
        var lastDay = date.daysInMonth();
        //First Row
        var calendarRow = '<tr>';
        var currentDay = 1;
        for (var i = 0; i < 7; i++) {
            if (startDay > i) {
                calendarRow += '<td></td>';
            } else {
                calendarRow += '<td>' + currentDay + '</td>';
                currentDay++;
            }
        }
        calendarRow += '</tr>';
        $('#calendarDays').append(calendarRow);

        //Middle Rows
        while (currentDay + 6 < lastDay) {
            calendarRow = '<tr>';
            for (var i = 0; i < 7; i++) {
                if (currentDay < lastDay) {
                    calendarRow += '<td>' + currentDay + '</td>';
                    currentDay++;
                }
            }
            calendarRow += '</tr>';
            $('#calendarDays').append(calendarRow);
        }

        //Final Row
        while (currentDay <= lastDay) {
            calendarRow = '<tr>';
            for (var i = 0; i < 7; i++) {
                if (currentDay <= lastDay) {
                    calendarRow += '<td>' + currentDay + '</td>';
                    currentDay++;
                }else{
                    calendarRow += '<td></td>';
                }
            }
            calendarRow += '</tr>';
            $('#calendarDays').append(calendarRow);
        }
    },
    yearNext: function (event) {
        var newYear = parseInt($('#year').text()) + 1;
        currentDate.year(newYear);
        $('#year').text(newYear);
        myCalendar.buildCalendar(currentDate);
    },
    yearPrev: function (event) {
        var newYear = parseInt($('#year').text()) - 1;
        currentDate.year(newYear);
        $('#year').text(newYear);
        myCalendar.buildCalendar(currentDate);
    },
    monthNext: function (event) {
        var newMonth = currentDate.month() + 1;
        currentDate.month(newMonth);
        $('#month').text(currentDate.format('MMMM'));
        myCalendar.buildCalendar(currentDate);
    },
    monthPrev: function (event) {
        var newMonth = currentDate.month() - 1;
        currentDate.month(newMonth);
        $('#month').text(currentDate.format('MMMM'));
        myCalendar.buildCalendar(currentDate);
    },
    selectedDate: function (event) {
    }

}

//Document Ready Function
$(document).ready(function () {
    myCalendar.init();
});
