$(function() {
	var model;
	//var model = new Model();

	var view1 = new View1();
	var controller1 = new Controllerview1(view1, model);

	var view2 = new View2();
	var controller2 = new Controllerview1(view2, model);

	var view3 = new View3();
	var controller3 = new Controllerview3(view3, model);
});