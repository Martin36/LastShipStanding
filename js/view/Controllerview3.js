var Controllerview3 = function(view, model) {
	
	//Exempel kod från Matlagnings-sidan
	
	/*
	var starter = model.getAllDishes("starter","");
	var main = model.getAllDishes("main dish","");
	var dessert = model.getAllDishes("dessert","");
	
	var changeStarter = function () {
		for(key = 0;key < starter.length;key++){ // Loop throu all Starter dishes
			addTemplate(starter[key]);
		}
	}
	
	var changeMain = function () {
		for(key = 0;key < main.length;key++){ //Loop throu all Main dishes
			addTemplate(main[key]);
		}
	}
	
	var changeDessert = function () {
		for(key = 0;key < dessert.length;key++){ //Loop throu all Dessert dishes
			addTemplate(dessert[key]);
		}
	}
	
	var SearchedDishes = function (dishlist) {
		for(key = 0;key < dishlist.length;key++){ //Loop throu all founded dishes
			addTemplate(dishlist[key]);
		}
	}
	
	var addTemplate = function (obj) {
		//bild
		var div3 = document.createElement("div");
		div3.setAttribute('class', 'col-md-2');
		div3.setAttribute('style', 'padding-right:2px');
		
		var img = document.createElement("img");
		img.style.width = "200px";
		img.style.height = "228px";
		img.src = "images/"+obj.image;
		
		div3.appendChild(img);
		view.pictureView3[0].appendChild(div3);
		
		img.addEventListener("click", function() {
			controller.Update(obj);
			controller2.Update(obj);
			$("[id=view3]").hide();
			$("[id=view4]").show();
		});
		
		//rubrik
		var div = document.createElement("div");
		div.innerHTML = "<h2>"+obj.name+"</h2>";
		div.setAttribute('class', 'col-md-2');
		view.titlePicture[0].appendChild(div);
		
		//Description
		var div2 = document.createElement("div");
		div2.innerHTML = "<p>"+obj.description+"</p>";
		div2.setAttribute('class', 'col-md-2');
		view.descriptionPicture[0].appendChild(div2);
		
	}
	
	view.dishSelect.change(function () {
		var selected = $(this).find("option:selected").text();
	
		view.Clear();
		
		if(selected == "Starter"){
			changeStarter();
		}
		else if(selected == "Main Dish"){
			changeMain();
		}
		else if(selected == "Dessert"){
			changeDessert();
		}
	});
	
	view.searchFood[0].addEventListener("click", function () {
		
		view.Clear();
		
		var selected = view.dishSelect.find("option:selected").text();
		var search = view.searchBox[0].value;
		var dishes = model.getAllDishes(selected.toLowerCase(),search);
		SearchedDishes(dishes);
	});
	
	
	changeStarter();


	*/
	
}