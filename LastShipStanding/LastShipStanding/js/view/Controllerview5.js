var Controllerview5 = function(view, model ) {
	this.go_back = $("#editDinner"); //go back and edit dinner button
	this.go_back[0].onclick = function(){
		$("[id=view5]").hide();
		$("[id=view2]").show();
		$("[id=view3]").show();
	}

	this.print_rec = $("#printRecipe"); //print full recipe button
	this.print_rec[0].onclick = function(){
		$("[id=view5]").hide();
		$("[id=view6]").show();
	}
	
	//this.img_container = $("#view5_images"); //container for images and prices
}