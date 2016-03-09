//View Object constructor
var View3 = function (model) {
	this.refreshBtn = $("#view3_refreshBtn");
	this.backBtn = $("#view3_backBtn");
	this.pauseBtn = $("#view3_pauseBtn");
	var canvas = $("#view3_canvas");
	canvas.width = 1400;
	canvas.height = 800;
	var ctx = canvas[0].getContext('2d');
	
	this.update = function(){ 
		clearMap();
		drawPlayers();
		//drawMap();
		//drawProjectiles();
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
		for(index in players){
			drawPlayer(players[index]);
		}
	}
	function drawPlayer(player){
		var image = new Image();
		image.onload = function(){ //!-------------- Get info from player instead ---------------!
			image.alt = "player";
			image.width = "40";
			image.height = "60";
			var playerPos = player.getPosition();
			//console.log(playerPos.x + ", " + playerPos.y);
			//console.log("player angle: " + player.getAngle());
			ctx.save();
			//ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
			ctx.translate( playerPos.x, playerPos.y);
			//ctx.rotate( (player.getAngle() * Math.PI / 180) ); //convert to radians
			ctx.rotate( player.getAngle() );
			ctx.drawImage(image, 19/ -2, 28 / -2);

			//ctx.translate( -canvas.width/2, -canvas.height / 2 );
			//ctx.drawImage(image, playerPos.x, playerPos.y );
			ctx.restore();
			//ctx.translate( playerPos.x, playerPos.y );
		}
		image.src = "images/player1.png";
	}
	function drawProjectiles(){
		var canonballs = model.getCanonballs();	//!-----------------code for canonballs ---------------------!
		console.log('len: ' + canonballs.length() );
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