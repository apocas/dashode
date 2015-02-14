$(window).resize(function() {
  location.reload();
});

$(document).ready(function() {
  var h = window.innerHeight;
  var w = window.innerWidth;

  var rw = parseInt(w * 0.15) -1;

  $('#content1').css('width', w - rw);
  $('#content2').css('width', rw);

  $('#container1').css('height', (h / 2));
  $('#container2').css('height', h / 4);
  $('#container3').css('height', h / 4);

  init(rw);
});

function init(rw) {
  var socket = io();
  var data = [];

  var codeChart = new CodeChart('#placeHolder1');
  var verbChart = new VerbChart('#placeHolder2');
  var bandwidthChart = new BandwidthChart('#placeHolder3');
  var gaugesChart = new GaugesChart({
    'size': rw
  });
  codeChart.init();
  verbChart.init();
  bandwidthChart.init();
  gaugesChart.init();


  socket.on('line', function(req) {
    //console.log(req);
    codeChart.appendData(req);
    verbChart.appendData(req);
    bandwidthChart.appendData(req);
    gaugesChart.appendData(req);
  });
}
