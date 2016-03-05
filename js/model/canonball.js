var Canonball = function () {

	var position = new Victor();
	var velocity = new Victor();

	//Input of type Victor
	this.setPosition = function (pos) { position = pos; };
	this.getPosition = function () { return position; };
	//Input of type Victor
	this.setVelocity = function (vel) { velocity = vel; };
	this.getVelocity = function () { return velocity; };

	return this;
};