var BandwidthChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if (opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'name': 'MB',
    'color': '#CDD452',
    'data': []
  }];
};

BandwidthChart.prototype.init = function() {
  var self = this;

  this.graph = new Rickshaw.Graph({
    element: document.getElementById(self.placeholder),
    renderer: 'line',
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

  var legend = new Rickshaw.Graph.Legend({
    graph: self.graph,
    element: document.getElementById(self.placeholder + 'Legend')
  });

  var hoverDetail = new Rickshaw.Graph.HoverDetail({
    graph: self.graph,
    xFormatter: function(x) {
      return new Date(x * 1000).toString();
    }
  });
};

BandwidthChart.prototype.draw = function() {
  var self = this;
  this.graph.configure({
    width: $('#' + self.placeholder).width(),
    height: $('#' + self.placeholder).height()
  });
  this.graph.render();
  this.xAxis.render();
  this.yAxis.render();
};

BandwidthChart.prototype.appendData = function(data) {
  this.formatData(data);
  this.draw();
};

BandwidthChart.prototype.formatData = function(data) {
  var counter = 0;
  var d = new Date();

  var total = 0;

  for (var i = 0; i < data.length; i++) {
    var req = data[i];

    if (req.body_bytes_sent) {
      total += req.body_bytes_sent;
    }
  }

  this.points[0].data.push({
    'x': parseInt(d.getTime() / 1000),
    'y': total / 125000
  });

  if (this.points[0].data.length > this.graphSize) {
    this.points[0].data.shift();
  }
};
