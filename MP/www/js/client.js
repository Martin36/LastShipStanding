var socket = io.connect('HMMM');
var game = new Game(socket);

socket.on('sync', function(serverData){
  game.recieveData(serverData);
});

$(document).ready( function(){

	// $('#join').click( function(){
	// 	tankName = $('#tank-name').val();
	// 	joinGame(tankName, selectedTank, socket);
	// });


});

$(window).on('beforeunload', function(){
	//socket.emit('leaveGame', tankName);
});

function joinGame(tankName, tankType, socket){
	// if(tankName != ''){
	// 	$('#prompt').hide();
	// 	socket.emit('joinGame', {id: tankName, type: tankType});
	// }
}
