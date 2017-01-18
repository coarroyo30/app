

/****************************************************************

Canvas

****************************************************************/

var canvas = document.querySelector('canvas');
fitToContainer(canvas);

function fitToContainer(canvas){
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/****************************************************************

Chart ID's

****************************************************************/

var lineTrafficChart = document.getElementById('trafficChart');
var barDailyTraffic = document.getElementById("dailyTraffic");
var mobileUsers = document.getElementById("mobileUsers");

/****************************************************************

Chart Global

****************************************************************/
console.log(Chart.defaults);

Chart.defaults.scale.gridLines.color = '#F4F4F4';
Chart.defaults.scale.gridLines.zeroLineColor = '#F4F4F4';
Chart.defaults.scale.gridLines.tickMarkLength = 3;
Chart.defaults.scale.gridLines.drawTicks = false;
Chart.defaults.scale.gridLines.offsetGridLines = true;

Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.scale.ticks.autoSkip = false;

Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = "#A4A4A4";
Chart.defaults.global.defaultFontFamily = "Open Sans, helvetica, sans-serif";
Chart.defaults.global.legend.display = false;

/****************************************************************

Chart Style

****************************************************************/

var lineChartDataStyle = {
  lineTension: 0.1,
  fillColor : "#ffffff",
  backgroundColor: "rgba(115,119,191,0.1)",

  borderWidth: 1,
  borderColor: "#A8ACE2",

  pointRadius: 5,
  pointBorderWidth: 2,
  pointBorderColor: "#7379BD",
  pointBackgroundColor: "#ffffff",

  data : [152, 131, 176, 124, 187, 165, 187, 123]
};

var barChartDataStyle = {
  backgroundColor: "#7379BD",
  data : [75, 100, 175, 125, 345, 954, 543]
 };

var doughnutChartDataStyle = {
  backgroundColor: [
    "#74b1bf",
    "#81c98f",
    "#7377bf"
  ],
  data: [50, 100, 300]
};

/****************************************************************

Chart Data

****************************************************************/

var lineChartData = {
  labels : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
  datasets : [lineChartDataStyle]
};

var barChartData = {
  labels : ["S", "M", "H", "D", "K", "J", "B"],
  datasets : [barChartDataStyle]
};

var doughnutChartData = {
  labels : ["Phones", "Tablets", "Desktop"],
  datasets : [doughnutChartDataStyle]
};

/****************************************************************

Chart Options

****************************************************************/

var lineChartOptions = {

};

var barChartOptions = {
  scales: {
    xAxes: [{
      barPercentage: 1,
      categoryPercentage: 0.5,
      type: "category",
      position: 'bottom',
      ticks: {
        min: 1,
        max: 11,
      }
    }]
  }
};

var doughnutChartOptions = {

};

/****************************************************************

Chart

****************************************************************/

window.onload = function(){
  window.lineTrafficChart = new Chart(lineTrafficChart, { type: 'line', data: lineChartData, options: lineChartOptions });
  window.barDailyTraffic = new Chart(barDailyTraffic, { type: 'bar', data: barChartData, options: barChartOptions });
  window.mobileUsers = new Chart(mobileUsers, { type: 'doughnut', data: doughnutChartData, options: doughnutChartOptions });

  var lineChartHourlyLabels = ["03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"];
  var lineChartDailyLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  var lineChartWeeklyLabels = ["01 - 04", "05 - 09", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "30 - 34"];
  var lineChartMonthlyLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var lineChartHourlyPoints = [2, 4, 9, 14, 22, 16, 13, 31, 21, 12, 8];
  var lineChartDailyPoints = [152, 131, 176, 124, 187, 165, 187];
  var lineChartWeeklyPoints = [365, 287, 897, 765, 765, 543, 328];
  var lineChartMonthlyPoints = [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250];

    // generate traffic chart random point values
  var generateTrafficChartValues = function(oldPoints, newPoints) {
    for (var i = 0; i < oldPoints.length; i++) {
      for (var j = 0; j < newPoints.length; j++) {
        if (i === j) {
         oldPoints[i] = newPoints[j];
        }
      }
    }
    lineTrafficChart.update();
  };

  var generateLabels = function(oldLabels, newLabels) {
    for (var i = 0; i < oldLabels.length; i++) {
      for (var j = 0; j < newLabels.length; j++) {
        if (i === j) {
         oldLabels[i] = newLabels[j];
        }
      }
    }
    lineTrafficChart.update();
  };

  var chartPoints = lineChartData.datasets[0].data;
  var chartLabels = lineChartData.labels;

  $('#hourly').click(function(e) {
    e.preventDefault();
    generateTrafficChartValues(chartPoints, lineChartHourlyPoints);
    generateLabels(chartLabels, lineChartHourlyLabels);
  });

  $('#daily').click(function(e) {
    e.preventDefault();
    generateTrafficChartValues(chartPoints, lineChartDailyPoints);
    generateLabels(chartLabels, lineChartDailyLabels);
  });

  $('#weekly').click(function(e) {
    e.preventDefault();
    generateTrafficChartValues(chartPoints, lineChartWeeklyPoints);
    generateLabels(chartLabels, lineChartWeeklyLabels);
  });

  $('#monthly').click(function(e) {
    e.preventDefault();
    generateTrafficChartValues(chartPoints, lineChartMonthlyPoints);
    generateLabels(chartLabels, lineChartMonthlyLabels);
  });
};

/****************************************************************

jQuery

****************************************************************/

$(function () {

  var $navIcon = $('.nav-toggle');
  var $navElements = $('.nav-toggle, .sidebar');

  $navIcon.click(function() {
    if ($navElements.hasClass('is-open')) {
      $navElements.removeClass('is-open');
    } else {
      $navElements.addClass('is-open');
    }
  });

  $('.dashboard-alertbar-inner span').click(function () {
  	$('.dashboard-alertbar').fadeOut('slow');
    if($('.dashboard-alertbar').hasClass('open')) {
      $('.dashboard-alertbar').removeClass('open');
      $('.notification-signal').addClass('active');
    } else {
      $('.notification-signal').removeClass('active');
      $('.dashboard-alertbar').addClass('open');
    }
  });

  $('.notification-icon').click(function () {
    if($('.notification-signal').hasClass('active')) {
      $('.notification-signal').removeClass('active');
      $('.dashboard-alertbar').addClass('open');
    } else {
      $('.notification-signal').addClass('active');
      $('.dashboard-alertbar').removeClass('open');
    }
  });

  $('li').click(function(){
    $('li.active').removeClass("active");
    $(this).addClass("active");
  });
  $('a').click(function(){
    $('a.active').removeClass("active");
    $(this).addClass("active");
  });

  $('.dashboard-settings-right-icon-button.first').click(function () {
    if($('.dashboard-settings-right-icon-button.first').hasClass('set1')) {
      $('.dashboard-settings-right-icon-button.first').removeClass('set1');
      $('.dashboard-settings-right-icon.first').css('background', '#7379BD');
    } else {
      $('.dashboard-settings-right-icon-button.first').addClass('set1');
      $('.dashboard-settings-right-icon.first').css('background', '#88DA85');
    }
  });

  $('.dashboard-settings-right-icon-button.last').click(function () {
    if($('.dashboard-settings-right-icon-button.last').hasClass('set2')) {
      $('.dashboard-settings-right-icon-button.last').removeClass('set2');
      $('.dashboard-settings-right-icon.last').css('background', '#7379BD');
    } else {
      $('.dashboard-settings-right-icon-button.last').addClass('set2');
      $('.dashboard-settings-right-icon.last').css('background', '#88DA85');
    }
  });
	var $form = $(".dashboard-settings-container")
	var $errorMsg = $("<span class='error'>This field is required..!!</span>");
	
	$("#submit").on("click", function () {
	    // If any field is blank, we don't submit the form
	    var toReturn = true;
	    $("#message", $form).each(function () {
	        // If our field is blank
	        if ($(this).val() == "") {
	            // Add an error message
	            if (!$(this).data("error")) {
	                $(this).data("error", $errorMsg.clone().insertAfter($(this)));
	            }
	            toReturn = false;
	        }
	        // If the field is not blank
	        else if ($(this).data("error")) {
	            // Remove the error message 
	                $(this).data("error").remove();
	                $(this).removeData("error");
	        }
	    });
	    return toReturn;
	});
	
	$("#submit").on("click", function () {
	    // If any field is blank, we don't submit the form
	    var toReturn = true;
	    $("#searchMembers", $form).each(function () {
	        // If our field is blank
	        if ($(this).val() == "") {
	            // Add an error message
	            if (!$(this).data("error")) {
	                $(this).data("error", $errorMsg.clone().insertAfter($(this)));
	            }
	            toReturn = false;
	        }
	        // If the field is not blank
	        else if ($(this).data("error")) {
	            // Remove the error message 
	                $(this).data("error").remove();
	                $(this).removeData("error");
	                alert("Message has been sent.");
	        }
	    });
	    return toReturn;
	});

}); 


// End of jQuery Ready
