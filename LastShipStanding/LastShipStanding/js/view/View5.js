//View Object constructor
var View5 = function (model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	
	model.addObserver(this);
	
	//information holds 2 vars, Guests and the menu as an array.
	
	this.update = function(info) {
		removeAllDishes();
		showDinner();
		updatePrice();
	}

	function showDinner(){
		this.img_container = $("#view5_images"); //container for images and prices

		var menu_dishes = model.getFullMenu();

		for(dish in menu_dishes ){
			//bild
			var container = document.createElement("div");
			container.setAttribute('class', 'col-md-2');
			container.setAttribute('id', "view5"+menu_dishes[dish].name);

			var div3 = document.createElement("div");
			div3.setAttribute('class', 'row');
			
			var img = document.createElement("img");
			img.style.width = "304px";
			img.style.height = "228px";
			img.src = "images/"+menu_dishes[dish].image;
			
			div3.appendChild(img);
			container.appendChild(div3);
			
			//rubrik
			var div = document.createElement("div");
			div.innerHTML = "<h2>"+menu_dishes[dish].name+"</h2>";
			div.setAttribute('class', 'row');
			container.appendChild(div);
			
			//price text
			var element2 = document.createElement("p");
			var text2 = document.createTextNode(dishPrice(menu_dishes[dish]));
			element2.appendChild(text2);
			container.appendChild(element2);

			this.img_container[0].appendChild(container);
		}
	}

	function updatePrice(){
		this.price = $("#view5_totalPrice");
		this.price[0].innerHTML = "SEK   " + model.getTotalMenuPrice();
	}

	function removeAllDishes(){
		var menu_dishes = model.getFullMenu();

		for(dish in menu_dishes ){
			removeDish(menu_dishes[dish].name);
		}
	}
	function removeDish( dishName ){
		var elem = document.getElementById("view5"+dishName);
		if(elem){
	 		elem.parentNode.removeChild(elem);
	 	}
	}

	function dishPrice (obj) {
		var totprice = 0;
		var guests =  model.getNumberOfGuests();
		for(key = 0;key < obj.ingredients.length;key++){
			totprice += obj.ingredients[key].price*guests;
		}
		return ("SEK " + totprice);
	}
	//view1
	/*
	
	add all buttons here for view 1 and text fields
	
	*/
	
	//Example how to do it, You take out components and assign them listeners.
	
	/*
	this.numberOfGuests = container.find("#numberOfGuests");
	this.menu = container.find("#menu");
	this.totalcost = container.find("#totalcost");
	
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.okButton = container.find("#test");
	
	
	this.numberOfGuests.html(0);
	this.menu.html("Nothing yet..");
	this.totalcost.html("totalcost: ");
	
	this.minusButton[0].addEventListener("click", function() {

		model.setNumberOfGuests(-1);
		numberOfGuests.innerHTML = model.getNumberOfGuests();

	});
	
	this.plusButton[0].addEventListener("click", function() {

		model.setNumberOfGuests(1);
		numberOfGuests.innerHTML = model.getNumberOfGuests();

	});
	
		
	this.okButton[0].addEventListener("click", function() {
		
		menu.innerHTML = ("In the menu: " + model.getFullMenu());
		totalcost.innerHTML = ("Total price for " + model.getNumberOfGuests() + " peson is: "  + model.getTotalMenuPrice() +" kr");
		
	});
	*/

}