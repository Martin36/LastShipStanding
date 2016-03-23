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

    // All ship images have similar names
    for (var i = 0; i < nrOfBoatImages; i++) {
        shipImage[i] = new Image();
        shipImage[i].alt = "player";
        shipImage[i].width = 80;
        shipImage[i].height = 60;
        shipImage[i].src = "images/ships/ship_pattern" + i.toString() + ".png";
    }

    this.getShipImage = function (i) { return shipImage[i]; };
    this.getShipImages = function () {return shipImage; };
    this.getCanonballImage = function () { return canonballImage; };
    this.getArrowImage = function () { return arrowImage; };

    return this;
}