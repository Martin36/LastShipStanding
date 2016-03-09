var Canonball = function () {

	var position = new Victor(0, 0);
	var velocity = new Victor(0, 0);
	var speed = 5;
	

	this.updatePosition = function(windVelocity, dt){
		//velocity.add(windVelocity);		//Calculate the new velocity depending on the wind velocity
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