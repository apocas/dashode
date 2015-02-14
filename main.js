var Tail = require('tail').Tail,
  parser = require('clf-parser'),
  express = require('express');

var app = express();
var server = require('http').Server(app),
  io = require('socket.io')(server);


var tail = new Tail('/var/log/nginx/access.log');


tail.on("line", function(data) {
  var req = parser(data);
  //console.log(req);
  io.sockets.emit('line', req);
});

tail.on("error", function(error) {
  console.log('ERROR: ', error);
});


server.listen(1337);

app.use(express.static(__dirname + '/static'));

io.on('connection', function (socket) {
  console.log('Client connected');
});

console.log('Server started');
