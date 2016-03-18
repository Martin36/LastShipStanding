//View Object constructor
var View4 = function (model) {
	
	this.backDish = $("#BackDish"); //klar
	this.ingredients = $("#Ingredients"); //Klar
	this.ingredPeople = $("#IngredPeople"); //klar
	this.foodTitle = $("#FoodTitle"); //klar
	this.confirmDish = $("#ConfirmDish"); 
	this.dishPrep = $("#DishPrep"); //klar
	this.totalSum = $("#TotalSum"); //klar
	this.pictureView4 = $("#PictureView4"); //klar
	
	this.obj;
	
	model.addObserver(this);
	
	this.update = function(info) {
		if( this.obj !== undefined){
			this.UpdatePeople();
			this.UpdateIngredients(this.obj);
			this.UpdateTotalSum(this.obj);
		}
	}
	
	this.Clear = function(){
		var parent1 = this.ingredients[0];
		
		while (parent1.firstChild) {
			parent1.removeChild(parent1.firstChild);
		}
	}
	
	this.UpdatePeople = function () {
		this.ingredPeople[0].innerHTML = "INGREDIENTS FOR " + model.getNumberOfGuests() + " PEOPLE";
	}
	
	this.UpdatePrep = function (obj) {
		this.dishPrep[0].innerHTML = obj.description;
	}
	
	this.UpdateTitle = function (obj) {
		this.foodTitle[0].innerHTML = obj.name;
	}
	
	this.UpdateIngredients = function (obj) {
		this.Clear();
		peps = model.getNumberOfGuests();
		for(key = 0;key < obj.ingredients.length;key++){ 
			var p = document.createElement("p");
			p.innerHTML = obj.ingredients[key].quantity*peps +" "+ 
			obj.ingredients[key].unit +" "+ obj.ingredients[key].name + " " + obj.ingredients[key].price*peps +" sek";
			this.ingredients[0].appendChild(p);
		}
	}
	
	this.UpdateTotalSum = function (obj) {
		var totprice = 0;
		var guests =  model.getNumberOfGuests();
		for(key = 0;key < obj.ingredients.length;key++){
			totprice += obj.ingredients[key].price*guests;
		}
		this.totalSum[0].innerHTML = "SEK " + totprice;
	}
	
	this.UpdatePicture = function (obj) {
		this.pictureView4[0].src = "images/"+obj.image;
	}
}