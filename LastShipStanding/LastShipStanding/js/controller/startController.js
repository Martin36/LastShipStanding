    var startController = function(view,model) {

    // Loop the bg music
    model.getBgAudio().loop = true;
    model.getBgAudio().volume = 0.05;
    model.getBgAudio().play();
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

    var vol = 0.05;
    var fadeIn = setInterval(
    function() {
        // Reduce volume by 0.05 as long as it is above 0
        // This works as long as you start with a multiple of 0.05!
        if (vol < 1) {
            model.getBgAudio().volume = vol;
            vol += 0.05;
        }
        else {
            // Stop the setInterval when 0 is reached
            clearInterval(fadeIn);
        }
    }, 400);


}