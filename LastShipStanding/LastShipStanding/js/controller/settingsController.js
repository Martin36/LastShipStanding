var settingsController = function(view, controller, model ) {
	view.createHtml(3);
	view.startButton.onclick = function(){
		$("[id=view2]").hide(); //main menu
		model.addPlayer('Staffan');
		model.getPlayers()[0].setPosition(new Victor(30,40));
		model.addPlayer('Hassan');
		model.getPlayers()[1].setPosition(new Victor(300,400));
		model.addPlayer('Roland');
		model.getPlayers()[2].setPosition(new Victor(150,700));
		model.addPlayer('Josef');
		controller.startUp();

		model.getBgAudio().pause(); // Pause the menu music
		model.getBattleAudio().loop = true; // Start the battle music
		model.getBattleAudio().play();

		$("[id=view3]").show(); //play menu
	}


}