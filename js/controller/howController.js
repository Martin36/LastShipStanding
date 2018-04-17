var howController = function (view, model) {

    view.backBtn[0].onclick = function () {
        $("[id=howView]").hide(); // hide this view
        $("[id=view1]").show(); // show main menu
    };

    return this;
}