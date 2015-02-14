var maxPoints = 150;

$(window).resize(function() {
  location.reload();
});

$(document).ready(function() {
  var h = window.innerHeight;
  var w = window.innerWidth;

  var rw = h / $('#content2').children().length;
  var aux = w * 0.15;
  if (rw > aux) {
    rw = aux;
  }

  $('#content1').css('width', w - rw);
  $('#content2').css('width', rw);

  $('#container1').css('height', h / 4);
  $('#container2').css('height', h / 4);
  $('#container3').css('height', h / 4);
  $('#container4').css('height', h / 4);

  init(rw * 1.1);
});

function init(rw) {
  var socket = io();
  var data = [];

  var codeChart = new CodeChart('#placeHolder1', {
    'size': maxPoints
  });
  var verbChart = new VerbChart('#placeHolder2', {
    'size': maxPoints
  });
  var bandwidthChart = new BandwidthChart('#placeHolder3', {
    'size': maxPoints
  });
  var loadChart = new LoadChart('#placeHolder4', {
    'size': maxPoints
  });
  var gaugesChart = new GaugesChart({
    'size': rw
  });
  codeChart.init();
  verbChart.init();
  bandwidthChart.init();
  gaugesChart.init();
  loadChart.init();


  socket.on('request', function(req) {
    //console.log(req);
    codeChart.appendData(req);
    verbChart.appendData(req);
    bandwidthChart.appendData(req);
    gaugesChart.appendData(req);
  });

  socket.on('os', function(info) {
    if (gaugesChart.gauges.load.config.max < info.load[0]) {
      gaugesChart.gauges.load = gaugesChart.createGauge('loadGauge', 'Load', 0, parseInt(info.load[0]) + 1, true);
    }
    gaugesChart.gauges.load.data = info.load[0];

    gaugesChart.gauges.mem.data = (info.freemem / info.totalmem) * 100;

    gaugesChart.gauges.load.redraw();
    gaugesChart.gauges.mem.redraw();

    loadChart.appendData(info);
  });
}
