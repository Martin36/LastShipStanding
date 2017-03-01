var express = require('express');
var app = express();

//Static resources server
app.use(express.static(__dirname + '/www'));

var server = app.listen(process.env.PORT || 8082, function () {
	var port = server.address().port;
	console.log('Server running at port %s', port);
});

var io = require('socket.io')(server);


io.on('connection', function(client) {
	console.log('User connected');

	client.on('joinGame', function(tank){
		// console.log(tank.id + ' joined the game');

		// client.emit('addTank', { id: tank.id, type: tank.type, isLocal: true, x: initX, y: initY, hp: TANK_INIT_HP });
		// client.broadcast.emit('addTank', { id: tank.id, type: tank.type, isLocal: false, x: initX, y: initY, hp: TANK_INIT_HP} );

		// game.addTank({ id: tank.id, type: tank.type, hp: TANK_INIT_HP});
	});

	client.on('sync', function(data){
		//Receive data from clients
			// game.syncTank(data.tank);

		//Broadcast data to clients
		// client.emit('sync', game.getData());
		// client.broadcast.emit('sync', game.getData());

	});

	client.on('shoot', function(ball){
		// var ball = new Ball(ball.ownerId, ball.alpha, ball.x, ball.y );
		// game.addBall(ball);
	});

	client.on('leaveGame', function(tankId){
		console.log(tankId + ' has left the game');
		// game.removeTank(tankId);
		// client.broadcast.emit('removeTank', tankId);
	});

});

//
//     http = require('http'),
//     server = http.createServer(app),
//     io = require('socket.io').listen(server)
//
// server.listen(3000)
//
// io.on('connection', function(client) {
//     console.log('connection..');
//
//     client.on('joingame', function(player) {
//         console.log(player.id + ' joined the game');
//
//         // client.emit('addTank', {
//         //     id: tank.id,
//         //     type: tank.type,
//         //     isLocal: true,
//         //     x: initX,
//         //     y: initY,
//         //     hp: TANK_INIT_HP
//         // });
//         // client.broadcast.emit('addTank', {
//         //     id: tank.id,
//         //     type: tank.type,
//         //     isLocal: false,
//         //     x: initX,
//         //     y: initY,
//         //     hp: TANK_INIT_HP
//         // });
//         //
//         // game.addTank({
//         //     id: tank.id,
//         //     type: tank.type,
//         //     hp: TANK_INIT_HP
//         // });
//     })
// });
