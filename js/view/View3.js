//View Object constructor
var View3 = function (model) {
	this.refreshBtn = $("#view3_refreshBtn");
	this.backBtn = $("#view3_backBtn");
	var canvas = $("#view3_canvas")
	var ctx = canvas[0].getContext('2d');

	this.update = function(){
		console.log("view3_update");
		clearMap();
		drawMap();
		drawPlayers();
		drawProjectile();
	}
	function drawMap(){
		var mapImage = new Image();  //!--------- Get map from Model ---------!
		mapImage.onload = function(){
			mapImage.alt = "background";
			mapImage.width = canvas.width;
			mapImage.height = canvas.height;
			ctx.drawImage(mapImage,0,0);
		}
		mapImage.src = "images/sketch.jpg";
	}
	function clearMap(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	function drawPlayers(){
		var players = model.getPlayers();
		console.log('player length: ' + players.length);
		for(index in players){
			drawPlayer(players[index]);
		}
	}
	function drawPlayer(player){
		var image = new Image();
		image.onload = function(){ //!-------------- Get info from player instead ---------------!
			image.alt = "player";
			image.width = "220";
			image.height = "277";
			var playerPos = player.getPosition();
			ctx.drawImage(image, playerPos.x, playerPos.y);
		}
		image.src = "images/player1.png";
	}
	function drawProjectiles(){
		var canonballs = model.getCanonballs();	//!-----------------code for canonballs ---------------------!
		for(index in canonballs){
			drawProjectile(canonballs[index]);
			
		}
	}
	function drawProjectile(canonball){
		var image = new Image();
		image.onload = function(){ //!-------------- Get info from player instead ---------------!
			image.alt = "canonball";
			image.width = "20";
			image.height = "30";
			var position = canonball.getPosition();
			ctx.drawImage(image, position.x, position.y);
		}
		image.src = "images/player1.png";
	}
}