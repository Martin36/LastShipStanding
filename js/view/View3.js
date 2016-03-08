//View Object constructor
var View3 = function (model) {
	this.refreshBtn = $("#view3_refreshBtn");
	this.backBtn = $("#view3_backBtn");

	var canvas = $("#view3_canvas")
	var ctx = canvas[0].getContext('2d');

	this.update = function(){
		clearMap();
		drawMap();
		drawPlayers();
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
		var players = ["player1"]; //testing purpose, remove after.
		//var players = model.getPlayers();	//!---------model.GetPlayers------!
		for(index in players){
			drawPlayer(players[index]);
		}
	}
	function drawPlayer(player){
		var image = new Image();

		image.onload = function(){ //!-------------- Get info from player instead ---------------!
			image.alt = "player1";
			image.width = "220";
			image.height = "277";
			ctx.drawImage(image, 10, 10)
		}
		image.src = "images/player1.png";
	}
}