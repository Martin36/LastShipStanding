//View Object constructor
var View2 = function (model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.people_form = $("#nrOfPeople");
	this.confirmButton = $("#confirmDinner");
	this.pending = $("#view2Pending");
	
	model.addObserver(this);

	this.update = function(info) {
		updateMenu();
		updatePrice();
	}
	
	//Fult och en repition av en funktion som redan finns i andra filer. Men de funkar. räknar ut dishens egna kostnad endast.
	var UpdateTotalSum = function (obj) {
		var totprice = 0;
		var guests =  model.getNumberOfGuests();
		for(key = 0;key < obj.ingredients.length;key++){
			totprice += obj.ingredients[key].price*guests;
		}
		return totprice;
	}
	
	function updateMenu(){
		this.container = $("#SelectedDishes");
		var menu_dishes = model.getFullMenu();
		
		
		//Detta krävs för att nollställa listan för att sedan lägga in det nya.
		var parent1 = this.container[0];
		while (parent1.firstChild) {
			parent1.removeChild(parent1.firstChild);
		}
		
		for(dish in menu_dishes ){
			this.element1 = document.createElement("p");
			this.element1.setAttribute('id',menu_dishes[dish].id)
			this.element1.onclick = function(){
				console.log(menu_dishes[dish].name);
		 		model.removeDishFromMenu(menu_dishes[dish].id);
		 		//this.parentNode.removeChild(this);
				updateMenu();
				updatePrice();
			}
			//ändra i dinnerModell och använd funktionen getFullMenu ist
			var text1 = document.createTextNode( menu_dishes[dish].name + " : " + UpdateTotalSum(menu_dishes[dish]) + " SEK");
			element1.appendChild(text1);

			this.container[0].appendChild(element1);
		}


	}

	function updatePrice(){
		this.totalPrice = $("#totalMenuPrice"); //kolla som exempel i View3 eller View4.
		this.totalPrice[0].innerHTML = "SEK   " + model.getTotalMenuPrice();
	}
	

	//this.confirmdinner = $("#confirmDinner");
}