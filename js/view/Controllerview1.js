var Controllerview1 = function(view,model) {
	view.playBtn[0].onclick = function() {
		$("[id=view1]").hide(); //main menu
		$("[id=view2]").show(); //play menu
	};

	view.settingsBtn[0].onclick = function() {
		$("[id=view1]").hide(); //main menu
		$("[id=view3]").show();	//settings menu
	};
	
}