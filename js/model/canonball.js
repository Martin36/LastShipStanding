var Canonball = function () {

	var position = new Victor();
	var velocity = new Victor();
	var speed = 5;

	this.updatePos = function(dt){
		velocity.add(windVelocity);		//Calculate the new velocity depending on the wind velocity
		var distanceVector = new Victor(dt, dt).multiply(velocity);
		position.add(distanceVector);
	}

	//Input of type Victor
	this.setPosition = function (pos) { position = pos; };
	this.getPosition = function () { return position; };
	
	//Input of type Victor
	this.setVelocity = function (vel) { velocity = vel; };
	this.getVelocity = function () { return velocity; };
	this.getSpeed = function() {return speed;};
	return this;
};