//View Object constructor
var View3 = function (model) {
	this.backBtn = $('#view3_backBtn');
	this.pauseBtn = $('#view3_pauseBtn');

	//map canvas
	var canvas = $('#view3_canvas');
	canvas.width = 1400;
	canvas.height = 800;
	var ctx = canvas[0].getContext('2d');
	
	model.addObserver(this);
	
	this.newInfo = function(){
		//when called from model with newInfo.
		console.log("Information retrieved from model");
	}

	this.update = function(){
		drawMap();
		drawProjectiles();
		drawPlayers();
		drawArrow( model.getEnvironment().getWindAngle(), model.getEnvironment().getWindMagnitude() );

		this.updateScore(); 
	}
	
	this.drawText = function(text){
		ctx.font = "50px Arial";
		ctx.textAlign="center";
		ctx.fillText(text,canvas.width/2,canvas.height/2);
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
	function drawProjectile(canonball) {
	    var cImg = model.getImages().getCanonballImage();
	 	ctx.drawImage(cImg,
	 	 canonball.getPosition().x - cImg.width / 2,
	  	 canonball.getPosition().y - cImg.height / 2,
	 	 cImg.width, cImg.height);
	}

	function drawArrow( angle, windSpeed ){
	    var aImg = model.getImages().getArrowImage();
	    ctx.save();
	    ctx.translate(canvas.width - aImg.width / 2, aImg.height / 2);
		ctx.rotate( angle );
		ctx.translate(-canvas.width + aImg.width / 2, -aImg.height / 2);
		ctx.drawImage(aImg, canvas.width - aImg.width, 0, aImg.width, aImg.height);
		ctx.restore();

		ctx.fillStyle = '#ffffff';
		ctx.font = '1.875em Arial';
		ctx.fillText(Math.floor(windSpeed * 10) + ' m/s', canvas.width - aImg.width, aImg.height + 25);
	}

	this.initScore = function(){
		//if there is a scoreboard from before, delete it
		while (document.getElementById('view3_scoreTr').firstChild) {
			    document.getElementById('view3_scoreTr').removeChild(document.getElementById('view3_scoreTr').firstChild);
			}

		var players = model.getPlayers();
		for(i=0; i<players.length; i++){
			var playerName = document.createElement('th');
			var textName = document.createTextNode( players[i].getName() );
			playerName.appendChild(textName);

			var playerScore = document.createElement('th');
			var textScore = document.createTextNode('1'); //<----------------get score from model or player?
			playerScore.setAttribute('id', 'view3_score' + i);
			playerScore.appendChild(textScore);

			document.getElementById('view3_scoreTr').appendChild(playerName);
			document.getElementById('view3_scoreTr').appendChild(playerScore);
		}
	}

	this.updateScore = function(){
		var players = model.getPlayers();
		for(i=0; i<players.length; i++){
			var playerScore = document.getElementById('view3_score' + i);

			while (playerScore.firstChild) {
			    playerScore.removeChild(playerScore.firstChild);
			}
			var textScore = document.createTextNode(players[i].getScore().toString()); //<----------------get score from model or player?
			playerScore.appendChild(textScore);
		}
	}

}