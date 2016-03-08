var Controllerview3 = function(view, model ) {
	view.refreshBtn[0].onclick = function(){
		view.update();
	}
	view.backBtn[0].onclick = function(){
		$("[id=view3]").hide(); //main menu
		$("[id=view2]").show(); //play menu
	}
}