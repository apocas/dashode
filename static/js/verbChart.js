var VerbChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if (opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'name': 'GET',
    'color': '#CDD452',
    'data': []
  }, {
    'name': 'POST',
    'color': '#FEE169',
    'data': []
  }, {
    'name': 'OPTIONS',
    'color': '#F9722E',
    'data': []
  }, {
    'name': 'DELETE',
    'color': '#C9313D',
    'data': []
  }, {
    'name': 'other',
    'color': '#68776C',
    'data': []
  }];
};

VerbChart.prototype.init = function() {
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

  var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
    graph: self.graph,
    legend: legend
  });

  var order = new Rickshaw.Graph.Behavior.Series.Order({
    graph: self.graph,
    legend: legend
  });

  var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
    graph: self.graph,
    legend: legend
  });
};

VerbChart.prototype.draw = function() {
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

VerbChart.prototype.appendData = function(data) {
  this.formatData(data);
  this.draw();
};

VerbChart.prototype.formatData = function(data) {
  var counter = 0;
  var d = new Date();

  var codes = {
    'GET': 0,
    'POST': 0,
    'OPTIONS': 0,
    'DELETE': 0,
    'other': 0
  };

  for (var i = 0; i < data.length; i++) {
    var req = data[i];
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
