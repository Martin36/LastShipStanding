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

    var shipImagesSrc = [];
    var nrOfBoatImages = 19;

    // All ship images have similar names
    for (var i = 0; i < nrOfBoatImages; i++) {
        shipImagesSrc[i] = "images/ships/ship_pattern" + i.toString() + ".png";
    }

    this.getShipImagesSrc = function () {return shipImagesSrc; };
    this.getCanonballImage = function () { return canonballImage; };
    this.getArrowImage = function () { return arrowImage; };

    return this;
}