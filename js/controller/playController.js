var playController = function(view,model) {
	
	//Assign View keys up here.

	var Players = model.getPlayers();
	
	var map = [];
	document.onkeydown = document.onkeyup = function(e){
		e = e || event;
		map[e.keyCode] = e.type == 'keydown';
		
		for(player in Players){
			var keys = player.getKeyBindings();
			
			if(map(keys[0])){ player.rotateLeft(); }
			if(map(keys[1])){ player.fire(); }
			if(map(keys[2])){ player.rotateRight(); }
		}
	}

	
	setInterval(timer,17);
	function timer(){
		model.update(17);
		view.update();
	}
	
}
