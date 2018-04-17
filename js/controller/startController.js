    var startController = function(view,model, bannerController) {

    view.howBtn[0].onclick = function(){
      $("[id=view1]").hide(); //main menu
      $("[id=howView]").show(); //main menu
      if( bannerController.getFirst() ){ bannerController.toggleMusic(); bannerController.toggleFx();}
    };


    view.playBtn[0].onclick = function () {
		$("[id=view1]").hide(); //main menu
		$("[id=view2]").show(); //play menu
    if( bannerController.getFirst() ){ bannerController.toggleMusic(); bannerController.toggleFx();}
	 };
}