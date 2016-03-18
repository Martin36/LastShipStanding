//View Object constructor
var View6 = function (model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	
	model.addObserver(this);
	
	//information holds 2 vars, Guests and the menu as an array.
	
	this.update = function(info) {
		removePage();
		updatePage();
	}

	function updatePage(){
		this.img_container = $("#view6"); //container for images and prices

		var menu_dishes = model.getFullMenu();

		for(dish in menu_dishes ){
			//create <div class="row" style="padding-top:5%;padding-left:5%;">
			var div0 = document.createElement("div");
			div0.setAttribute('style', 'padding-top:5%');
			div0.setAttribute('style', 'padding-left:5%');
			div0.setAttribute('id', "view6"+menu_dishes[dish].name);
			div0.setAttribute('class', 'row');

			//create <div class="col-md-2">
				//<img src="images/icecream.jpg" alt="icecream"
				//	style="width:304px;height:228px;">
			var div1 = document.createElement("div");
			div1.setAttribute('class', 'col-md-2');

			var img1 = document.createElement("img");
			img1.style.width = "304px";
			img1.style.height = "228px";
			img1.src = "images/"+menu_dishes[dish].image;
			div1.appendChild(img1);

			div0.appendChild(div1);

			//create <div class="col-md-2">
				//<h3>name
				//<p>
			var div2 = document.createElement("div");
			div2.setAttribute('class', 'col-md-2');

			var h2 = document.createElement("h3");
			h2.innerHTML = menu_dishes[dish].name;
			div2.appendChild(h2);

			var p2 = document.createElement("p");
			p2.innerHTML = menu_dishes[dish].description;
			div2.appendChild(p2);

			div0.appendChild(div2);


			//create <div class="col-md-4">
				//<h3>preperation
				//<p>
			var div3 = document.createElement("div");
			div3.setAttribute('class', 'col-md-4');

			var h3 = document.createElement("h3");
			h3.innerHTML = "Preperation";
			div3.appendChild(h3);

			var p3 = document.createElement("p");
			p3.innerHTML = menu_dishes[dish].description;
			div3.appendChild(p3);

			div0.appendChild(div3);

			this.img_container[0].appendChild(div0);
		}
	}

	function removePage(){
		var menu_dishes = model.getFullMenu();

		for(dish in menu_dishes ){
			var elem = document.getElementById("view6"+menu_dishes[dish].name);
			if(elem){
		 		elem.parentNode.removeChild(elem);
		 	}
		}
	}
}