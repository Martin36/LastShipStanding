    var startController = function(view,model) {

    // Loop the bg music
    model.getBgAudio().loop = true;
    model.getBgAudio().volume = 0.0;
	model.getBgAudio().play();
	model.fadeIn(model.getBgAudio());
	
    var i = true;

    view.playBtn[0].onclick = function () {
		$("[id=view1]").hide(); //main menu
		$("[id=view2]").show(); //play menu
	};

    view.muteBtn[0].onclick = function () {
        if (i) {
            model.getBgAudio().pause();
            i = false;
            view.muteBtn[0].textContent = "Unmute :)";
        }
        else {
            model.getBgAudio().play();
            i = true;
            view.muteBtn[0].textContent = "Mute :(";
        }
    };
}