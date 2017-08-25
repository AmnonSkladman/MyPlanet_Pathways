var p2eData = [{
        "name": "Stephen Chow",
        "p2e": "P13145",
        "cohort": "12",
        "graduated": "Yes",
        "ossd": "Yes",
        "hsRet": "No",
        "uniApp": "UBC, UoT, McMaster",
        "colApp": "Seneca, Sheridan",
        "ps": "no",
        "program": "n/a",
        "studentNum": "n/a",
        "osap": "yes"
    },
    {
        "name": "Arnold Schwarzenegger",
        "p2e": "P98970",
        "cohort": "12",
        "graduated": "No",
        "ossd": "No",
        "hsRet": "Yes",
        "uniApp": "UBC, UoT, McMaster",
        "colApp": "Mohawk, Sheridan, Seneca",
        "ps": "UoT",
        "program": "Web Development",
        "studentNum": "869686958",
        "osap": "no"
    },
    {
        "name": "Mr. Bean",
        "p2e": "P45466",
        "cohort": "12",
        "graduated": "Yes",
        "ossd": "Yes",
        "hsRet": "No",
        "uniApp": "None",
        "colApp": "Seneca, Sheridan, Mohawk, George Brown",
        "ps": "Sheridan College",
        "program": "Web Design",
        "studentNum": "1048888",
        "osap": "yes"
    }

];

var openFile = function (files) {
    var numFiles = Object.keys(files).length;
    var dataFiles = []
    console.log("input", files)

    Object.keys(files).forEach(i => {
        var reader = new FileReader()

        reader.onload = function (event) {
            dataFiles.push({
                'content': event.target.result,
                'name': files[i].name
            })

            if (dataFiles.length === numFiles) {
                console.log('dataFiles:', dataFiles)
                sendData(dataFiles)
            }
        };
        reader.readAsDataURL(files[i])
    })
}

var sendData = function (data) {
    console.log(data)
    $.post("http://localhost:3000/api/upload", {
        data: data
    }, function (data, status) {
        console.log(status);
    });
};

//Sending GET request
var getData = function (data) {
    $.get("", function (data) {
        console.log(status);
    });
}

//Filtering data locally
function filterText() {
    var rex = new RegExp($('#filterGrad').val());
    if (rex == "") {
        clearFilter()
    } else {
        $('.content').hide();
        $('.gradCol').filter(function () {
            //console.log($(this));
            //console.log($(this).text());
            console.log($('#filterGrad').val());
            console.log(rex.test($(this).text()));
            if (rex.test($(this).text())) {
                $(this).parent(".content").show();
            }
        });
    }
}

function clearFilter() {
    $('.filterLoc').val('');
    $('.content').show();
}


///////////////
//////// Plugin

/* ----------------------------------------------------------------------
* File name:		jquery.hide_cols.js
* Description:	xxx
* Website:			generic jQuery plugin
* Version:			1.0
* Date:					28-6-2016
* Author:				Ray Hyde - www.rayhyde.nl
---------------------------------------------------------------------- */
$(function()
{
    console.log('Button Clicked');
    $.ajax({
        url: 'main.html',
        type:'GET',
        data: JSON.stringify(data),
        dataType: 'json',
        }).done(function(data) {
            console.log(data);
        });      
});

(function ($) {
    $.fn.hideCols = function (options) {

        // default settings
        var settings = $.extend({
            hideColumn: '&times;',
            unhideColumn: '<span class="glyphicon glyphicon-eye-open"></span>  Column',
            unhideAll: '<span class="glyphicon glyphicon-eye-open"></span>  All Columns',
            autoSort: true
        }, options);

        //translations
        var $table = this,
            $show = $('#show'),
            links = 0;

        // add close buttons to each th, wrapped in a div as absolute positioning does not work
        // in a table cell
        $table + $('th')
            .css({
                paddingRight: 0,
                paddingTop: 0
            })
            .prepend('<div class="closeWrap"><button class="hide-col">' + settings.hideColumn + '</button>')
            .append('</div>');
        if (settings.autoSort == false) {
            $show.append('<a href="" class="sort btn btn-sm btn-default">Sort</a>');
        }

        function sortButtons() {
            var listitems = $show.find('button').get();
            listitems.sort(function (a, b) {
                var compA = $(a).data('show');
                var compB = $(b).data('show');
                return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
            })
            $.each(listitems, function (idx, itm) {
                $show.append(itm);
            });
        }
        //this happens when a close button is clicked:
        $table + $('th .hide-col').click(function () {
            $show.find('.sort').show();
            //hides the th of the column that is clicked
            var col = $(this).parent().parent('th').index();
            $(this).parent().parent('th').fadeOut('slow');

            //hides the td of the column that is clicked in each row
            $table + $('tr').each(function () {
                $('td:eq(' + col + ')', this).fadeOut('slow');
            });

            //check if the link to show all columns already exists, if not then add one
            if ($show.find('button').length == 0) {
                $show.append('<button data-show="0" class="btn btn-sm btn-warning unhideAll">' + settings.unhideAll + '</button>');
            }

            //adds a link to again show a single hidden column
            var colData = $(this).parent().parent('th').text();

            $show.append('<button data-show="' + col + '" class="btn btn-sm btn-primary">' + (colData) + '</button>');

            links++;
            if (settings.autoSort == true) {
                sortButtons();
            }
            return false;
        });

        //this happens when a link to show one or all columns is clicked:
        $show.on('click', 'button', function (event) {

            if ($(this).hasClass('unhideAll')) {
                //when the link to show all columns is clicked
                $show.children('button').remove(); //remove all show columns links
                $show.find('.sort').hide(); //hide sort button
                this + $('td, th').fadeIn('slow'); //show all hidden cells
            } else {
                //gets the number of the columns to be shown
                var col = $(this).data('show');

                //displays the td and th of the column that is clicked in each row
                $table + $('tr').each(function () {
                    $('th:eq(' + col + '),td:eq(' + col + ')', this).fadeIn('slow');
                });

                links--;
                //remove unhideAll when there are no more individual show links
                if (links == 0) {
                    $show.children().remove(); //remove all show columns links
                }
                //remove this show link
                $(this).next('br').remove();
                $(this).remove();
            }
        });

        $show.on('click', '.sort', function () {
            sortButtons();
            return false;
        });
    }
}(jQuery));