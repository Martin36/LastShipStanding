var Controllerview4 = function(view, model, controller ) {
	
	this.Update = function (obj){
		view.obj = obj;
		view.UpdatePrep(obj);
		view.UpdateTitle(obj);
		view.UpdatePeople();
		view.UpdateIngredients(obj);
		view.UpdateTotalSum(obj);
		view.UpdatePicture(obj);
	}
	
	view.backDish[0].addEventListener("click", function () {
		$("[id=view4]").hide();
		$("[id=view3]").show();
		controller.cancelPending();
	});
	
	view.confirmDish[0].addEventListener("click", function () {
		$("[id=view4]").hide();
		$("[id=view3]").show();
		model.addDishToMenu(view.obj);
		//alert(model.getFullMenu()[0].name); //works
	});
	
}