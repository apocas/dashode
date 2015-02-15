var CodeChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if(opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'label': '2xx',
    'color': '#CDD452',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': '3xx',
    'color': '#FEE169',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': '4xx',
    'color': '#F9722E',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': '5xx',
    'color': '#C9313D',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': 'other',
    'color': '#68776C',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }];
};

CodeChart.prototype.init = function() {
  var self = this;

  this.plot = $.plot(this.placeholder, this.points, {
    legend: {
      show: true,
      noColumns: 5,
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
      tickDecimals: 0
    },
    xaxis: {
      mode: 'time',
      minTickSize: [30, "second"],
      maxTickSize: [1, "hour"]
    }
  });
};

CodeChart.prototype.draw = function() {
  this.plot.setData(this.points);
  this.plot.setupGrid();
  this.plot.draw();
};

CodeChart.prototype.appendData = function(data) {
  this.formatData(data);
  this.draw();
};

CodeChart.prototype.formatData = function(data) {
  var counter = 0;
  var d = new Date();

  var codes = {
    '200': 0,
    '300': 0,
    '400': 0,
    '500': 0,
    'other': 0
  };

  for (var i = 0; i < data.length; i++) {
    var req = data[i];
    var code = 'other';

    if (req.status >= 200 && req.status < 300) {
      codes['200']++;
    } else if (req.status >= 300 && req.status < 400) {
      codes['300']++;
    } else if (req.status >= 400 && req.status < 500) {
      codes['400']++;
    } else if (req.status >= 500 && req.status < 600) {
      codes['500']++;
    } else {
      codes.other++;
    }
  }

  for (var property in codes) {
    if (codes.hasOwnProperty(property)) {
      this.points[counter].data.push([d.getTime(), codes[property]]);

      if (this.points[counter].data.length > this.graphSize) {
        this.points[counter].data.shift();
      }
      counter++;
    }
  }
};
