var model = {
  init: function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        localStorage.attendance = JSON.stringify(controller.get_created_data());
    }
  }
};

var controller = {
  init: function() {
    model.init();
    view.init();
  },
  get_created_data: function() {
    return view.create_data();
  }
};

var view = {
  init: function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
  },
  create_data: function() {
    var nameColumns = $('tbody .name-col'),
        attendance = {};

    nameColumns.each(function() {
        var name = this.innerText;
        attendance[name] = [];

        for (var i = 0; i <= 11; i++) {
            attendance[name].push(Math.random() >= 0.5);
        }
    });
    return attendance;
  }

};

// BOOYAH!
controller.init();
