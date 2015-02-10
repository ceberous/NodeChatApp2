var http	= require('http');
var express = require('express');
var chatServer = require('./lib/chat-server.js');

var app = express();

var server = http.createServer(app).listen('3000' , 'localhost');


app.use(express.static(__dirname + '/public'));

app.get('/' , function(req , res){
	res.sendFile(__dirname + '/views/index.html');
});

chatServer.listen(server);
console.log("Listening On :: 3000");