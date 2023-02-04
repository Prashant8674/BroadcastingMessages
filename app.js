var express = require('express');
var app = express();
var http = require('http').Server(app);

var path = require('path');

var io = require('socket.io')(http);

app.get('/', function (req, res) {
    var options = {
        root: path.join(__dirname)
    }
    var fileName = "index.html";
    res.sendFile(fileName, options);
});

var users = 0;

io.on('connection', function (socket) {
    console.log('A user connected');
    users++;
    socket.emit('newuserconnected', { message: ' Hey, Welcome Dear' });

    socket.broadcast.emit('newuserconnected',{message: users + ' Users Connected'})

    socket.on('disconnect', function () {
        console.log('A user disconnected');
        users--;
        socket.broadcast.emit('newuserconnected',{message: users + ' Users Connected'})
    });
});

http.listen(3000, function () {
    console.log('server is listening on port 3000');
});