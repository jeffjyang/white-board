// Start Project:
// Run two commands in different terminal windows:
// In project directory:
// npm run start
// In directory with ngrok executable:
// ./ngrok http 3000 -> Opens connection with localhost:3000

var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Listening on port 3000");
});

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var allDrawings = [];

function newConnection(socket) {
    console.log(socket.id)

    socket.emit("currentState", allDrawings);

    socket.on('mouseEvent', mouseMessage);

    function mouseMessage(data) {
        console.log(data);
        allDrawings.push(data);
        socket.broadcast.emit("syncDrawing", data);
    }

}
