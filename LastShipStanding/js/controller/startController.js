    var startController = function(view,model) {

    // Loop the bg music
    model.getSounds().getBGAudio().loop = true;
   //bgAudio.volume = 0.0;
   //bgAudio.play();
   //model.getSounds().fadeIn(bgAudio);
	
    var i = false;
    
    view.howBtn[0].onclick = function(){
      $("[id=view1]").hide(); //main menu
      $("[id=howView]").show(); //main menu
      view.muteBtn[0].textContent = "Mute :(";
      i = true;
    }

    view.playBtn[0].onclick = function () {
		$("[id=view1]").hide(); //main menu
		$("[id=view2]").show(); //play menu
	};

    view.muteBtn[0].onclick = function () {
        if (i) {
            model.getSounds().getBGAudio().pause();
            model.getSounds().getBattleAudio().pause();
            i = false;
            view.muteBtn[0].textContent = "Unmute :)";
        }
        else {
            model.getSounds().getBGAudio().play();
            i = true;
            view.muteBtn[0].textContent = "Mute :(";
        }
    };
}