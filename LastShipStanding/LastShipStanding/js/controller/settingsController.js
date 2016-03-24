var settingsController = function(view, controller, model ) {

	var information = {status:[1,1,1,1], currentShip:[0,0,0,0]};
	view.createHtml(4); // creates the html for 3 players;
	var ships = model.getImages().getShipImages();
	//console.log($("#input0").val());
	var keybindings = new DefaultKeyBindings();
	
	var remove = function(i){
		$("#xBtn"+i)[0].onclick = function(){
			view.deletePlayer(i)
			add(i);
			information.status[i] -= 1
		};
	}
	
	var add = function(i){
		$("#addPlayerBtn"+i)[0].onclick = function(){
			view.addPlayer(i)
			remove(i);
			information.status[i] += 1
		};
	}
	
	var changeBoatPic = function(i){
		$("#changeShipBtnLeft" + i)[0].onclick = function(){
			if ((information.currentShip[i] - 1 < 0))
				information.currentShip[i] += ships.length;
			information.currentShip[i] -= 1;
			$("#boatImg" + i).attr("src", ships[information.currentShip[i]].src);
			//console.log($("#boatImg" + i));
		};
		
		$("#changeShipBtnRight" + i)[0].onclick = function(){
			if ((information.currentShip[i] + 1 >= ships.length)) {
				information.currentShip[i] = -1;
			}
			information.currentShip[i] += 1;
			$("#boatImg" + i).attr("src", ships[information.currentShip[i]].src);
		};
	}
	
	for(i=0; i<4; i++){
		remove(i);
		changeBoatPic(i);
	}
	
	view.backButton[0].onclick = function(){
		$("[id=view2]").hide(); //main menu
		$("[id=view1]").show(); //play menu
	};
	view.startButton[0].onclick = function(){
		$("[id=view2]").hide(); //main menu
		for(i=0; i<4; i++){
			if(information.status[i] == 1){
			    var player = model.addPlayer($("#input" + i).val(),
                    ships[information.currentShip[i]].src);

				//player.setImage(ships[information.currentShip[i]]);
				//player.setKeyBindings(keybindings.getDefault(i + 1));

			}
		}
		controller.startUp();

		//model.getBgAudio().pause(); // Pause the menu music
		model.getSounds().getBattleAudio().loop = true; // Start the battle music
		model.getSounds().getBattleAudio().volume = 0.00;
		model.getSounds().getBattleAudio().play();
		model.getSounds().fadeIn(model.getSounds().getBattleAudio());
		model.getSounds().fadeOut(model.getSounds().getBgAudio());
	
		$("[id=view3]").show(); //play menu
	};

}