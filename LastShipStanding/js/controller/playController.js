var playController = function(view,model, bannerController) {
	
	Players = model.getPlayers();
	var interValID,paused;
	var map = [];

	var winner;
	var gameFinished = false;
	
	model.addObserver(this);
	/*
	document.onkeydown = document.onkeyup = function(e){
			e = e || event;
			map[e.keyCode] = e.type == 'keydown';
	}
	*/
	
	this.newInfo = function () {
		for(player in Players){
			if(!(Players[player].isDead())){
				winner = Players[player].getName();
				gameFinished = true;
			}
		}
		console.log("Winner: " + winner);
		stopGame();
		//view.drawText("Winner: " + winner);
		endGamePressAnyKey();
	}
	
	var startGame = function(){
		interValID = setInterval(timer,17);

		bannerController.setCurrentView('playView');

		//if music are playing, change it to battleAudio
		if( bannerController.getPlayMusic() ){
			bannerController.toggleMusic(); //turn off bgAudio
			bannerController.toggleMusic(); //turn on battleAudio
		}
	}
	
	var stopGame = function(){
		clearInterval(interValID);
	}
	var countDown = function(){ //Countdown from 4* = 1,2,3 and GO!
		var startIt = 3;
		var i = 0;
		var ID = setInterval(
		function () {
			//here goes the update on view for String/Int that shows countdown on screen.
			++i;
			if(i>3){
				//view.update();
				//view.drawText("GOOOO!!");
				//console.log("GOOOO!!");
				clearInterval(ID);
				startGame();
			}
			else{
				view.update();
				view.drawText(4-i);
				console.log(4-i);
			}
		}, 1000);
	}
	
	this.startUp = function(){
		view.initScore();
		view.update();
		//Sorry, but I commented it out until we can display it on the screen and not console.log.
		countDown();
		//startGame();
		paused = false;
		view.pauseBtn[0].innerHTML = 'Pause Game';
		enableKeyBindings();
	}	

	view.pauseBtn[0].onclick = function(){
		if(paused){
			startGame();
			paused=false;
			view.pauseBtn[0].innerHTML = 'Pause Game';
		}else{
			stopGame();
			paused=true;
			view.pauseBtn[0].innerHTML = 'Start Game';
		} 
	}

	view.backBtn[0].onclick = function(){
		$("[id=view3]").hide();
		$("[id=view2]").show();
		stopGame();
		model.removeAllPlayers();
		bannerController.setCurrentView('startView');
		if(bannerController.getPlayMusic()){ //if it's playing
			bannerController.toggleMusic(); //turn off
			bannerController.toggleMusic();	//then on audio to change track
		}
	};
	
	var enableKeyBindings = function(){
		document.onkeydown = document.onkeyup = function(e){
			e = e || event;
			map[e.keyCode] = e.type == 'keydown';
		}
	}
	
	var endGamePressAnyKey = function(){
		document.onkeydown = document.onkeyup = function(e){
			e = e || event;
			map[e.keyCode] = e.type == 'keydown';
			if(map[32]){ //Space keycode
				$("[id=view3]").hide();
				$("[id=view2]").show();
				model.removeAllPlayers();
				bannerController.setCurrentView('startView');
				if(bannerController.getPlayMusic()){ //if it's playing
					bannerController.toggleMusic(); //turn off
					bannerController.toggleMusic();	//then on audio to change track
				}
					document.onkeydown = document.onkeyup = null;
			}
		}
	}
	
	function timer(){
		model.update(1);
		view.update();
		for(i in Players){
			var keys = Players[i].getKeyBindings();
			if (map[keys[0]])	{ Players[i].rotateLeft(); }
			if (map[keys[1]]) { model.fire(i); }
			if (map[keys[2]]) { Players[i].rotateRight(); }
		};

		if(gameFinished){
			view.drawText('Winner: ' + winner + ', Press Space..');
		}
	}
	
}