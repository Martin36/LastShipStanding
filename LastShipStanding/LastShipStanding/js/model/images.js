var Images = function () {

    var canonballImage = new Image();
    canonballImage.alt = "canonballImage";
    canonballImage.width = 30;
    canonballImage.height = 30;
    canonballImage.src = "images/canonBall.png";

    var arrowImage = new Image();
    arrowImage.alt = "arrowImage";
    arrowImage.width = 100;
    arrowImage.height = 100;
    arrowImage.src = "images/windArrow.png";

    this.getCanonballImage = function () { return canonballImage; };
    this.getArrowImage = function () { return arrowImage; };

    return this;
}