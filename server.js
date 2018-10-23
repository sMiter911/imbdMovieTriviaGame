const express = require('express');
const fs = require('fs');
const Xray = require('x-ray');

const app = express();
const port = process.env.PORT || 5000;
var x = new Xray();
var server = require('http').Server(app);
var io = require('socket.io')(server);




app.get('/api/hello', (req, res) => {
    res.send({
        express: 'Wonder if this will work!!!',
        Mongo: "Will it work?"
    });
});

app.get('/api/topMovies', (req, res) => {
    x('http://www.imdb.com/chart/top?ref_=nb_mv_3_chttp', {
        top250Movies: x('td.titleColumn', [{
            title: 'a',
            year: 'span'
        }])
    })(function (err, object) {
        console.log(object)
    }).write().pipe(res)
});

io.on('connection', function (socket) {
     var serverConns = io.sockets.sockets
     var players = Object.keys(serverConns).length
     console.log("There are: " + players + " player(s)");
    if (players === 1 ){
        console.log("New client has connected with id: " + socket.id )
        socket.on('NEW_PLAYER', function(data){// listen for new player event
            player = data.player
            console.log("New player: ", player);
            io.emit('RECEIVE_PLAYERS', data);
         })
    
         socket.on('SEND_MESSAGE', function(data){
             io.emit('RECEIVE_MESSAGE', data);
         })

    } else if (players === 2) {
        console.log("New client has connected with id: " + socket.id );
        socket.on('NEW_PLAYER', function(data){// listen for new player event
            player = data.player
            console.log("New player: ", player);
            console.log("Game about to commence!!!");
            io.emit('RECEIVE_PLAYERS', data);
         })
    
         socket.on('SEND_MESSAGE', function(data){
             io.emit('RECEIVE_MESSAGE', data);
         })
    }
    else {
        console.log("There are too many people!!!" );
    }
    socket.on('disconnect', function () {
         console.log('user disconnected')
    })

    socket.on('chat', function (data) {
        // console.log('message: ' + data)
        io.emit('chat', data)
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`));
