var howController = function (view, model) {

    var i = true;

    view.backBtn[0].onclick = function () {
        $("[id=howView]").hide(); // hide this view
        $("[id=view1]").show(); // show main menu
        model.getSounds().getHowToAudio().pause();
        if(i){ model.getSounds().getBgAudio().play(); };
    }

    view.muteBtn[0].onclick = function () {
        if (i) {
            model.getSounds().getHowToAudio().pause();
            i = false;
            view.muteBtn[0].textContent = "Unmute :)";
        }
        else {
            model.getSounds().getHowToAudio().play();
            i = true;
            view.muteBtn[0].textContent = "Mute :(";
        }
    };

    return this;
}