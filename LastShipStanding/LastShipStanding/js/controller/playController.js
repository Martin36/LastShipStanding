var playController = function(view,model) {
	
	Players = model.getPlayers();
	
	var interValID;
	
	view.resumeBtn[0].onclick = function(){
		startGame(); 
	}

	view.pauseBtn[0].onclick = function(){
		stopGame(); 
	}

	view.backBtn[0].onclick = function(){
		$("[id=view3]").hide(); //main menu
		$("[id=view2]").show(); //play menu
		stopGame();
		model.removeAllPlayers();
		model.getBattleAudio().pause();
	}
	
	var startGame = function(){
		interValID = setInterval(timer,17);
	}
	
	var stopGame = function(){
		clearInterval(interValID);
	}
	
	this.startUp = function(){
		startGame();
	}
	
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