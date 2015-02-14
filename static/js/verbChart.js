var VerbChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if (opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.data = [];
  this.points = [{
    'label': 'GET',
    'color': '#CDD452',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': 'POST',
    'color': '#FEE169',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': 'OPTIONS',
    'color': '#F9722E',
    'data': [],
    'lines': {
      show: true,
      fill: true
    },
    'stack': true
  }, {
    'label': 'DELETE',
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

VerbChart.prototype.init = function() {
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

  setInterval(function() {
    self.formatData();
    self.draw();
    self.data = [];
  }, this.interval);
};

VerbChart.prototype.draw = function() {
  this.plot.setData(this.points);
  this.plot.setupGrid();
  this.plot.draw();
};

VerbChart.prototype.appendData = function(req) {
  this.data.push(req);
};

VerbChart.prototype.formatData = function() {
  var counter = 0;
  var d = new Date();

  var codes = {
    'GET': 0,
    'POST': 0,
    'OPTIONS': 0,
    'DELETE': 0,
    'other': 0
  };

  for (var i = 0; i < this.data.length; i++) {
    var req = this.data[i];
    var code = 'other';

    if (req.http_method == 'GET') {
      codes.GET++;
    } else if (req.http_method == 'POST') {
      codes.POST++;
    } else if (req.http_method == 'OPTIONS') {
      codes.OPTIONS++;
    } else if (req.http_method == 'DELETE') {
      codes.DELETE++;
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
