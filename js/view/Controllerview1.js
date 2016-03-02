var Controllerview1 = function(view,model) {
	view.dinner[0].addEventListener("click", function() {
		$("[id=view1]").hide();
		$("[id=view2]").show();
		$("[id=view3]").show();
	});
	
}