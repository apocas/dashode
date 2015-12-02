var CodeChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if (opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'name': '2xx',
    'color': '#CDD452',
    'data': []
  }, {
    'name': '3xx',
    'color': '#FEE169',
    'data': []
  }, {
    'name': '4xx',
    'color': '#F9722E',
    'data': []
  }, {
    'name': '5xx',
    'color': '#C9313D',
    'data': []
  }, {
    'name': 'other',
    'color': '#68776C',
    'data': []
  }];
};

CodeChart.prototype.init = function() {
  var self = this;

  this.graph = new Rickshaw.Graph({
    element: document.getElementById(self.placeholder),
    renderer: 'area',
    stroke: true,
    series: self.points
  });

  this.xAxis = new Rickshaw.Graph.Axis.Time({
    graph: self.graph,
    ticksTreatment: 'glow'
  });

  this.yAxis = new Rickshaw.Graph.Axis.Y({
    graph: self.graph,
    tickFormat: function(y) {
      var abs_y = Math.abs(y);
      if (abs_y === 0) {
        return '';
      } else {
        return y;
      }
    },
    ticks: 5,
    ticksTreatment: 'glow'
  });
};

CodeChart.prototype.draw = function() {
  var self = this;
  this.graph.configure({
    width: $('#' + self.placeholder).width(),
    height: $('#' + self.placeholder).height(),
    unstack: false
  });
  this.graph.render();
  this.xAxis.render();
  this.yAxis.render();
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
      this.points[counter].data.push({
        'x': parseInt(d.getTime() / 1000),
        'y': codes[property]
      });

      if (this.points[counter].data.length > this.graphSize) {
        this.points[counter].data.shift();
      }
      counter++;
    }
  }
};
