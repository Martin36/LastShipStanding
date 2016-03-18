// $(function () {}); This is jQuery's document ready function.
// it runs when the document has finished loading.   
$(function () {
	//We instantiate our model
	var model = new DinnerModel();
	
	var view1 = new View1(model);
	var controller1 = new Controllerview1(view1,model);
	
	var view2 = new View2(model);
	var Controller2 = new Controllerview2(view2,model);
	
	var view4 = new View4(model);
	var Controller4 = new Controllerview4(view4,model, Controller2);
	
	var view3 = new View3(model);
	var Controller3 = new Controllerview3(view3,model,Controller4,Controller2);
	
	var view5 = new View5(model);
	var Controller5 = new Controllerview5(view5,model);

	var view6 = new View6(model);
	var Controller6 = new Controllerview6(view6,model);
	
});