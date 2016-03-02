var Controllerview2 = function(view, model ) {

	view.people_form[0].onchange = function(){
		model.setNumberOfGuests(this[this.selectedIndex].value);
	}

	view.confirmButton[0].onclick = function(){
		$("[id=view2]").hide();
		$("[id=view3]").hide();
		$("[id=view4]").hide();
		$("[id=view5]").show();
	}

	//Update PENDING
	this.Update = function(obj){
		//Den går in här men ändrar inte pending
		console.log("pending update");
		var totprice = 0;
		var guests =  model.getNumberOfGuests();
		for(key = 0;key < obj.ingredients.length;key++){
			totprice += obj.ingredients[key].price*guests;
		}

		view.pending[0].html = totprice;
	}

	this.cancelPending = function(){
		view.pending[0].html = 0;
	}
}