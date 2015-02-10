$(function() {

var $entryBox = $('#new-message');
var $chatArea = $('#chat');

var socket = io.connect();
var nick = "";

$('#choose-nickname').submit(function(e) {
	e.preventDefault();
	nick = $('#nickname').val();
	socket.emit('nickname' , nick , function(err) {
		if (!err) {
			$('#nickname-container').hide();
			$('#chat-container').show();
		}
		$('#nick-error').html(err);
	});
});

// Simple Refresh of #users div
	// ?? Could be optimized? of course
socket.on('new nicknames' , function(data) {
	var text = '';
	for (var i=0; i < data.length; i++) {
		text += '<span class="user">' + data[i] + '</span>';
	}
	$('#users').html(text);
});



$('#send-message').submit(function(e) {
	e.preventDefault();
	var entryMsg = $entryBox.val();

	socket.emit('send message' ,  
		{user: nick , socketmsg: entryMsg}
	);
	$entryBox.val('');
});

socket.on('recieve message' , function(data) {
	$chatArea.append(data.newString);
});



}); // closes document initializa