//View Object constructor
var View3 = function (model) {
	this.resumeBtn = $("#view3_resumeBtn");
	this.backBtn = $("#view3_backBtn");
	this.pauseBtn = $("#view3_pauseBtn");

	//map canvas
	var canvas = $("#view3_canvas");
	canvas.width = 1400;
	canvas.height = 800;
	var ctx = canvas[0].getContext('2d');

	this.update = function(){ 
		drawMap();
		drawProjectiles();
		drawPlayers();
		drawArrow( model.getEnvironment().getWindAngle(), model.getEnvironment().getWindMagnitude() );
	}

	function drawMap(){
		ctx.fillStyle = '#0000ff';
		//set active color to #d0e... (nice blue)
		//clear whole surface
	  	ctx.beginPath();
		//start drawing
  		ctx.rect(0, 0, canvas.width, canvas.height);
		//draw rectangle from point (0, 0) to
		//(width, height) covering whole canvas
	  	ctx.closePath();
		//end drawing
	  	ctx.fill();
	}

	function clearMap(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	function drawPlayers(){
		var players = model.getPlayers();
		for(index in players){
			if(!players[index].isDead()){
				drawPlayer(players[index]);
				drawHealth(players[index]);
				drawCooldown(players[index]);
			}
			
		}
	}
	function drawPlayer(player){
		ctx.save();
		ctx.translate(  player.getPosition().x,  player.getPosition().y);
		ctx.rotate( player.getAngle() );
		ctx.drawImage(player.getImage(), player.getImage().width/ -2,  player.getImage().height / -2, player.getImage().width, player.getImage().height);
		ctx.restore();
	}

	function drawHealth(player){
		//gray background
		ctx.fillStyle = '#ff0000';
		ctx.beginPath();

		var healthHeight = 10;
		ctx.rect( player.getPosition().x - player.getImage().width / 2, //x
		 player.getPosition().y - player.getImage().height,				//y
		 player.getImage().width,										//width
		  healthHeight );												//height

		ctx.closePath();
		ctx.fill();

		//green health
		ctx.fillStyle = '#33cc33';
		ctx.beginPath();
		ctx.rect( player.getPosition().x - player.getImage().width / 2, //x
		 player.getPosition().y - player.getImage().height,				//y
		 (player.getImage().width ) *  player.getHp() / 100,			//width
		  healthHeight );												//height

		ctx.closePath();
		ctx.fill();
	}

	function drawCooldown(player){
		ctx.fillStyle = '#ccccb3';
		ctx.beginPath();
		//player.getHp()
		var width;
		if(player.getCooldownTimer() == 0){
			width = (player.getImage().width );
		}else{
			width = (player.getImage().width ) *  player.getCooldownTimer() / player.getCooldownTime();
		}
		ctx.rect( player.getPosition().x - player.getImage().width / 2, //x
		 player.getPosition().y - player.getImage().height + 10,		//y
		 width,															//width
		  3 );															//height

		ctx.closePath();
		ctx.fill();
	}

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

	function drawArrow( angle, windSpeed ){
		ctx.save();
		ctx.translate( canvas.width - model.getArrowImage().width / 2, model.getArrowImage().height / 2 );
		ctx.rotate( angle );
		ctx.translate( -canvas.width + model.getArrowImage().width / 2, -model.getArrowImage().height / 2 );
		ctx.drawImage(model.getArrowImage(), canvas.width - model.getArrowImage().width, 0, model.getArrowImage().width, model.getArrowImage().height);
		ctx.restore();

		ctx.fillStyle = '#ffffff';
		ctx.font = '1.875em Arial';
		ctx.fillText( Math.floor(windSpeed*10) + ' m/s', canvas.width - model.getArrowImage().width, model.getArrowImage().height + 25);
	}

}