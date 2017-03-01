var socket = io.connect('http://localhost:8082');
socket.on( 'connect', function(e) {
  console.log('You connected to the server!');
});

socket.on( 'disconnect', function() {
  console.log('You disconnected to the server!');

});

socket.on( 'connect_failed', function() {
  console.log('Connection failed');

});

socket.on( 'error', function() {
  console.log('error connecting');

});

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
