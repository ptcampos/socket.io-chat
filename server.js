'use strict';

const path = require('path'),
	express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

//require models....

// Connect to MongoDB
var db = mongoose.connect('mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/socket-io-chat', function(err) {
	if (err) {
		console.log('Could not connect to MongoDB!');
	}
});

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//require routes...

http.listen(9000, function () {
    console.log(' The app is up on port: ', 9000);
});

// Mounting the API to the current version (path)
app.get('/', function (req, res) {
    res.sendFile( path.resolve('client/views/index.html') );
});

app.use('/js', express.static( path.resolve('client/js') ));
app.use('/css', express.static( path.resolve('client/css') ));
app.use('/components', express.static( path.resolve('bower_components') ));
app.use('/views', express.static( path.resolve('client/views') ));

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

//io config
io.on('connect', function (socket) {
    console.log('a user has connected');
    socket.on('disconnect', function (data) {
        console.log('a user has disconnected');
    });

    socket.on('message', function(data){
        localStorage.setItem('socketMessages', JSON.stringify(data));pladfp[lasd]
        // socketMessagesObj.push(data.message);
        // localStorage.getItem('socketMessages').push(data.message);

        socket.emit('message', JSON.parse(localStorage.getItem('socketMessages')) || '{}');
    });

    // var i = 0;
    // setInterval(function(){
    //     if(i % 5 === 0){
    //         socket.emit('message', {
    //             number: i
    //         });
    //     }
    //     i++;
    // }, 1000)
});
