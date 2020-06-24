var express = require('express');
var socket = require('socket.io')

//App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});

//staric files usinf middle ware
app.use(express.static('public'))

//Socket Setup working with the serve we delceared above
var io = socket(server);

//listenings for a connection and then the call back function as a variable socket that can be use by
//multiple people and we can do somethig with it later
io.on('connection',function(socket){
    console.log('Made socket connection',socket.id)

    //listen to message coming in
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    //listning for the feedback from someone typing
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});