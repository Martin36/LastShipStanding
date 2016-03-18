var Controllerview6 = function(view, model ) {
	this.go_back = $("#editDinner6"); //go back and edit dinner button
	this.go_back[0].onclick = function(){
		$("[id=view6]").hide();
		$("[id=view2]").show();
		$("[id=view3]").show();
	}
}