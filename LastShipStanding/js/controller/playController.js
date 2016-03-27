var playController = function(view,model, bannerController) {
	
	Players = model.getPlayers();
	var interValID,paused;
	
	model.addObserver(this);
	
	this.newInfo = function () {
		var winner;
		for(player in Players){
			if(!(Players[player].isDead())){
				winner = Players[player].getName();
			}
		}
		console.log("VICTORYYYY TO " + winner);
		stopGame();
	}
	
	var startGame = function(){
		interValID = setInterval(timer,17);
		bannerController.toggleVisibility();
		bannerController.setCurrentView('playView');
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
				console.log("GOOOO!!");
				clearInterval(ID);
				startGame();
			}
			else{
				console.log(4-i);
			}
		}, 1000);
	}
	
	this.startUp = function(){
		view.initScore();
		view.update();
		countDown();
		paused = false;
		view.pauseBtn[0].innerHTML = 'Pause Game';
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
		bannerController.toggleVisibility();
		//model.getSounds().fadeOut( model.getSounds().getBattleAudio() );
		//model.getSounds().fadeIn( model.getSounds().getBgAudio() );
		
	};

	view.musicBtn[0].onclick = function () {
        if ( bannerController.getPlayMusic() ){
            view.musicBtn[0].innerHTML = "Music OFF";
            bannerController.toggleMusic();
        }
        else {
            bannerController.toggleMusic();
            view.musicBtn[0].innerHTML = "Music ON";
        }
    };

    view.fxBtn[0].onclick = function () {
        if (model.playFx) {
            bannerController.toggleFx();
            view.fxBtn[0].innerHTML = "Fx OFF";
        }
        else {
            bannerController.toggleFx();
            view.fxBtn[0].innerHTML = "Fx ON";
        }
    };
	
	var map = [];
	document.onkeydown = document.onkeyup = function(e){
		e = e || event;
		map[e.keyCode] = e.type == 'keydown';
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
	}
	
}