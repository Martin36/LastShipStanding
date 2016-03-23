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

    var shipImage = [];
    var nrOfBoatImages = 19;

    for (var i = 0; i < nrOfBoatImages; i++) {
        shipImage[i] = new Image();
        shipImage[i].alt = "player";
        shipImage[i].width = 80;
        shipImage[i].height = 60;
        shipImage[i].src = "ship_pattern" + i.toString();
    }

    this.getBoatImage = function (i) {
        return boatImage[i];
    };

    this.getCanonballImage = function () { return canonballImage; };
    this.getArrowImage = function () { return arrowImage; };

    return this;
}