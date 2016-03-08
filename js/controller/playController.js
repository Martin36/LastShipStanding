var playController = function(view,model) {
	
	//Assign View keys up here.
	Players = model.getPlayers();
	//alert(Players[0].getName()+ " " + Players[1].getName()+ " " + Players[2].getName()+ " " + Players[3].getName()+ " ");
	//Players[0].setKeyBindings([65, 87, 68]);
	//Players[1].setKeyBindings([70, 84, 72]);
	//Players[2].setKeyBindings([74, 73, 76]);
	//Players[3].setKeyBindings([37, 38, 39]);
	//alert( Players[0].getKeyBindings()[0]);
	
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
			//console.log(keys[0] + " " + keys[1] + " " + keys[2]);
			if (map[keys[0]])	{ Players[i].rotateLeft();   /*console.log(Players[i].getName()+"'s Going left!");*/ }
			if (map[keys[1]])	{ Players[i].fire();		 /*console.log(Players[i].getName()+"'s shots fired!!");*/}
			if (map[keys[2]])	{ Players[i].rotateRight();  /*console.log(Players[i].getName()+"'s Going right!");*/ }
		}
		
	}

	function timer(){
		//model.update(17);
		model.update(17);
		view.update();
	}
	
	
}