//View Object constructor
var View3 = function (model) {
	this.refreshBtn = $("#view3_refreshBtn");
	this.backBtn = $("#view3_backBtn");
	this.pauseBtn = $("#view3_pauseBtn");

	//map canvas
	var canvas = $("#view3_canvas");
	canvas.width = 1400;
	canvas.height = 800;
	var ctx = canvas[0].getContext('2d');

	//arrow canvas
	/*var arrowCanvas = $("#view3_windArrow");
	arrowCanvas.width = 150;
	arrowCanvas.height = 150;
	var ctx2 = arrowCanvas[0].getContext('2d');
*/
	//var arrowImg = drawArrow(); // test
	this.update = function(){ 
		drawMap();
		drawProjectiles();
		drawPlayers();
		drawArrow( model.getEnvironment().getWindAngle() );
		//clearMap();
		//updateArrow(model.getEnvironment().getWindAngle(), arrowImg); //!---- need to convert wind direction to angle-----!
	}

	function drawMap(){
		ctx.fillStyle = '#0000ff';
		//set active color to #d0e... (nice blue)
		//UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with blue rectangle two lines below. I just forget to remove that line
		//ctx.clearRect(0, 0, width, height);
		//clear whole surface
	  	ctx.beginPath();
		//start drawing
  		ctx.rect(0, 0, canvas.width, canvas.height);
		//draw rectangle from point (0, 0) to
		//(width, height) covering whole canvas
	  	ctx.closePath();
		//end drawing
	  	ctx.fill();
		//fill rectangle with active
		//color selected before
		//ctx.drawImage(model.getMap(),0,0, model.getMap().width, model.getMap().height);
	}
	/*
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
	*/
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
		ctx.save();
		ctx.translate(  player.getPosition().x,  player.getPosition().y);
		ctx.rotate( player.getAngle() );
		ctx.drawImage(player.getImage(), player.getImage().width/ -2,  player.getImage().height / -2, player.getImage().width, player.getImage().height);
		ctx.restore();
	}

	/*
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
	*/
	function drawProjectiles(){
		var balls = model.getCanonballs();
			for(ind in balls){
				drawProjectile(balls[ind]);
			}
		
	}
	function drawProjectile(canonball){
	 	ctx.drawImage(model.getCanonballImage(),
	 	 canonball.getPosition().x - model.getCanonballImage().width / 2,
	  	 canonball.getPosition().y - model.getCanonballImage().height / 2,
	 	 model.getCanonballImage().width, model.getCanonballImage().height);
	}

	/*function drawProjectile(canonball){
		var image = new Image();
		image.onload = function(){ //!-------------- Get info from model instead ---------------!
			image.alt = "canonball";
			image.width = "20";
			image.height = "30";
			var position = canonball.getPosition();
			ctx.drawImage(image, position.x, position.y);
		}
		image.src = "images/Canonball.png";
	}*/


	function drawArrow( angle ){
		ctx.save();
		ctx.translate( canvas.width - model.getArrowImage().width / 2, model.getArrowImage().height / 2 );
		ctx.rotate( angle );
		ctx.translate( -canvas.width + model.getArrowImage().width / 2, -model.getArrowImage().height / 2 );
		ctx.drawImage(model.getArrowImage(), canvas.width - model.getArrowImage().width, 0, model.getArrowImage().width, model.getArrowImage().height);
		ctx.restore();
	}	

	/*function drawArrow(){
		var image2 = new Image();
		//console.log(model.getEnvironment().getWindDirection());
		((console.log(model.getEnvironment().getWindAngle());
		image2.onload = function(){
			image2.alt = "arrow";
			image2.width = "40";
			image2.height = "60";
			ctx2.drawImage(image2, arrowCanvas.width / 2 - image2.width / 2, arrowCanvas.height / 2 - image2.height / 2);
		}
		image2.src = "images/windArrow.png"
		return image2;
	}*/

	/*function updateArrow(angle, image){

		//rotate and draw
		ctx2.save();
		ctx2.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height); //clear the canvas
		ctx2.translate( arrowCanvas.width / 2, arrowCanvas.height / 2);
		ctx2.rotate( angle );
		ctx2.translate( -arrowCanvas.width / 2, -arrowCanvas.height / 2);
		ctx2.drawImage(image, arrowCanvas.width / 2 - image.width / 2, arrowCanvas.height / 2 - image.height / 2);
		ctx2.restore();
	}*/

}