var BandwidthChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if(opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.data = [];
  this.points = [{
    'label': 'MBps',
    'color': '#CDD452',
    'data': [],
    'lines': {
      show: true
    },
  }];
};

BandwidthChart.prototype.init = function() {
  var self = this;

  this.plot = $.plot(this.placeholder, this.points, {
    series: {
      curvedLines: {
        apply: true,
        active: true,
        monotonicFit: true
      }
    },
    grid: {
      hoverable: true,
      autoHighlight: false
    },
    yaxis: {
      min: 0,
      tickDecimals: 1
    },
    xaxis: {
      mode: 'time',
      minTickSize: [30, "second"],
      maxTickSize: [1, "hour"]
    }
  });

  setInterval(function() {
    self.formatData();
    self.draw();
    self.data = [];
  }, this.interval);
};

BandwidthChart.prototype.draw = function() {
  this.plot.setData(this.points);
  this.plot.setupGrid();
  this.plot.draw();
};

BandwidthChart.prototype.appendData = function(req) {
  this.data.push(req);
};

BandwidthChart.prototype.formatData = function() {
  var counter = 0;
  var d = new Date();

  var total = 0;

  for (var i = 0; i < this.data.length; i++) {
    var req = this.data[i];

    if(req.body_bytes_sent) {
      total += req.body_bytes_sent;
    }
  }

  this.points[0].data.push([d.getTime(), total/1024/1024]);

  if (this.points[0].data.length > this.graphSize) {
    this.points[0].data.shift();
  }
};
