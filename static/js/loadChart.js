var LoadChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if(opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'label': 'Load %',
    'color': '#FEE169',
    'data': [],
    'lines': {
      show: true
    }
  }, {
    'label': 'Mem %',
    'color': '#F9722E',
    'data': [],
    'lines': {
      show: true
    }
  }];
};

LoadChart.prototype.init = function() {
  var self = this;

  this.plot = $.plot(this.placeholder, this.points, {
    legend: {
      show: true,
      noColumns: 2,
      position: 'nw'
    },
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
      max: 100,
      tickDecimals: 0
    },
    xaxis: {
      mode: 'time',
      minTickSize: [30, "second"],
      maxTickSize: [1, "hour"]
    }
  });
};

LoadChart.prototype.draw = function() {
  this.plot.setData(this.points);
  this.plot.setupGrid();
  this.plot.draw();
};

LoadChart.prototype.appendData = function(info) {
  var d = new Date();

  var memperc = (info.freemem / info.totalmem) * 100;
  var loadperc = info.loadpercentage;

  this.points[0].data.push([d.getTime(), loadperc]);

  if (this.points[0].data.length > this.graphSize) {
    this.points[0].data.shift();
  }

  this.points[1].data.push([d.getTime(), memperc]);

  if (this.points[1].data.length > this.graphSize) {
    this.points[1].data.shift();
  }

  this.draw();
};

LoadChart.prototype.formatData = function() {
};
