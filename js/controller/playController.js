var playController = function(model) {
	
	this.Setup = function(){
		var allPlayers = model.getPlayers()
		assignKeyBindings(allPlayers);
		//
		//
		//
		//
		//
	}
	
	var assignKeyBindings = function(Players){
		for(player in Players){
			var keys = player.getKeyBindings()
			//To bind a key, there needs to be an element. Use the Document for this? Googled, can be a canvas tag aswell.
			//Blindly attaches keybinds from model. No check if there are multiple players that have the same keybinding.
			var doc = document; //??
			
			//Asign keybinds here.
			doc.onkeydown = function(evt) {
				evt = evt || window.event;
				alert("keydown: " + evt.keyCode);
				
			};
			//Or here, depends on how we want the code.
			if (typeof el.addEventListener != "undefined") { //check version of web. <-- old versions dont have eventlistener. they use attachEvent
				el.addEventListener("keydown", function(evt) {
				alert("keydown: " + evt.keyCode);
				}, false);
			}
			//Loop thro keys from player and assign.
			
		}
	}
}