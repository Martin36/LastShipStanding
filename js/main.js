$(function () {
	var models = new model();
	
	var headerView = new bannerView(models);
	var headerController = new bannerController(headerView, models);

	var view1 = new View1(models);
	var controller1 = new startController(view1, models, headerController);

	var view3 = new View3(models);
	var controller3 = new playController(view3, models, headerController);

	var view2 = new View2(models);
	var controller2 = new settingsController(view2, controller3, models);

	var tutorialView = new howView(models);
	var tutorialController = new howController(tutorialView, models);
});