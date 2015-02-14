$(document).ready(function() {
  var h = window.innerHeight;

  $('#container1').css('height', (h / 2));
  $('#container2').css('height', h / 4);
  $('#container3').css('height', h / 4);

  init();
});

function init() {
  var socket = io();
  var data = [];

  var codeChart = new CodeChart('#placeHolder1');
  var verbChart = new VerbChart('#placeHolder2');
  var bandwidthChart = new BandwidthChart('#placeHolder3');
  codeChart.init();
  verbChart.init();
  bandwidthChart.init();

  socket.on('line', function(req) {
    //console.log(req);
    codeChart.appendData(req);
    verbChart.appendData(req);
    bandwidthChart.appendData(req);
  });
}
