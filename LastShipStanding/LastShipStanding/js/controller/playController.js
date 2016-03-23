var playController = function(view,model) {
	
	Players = model.getPlayers();
	var interValID;
	var paused;
	var playMusic;
	
	var startGame = function(){
		interValID = setInterval(timer,17);
	}
	
	var stopGame = function(){
		clearInterval(interValID);
	}
	
	this.startUp = function(){
		view.initScore();
		startGame();
		paused = false;
		playMusic = true;
		view.musicBtn[0].innerHTML = "Music ON";
		view.fxBtn[0].innerHTML = "Fx ON";
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
		$("[id=view3]").hide(); //main menu
		$("[id=view2]").show(); //play menu
		stopGame();
		model.removeAllPlayers();
		model.getBattleAudio().pause();
	}

	view.musicBtn[0].onclick = function () {
        if (playMusic) {
            model.getBattleAudio().pause();
            playMusic = false;
            view.musicBtn[0].innerHTML = "Music OFF";
        }
        else {
            model.getBattleAudio().play();
            playMusic = true;
            view.musicBtn[0].innerHTML = "Music ON";
        }
    };

    view.fxBtn[0].onclick = function () {
        if (model.playFx) {
            model.playFx = false;
            view.fxBtn[0].innerHTML = "Fx OFF";
        }
        else {
            model.playFx = true;
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
			if (map[keys[0]])	{ Players[i].rotateLeft();   /*console.log(Players[i].getName()+"'s Going left!");*/ }
			if (map[keys[1]]) { model.fire(i);		 /*console.log(Players[i].getName()+"'s shots fired!!");*/ }
			if (map[keys[2]]) { Players[i].rotateRight();  /*console.log(Players[i].getName()+"'s Going right!");*/ }
		};
	}
	
	
}