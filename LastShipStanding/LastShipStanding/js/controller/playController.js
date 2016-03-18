var playController = function(view,model) {
	
	Players = model.getPlayers();
	
	var interValID;

	view.pauseBtn[0].onclick = function(){
		stopGame(); 
	}

	view.backBtn[0].onclick = function(){
		$("[id=view3]").hide(); //main menu
		$("[id=view2]").show(); //play menu
	}
	
	this.startGame = function(){
		interValID = setInterval(timer,17);
	}
	
	var stopGame = function(){
		clearInterval(interValID);
	}
	
	var map = [];
	document.onkeydown = document.onkeyup = function(e){
		e = e || event;
		map[e.keyCode] = e.type == 'keydown';
		
		for(i in Players){
			var keys = Players[i].getKeyBindings();
			if (map[keys[0]])	{ Players[i].rotateLeft();   /*console.log(Players[i].getName()+"'s Going left!");*/ }
			if (map[keys[1]])	{ Players[i].fire();		 /*console.log(Players[i].getName()+"'s shots fired!!");*/}
			if (map[keys[2]])	{ Players[i].rotateRight();  /*console.log(Players[i].getName()+"'s Going right!");*/ }
		}	
	}
	
	function timer(){
		model.update(1);
		view.update();
	}
	
	
}