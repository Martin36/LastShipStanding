$(function () {
	var models = new model();
	models.addPlayer("Anton");
	models.addPlayer("Julian");
	models.addPlayer("Steffe");
	models.addPlayer("Martin");
	
	
	var view1 = new View1(models);
	var controller1 = new Controllerview1(view1, models);

	var view2 = new View2(models);
	var controller2 = new Controllerview2(view2, models);

	var view3 = new View3(models);
	var controller3 = new playController(view3, models);
});