var Controllerview2 = function(view, controller, model ) {
	view.testBtn[0].onclick = function(){
		$("[id=view2]").hide(); //main menu
		model.addPlayer('Staffan');
		model.addPlayer('Hassan');
		controller.startGame();
		$("[id=view3]").show(); //play menu
	}
}