var LoadChart = function(placeholder, opts) {
  this.graphSize = 150;
  this.interval = 1000;
  this.placeholder = placeholder;

  if (opts) {
    this.graphSize = opts.size || this.graphSize;
    this.interval = opts.interval || this.interval;
  }

  this.points = [{
    'name': 'Load %',
    'color': '#FEE169',
    'data': []
  }, {
    'name': 'Mem %',
    'color': '#F9722E',
    'data': []
  }];
};

LoadChart.prototype.init = function() {
  var self = this;

  this.graph = new Rickshaw.Graph({
    element: document.getElementById(self.placeholder),
    renderer: 'line',
    series: self.points,
    max: 100
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

LoadChart.prototype.draw = function() {
  var self = this;
  this.graph.configure({
    width: $('#' + self.placeholder).width(),
    height: $('#' + self.placeholder).height()
  });
  this.graph.render();
  this.xAxis.render();
  this.yAxis.render();
};

LoadChart.prototype.appendData = function(info) {
  var d = new Date();

  var memperc = (info.freemem / info.totalmem) * 100;
  var loadperc = info.loadpercentage;

  this.points[0].data.push({
    'x': parseInt(d.getTime() / 1000),
    'y': loadperc
  });

  if (this.points[0].data.length > this.graphSize) {
    this.points[0].data.shift();
  }

  this.points[1].data.push({
    'x': parseInt(d.getTime() / 1000),
    'y': memperc
  });

  if (this.points[1].data.length > this.graphSize) {
    this.points[1].data.shift();
  }

  this.draw();
};

LoadChart.prototype.formatData = function() {};
