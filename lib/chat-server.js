var socketio	= require('socket.io');
var io;
var namesUsed = [];


// map socket.id to nicknames
var nicknames = {};

var messageBox = [];

exports.listen = function(server) {

	io = socketio.listen(server);

	io.sockets.on('connection' , function(socket) {
		handleNicknameChoosing(socket);	

		socket.on('send message' , function(data) {
			var newString = '<p>' + data.user + " : " + data.socketmsg + "</p>";
			socket.emit('recieve message' , {newString:newString , user:data.user } );
			//console.log(data);
		});

		socket.on('disconnect' , function(data) {
			if (!socket.nickname) {return;};
			delete nicknames[socket.nickname];
			updateCurrentUsers();
		});

	});


	
}

function updateCurrentUsers() {
	io.sockets.emit('new nicknames' , Object.keys(nicknames));
}




function handleNicknameChoosing(socket) {

	socket.on('nickname' , function(data , callback) {
		
		// Check if Nickname is Unique
		if (data in nicknames) {
			callback(false);
		} else {
			// callback(true);
			socket.nickname = data;
			nicknames[socket.nickname] = socket;
			updateCurrentUsers();
		}

	});

	
	
}