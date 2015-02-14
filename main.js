var Tail = require('tail').Tail,
  parser = require('clf-parser'),
  express = require('express'),
  os = require('os');
var argv = require('yargs').argv;

var port = argv.port || 1337;
var path = argv.path || '/var/log/nginx/access.log';

var app = express();
app.use(express.static(__dirname + '/static'));

var server = require('http').Server(app),
  io = require('socket.io')(server),
  tail = new Tail(path);

tail.on("line", function(data) {
  var req = parser(data);
  //console.log(req);
  io.sockets.emit('request', req);
});

tail.on("error", function(error) {
  console.log('TAIL ERROR: ', error);
});

setInterval(function() {
  io.sockets.emit('os', {
    'load': os.loadavg(),
    'totalmem': os.totalmem(),
    'freemem': os.freemem(),
    'loadpercentage': parseInt((os.loadavg()[0] *100) / os.cpus().length)
  });
}, 1000);

server.listen(port);

io.on('connection', function(socket) {
  console.log('Client connected');
});

console.log('########################');
console.log('dashode');
console.log('########################');
console.log('Server started!');
console.log('Listening on port: ' + port);
console.log('Watching log: ' + path);
console.log('----');
