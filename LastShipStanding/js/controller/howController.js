var howController = function (view, model) {

    var i = false;

    view.backBtn[0].onclick = function () {
        $("[id=howView]").hide(); // hide this view
        $("[id=view1]").show(); // show main menu
    }

    view.muteBtn[0].onclick = function () {
        if (i) {
            model.getSounds().getBGAudio().pause();
            i = false;
            view.muteBtn[0].textContent = "Unmute :)";
        }
        else {
            model.getSounds().getBGAudio().play();
            i = true;
            view.muteBtn[0].textContent = "Mute :(";
        }
    };

    return this;
}