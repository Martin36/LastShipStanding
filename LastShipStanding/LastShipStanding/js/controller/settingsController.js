var settingsController = function(view, controller, model ) {

	view.createHtml(2); // creates the html for 3 players;
	
	var remove = function(i){
		$("#xBtn"+i)[0].onclick = function(){
			view.deletePlayer(i)
			console.log(i);
		};
	}
	
	for(i=0; i<2; i++){
		remove(i);
		console.log(i);
	}
	for(i=2; i<4; i++){
		
	}
	/*
	var defaultKeyBinding = new defaultKeyBindings(); //temporary
	for(i=0; i<4; i++){
		var keys = defaultKeyBinding.getDefault(i+1);
		//$("#textBtn"+i)= keys[0];
		//$("#keyAssignBtn"+i).contents().last()[0]='Title';
		//$("#keyAssignBtn"+i)[1].childNodes[0] = (keys[1]);
		console.log(keys[0]);
	}
	*/
	
	///////////////////////////////////
	//-------element 		Id's----------
	//
	//	name input field: input(i)
	//	x button        : xBtn(i)
	//	Control Buttons : keyAssignBtn(i)
	//	Change Ship Btns: changeShipBtn(i)
	//	Image of Ship   : boatImg(i)
	//
	//	Add Player Btns : addPlayerBtn(j)
	///////////////////////////////////

	view.backButton[0].onclick = function(){
		$("[id=view2]").hide(); //main menu
		$("[id=view1]").show(); //play menu
	};
	view.startButton[0].onclick = function(){
		$("[id=view2]").hide(); //main menu
		
		model.addPlayer('Staffan');
		model.getPlayers()[0].setPosition(new Victor(30,40));
		model.addPlayer('Hassan');
		model.getPlayers()[1].setPosition(new Victor(300,400));
		model.addPlayer('Roland');
		model.getPlayers()[2].setPosition(new Victor(150,700));
		model.addPlayer('Josef');
		
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