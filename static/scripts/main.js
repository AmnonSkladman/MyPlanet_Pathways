//JSON DATA WOO
var json = (function (options) {
    var json = null;
    $.ajax({
        'method': 'GET',
        'async': false,
        'global': false,
        'url': "url",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var openFile = function(event) {
    var output = document.getElementById('output');
    var input = event.target;
    console.log(input)
    var reader = new FileReader();

    reader.onload = function(){
      var dataURL = reader.result
      console.log(dataURL)
      output.src = dataURL;
      var wb = XLSX.read(dataURL, {type: 'base64' });
      console.log(wb)
    };
    reader.readAsDataURL(input.files[0])
};

// CSV Downloader
function excelDownload () {
    var csv = "data:text/csv;charset=utf-8," + encodeURIComponent(XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(json)))
   var link = document.createElement("a");
   document.body.appendChild(link);
   link.href = csv;
   link.click();
}

//Sending POST request
var sendData = function(data) {
    $.post("http://www.google.com", function(data, status) {
        console.log(status);
        $("#status").html(status);
    });
};

//Sending GET request
var getData = function(data) {
    $.get("", function(data) {
       console.log(status);
    });
}

//Opening files
var openFile = function(files) {
    var numFiles = Object.keys(files).length;
    var dataFiles = []
    console.log("input", files)

    Object.keys(files).forEach(i => {
        var reader = new FileReader()
        reader.readAsDataURL(files[i])

        reader.onload = function(event){
            dataFiles.push(event.target.result)
            console.log('dataFiles:', dataFiles)

            if (dataFiles.length === numFiles) {
                sendData(dataFiles)
            }
        };
    })
}

/////////////////////////
//Filtering data locally
// Filter for Graduated
let gradSelected = false;
let gradButtonText = $("#grad-button").text();
let gradButton = $("#grad-button");

function gradSel(e) {
    if (gradSelected == false) {
        gradSelected = true;
        gradButtonText = e;
        gradButton.html("Graduated: " + gradButtonText);
        return gradButtonText;
    } else {
        gradSelected = false;
        gradButton.html("Graduated");
        return gradButtonText;
    };
};

// Filter for Post-Sec
let posSelected = false;
let posButtonText = $("#pos-button").text();
let posButton = $("#pos-button");

function posSel(e) {
    if (posSelected == false) {
        posSelected = true;
        posButtonText = e;
        posButton.html("Post-secondary: " + posButtonText);
    } else {
        posSelected = false;
        posButton.html("Post Secondary");
    };
};

// Filter Button
filterButton = $("#filter-button");

function getFilter () {

}
// function filterText() {
//     if (gradButton.html() == "Graduated") {
//         clearFilter(); //Shows everything
//     } else {
//         var rex = gradButtonText.toLowerCase();
//         $('.content').hide(); //Hides EVERYTHING
//         $('.gradCol').filter(function() {
//             //console.log(rex == $(this).text());
//             if (rex == $(this).text()) {
//                 $(this).parent(".content").show();
//             }
//         });
//     }
// }

// function clearFilter(){
//     //$('.filterLoc').val('');
//     $('.content').show();
// }

// function testFilter() {
//     if (gradButton.html() == "Graduated" && posButton.html() == "Post Secondary") {
//         clearFilter();
//     } else {
//         var rexGrad = gradButtonText.toLowerCase();
//         var rexPos = posButtonText.toLowerCase();
//         $('.content').hide();

//         $('.content').filter(function() {
//             if (
//                 rexGrad === $(this).text() ||
//                 (rexPos === "y" && $(this).text() !== "") ||
//                 (rexPos === "n" && $(this).text() === "") ||
//                 (rexGrad === $(this).text() && rexPos === "y" && $(this).text() !== "") ||
//                 (rexGrad === $(this).text() && rexPos === "n" && $(this).text() === "")
//             ) {
//                 $(this).parent(".content").show();
//                 //console.log($(this).text());
//             }
//         });

//         // $('.gradCol').filter(function() {
//         //     if (rexGrad === $(this).text()) {
//         //         $(this).parent(".content").show();
//         //         console.log("1");
//         //     }
//         // });

//         // $('.posCol').filter(function() {
//         //     if (rexPos === "y" && $(this).text() !== "") {
//         //         $(this).parent(".content").show();
//         //         console.log("2");
//         //     } else if (rexPos === "n" && $(this).text() === "") {
//         //         $(this).parent(".content").show();
//         //         console.log("3");
//         //     }
//         // });
//     };
// }
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
			.append('</div>')
		;
		if ( settings.autoSort == false) {
			$show.append('<a href="" class="sort btn btn-sm btn-default">Sort</a>');
		}
		function sortButtons() {
			var listitems = $show.find('button').get();
			listitems.sort(function(a, b) {
				 var compA = $(a).data('show');
				 var compB = $(b).data('show');
				 return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
			})
			$.each(listitems, function(idx, itm) { $show.append(itm); });
		}
	//this happens when a close button is clicked:
	$table + $('th .hide-col').click(function() {
		$show.find('.sort').show();
		//hides the th of the column that is clicked
		var col = $(this).parent().parent('th').index();
		$(this).parent().parent('th').fadeOut('slow');

		//hides the td of the column that is clicked in each row
		$table + $('tr').each(function() {
			$('td:eq(' + col + ')',this).fadeOut('slow');
		});

		//check if the link to show all columns already exists, if not then add one
		if($show.find('button').length == 0) {
			$show.append('<button data-show="0" class="btn btn-sm btn-warning unhideAll">' + settings.unhideAll + '</button>');
		}

		//adds a link to again show a single hidden column
        var colData = $(this).parent().parent('th').text();

		$show.append('<button data-show="' + col + '" class="btn btn-sm btn-primary">' + (colData)  + '</button>');

		links++;
		if (settings.autoSort == true ) {
			sortButtons();
		}
		return false;
	});

	//this happens when a link to show one or all columns is clicked:
	$show.on('click','button', function(event){

		if ($(this).hasClass('unhideAll')) {
			//when the link to show all columns is clicked
			$show.children('button').remove(); //remove all show columns links
			$show.find('.sort').hide(); //hide sort button
			this + $('td, th').fadeIn('slow'); //show all hidden cells
		} else {
			//gets the number of the columns to be shown
			var col = $(this).data('show');

		//displays the td and th of the column that is clicked in each row
		$table + $('tr').each(function() {
			$('th:eq(' + col + '),td:eq(' + col + ')',this).fadeIn('slow');
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

		$show.on('click', '.sort', function() {
			sortButtons();
			return false;
		});
	}
}(jQuery));
