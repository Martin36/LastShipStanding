var Canonball = function () {

	var position = new Victor(0, 0);
	var velocity = new Victor(0, 0);
	var speed = 10;
	var deathTimer = 200;
	var dead = false;
	var whichPlayer = 0;
	var windEffect = 0.1;
	var collisionRadius = 10;

	this.updatePosition = function(windVelocity, dt){
		velocity.add(windVelocity.clone().multiply(new Victor(windEffect, windEffect)));		//Calculate the new velocity depending on the wind velocity
		var distanceVector = new Victor(dt, dt).multiply(velocity);
		position.add(distanceVector);
		deathTimer -= dt;
		this.checkTimer();
	}
	this.checkTimer = function(){
		if(deathTimer <= 0) dead = true;
	}
	//Input of type Victor
	this.setPosition = function (pos) { position = pos; };
	this.getPosition = function () { return position; };
	
	//Input of type Victor
	this.setVelocity = function (vel) { velocity = vel; };
	this.getVelocity = function () { return velocity; };
	this.getSpeed = function () { return speed; };
	this.setPlayer = function (playerID) { whichPlayer = playerID; };
	this.getPlayer = function () { return whichPlayer; };
	this.getCollisionRadius = function () { return collisionRadius; };

	this.isDead = function() {return dead;};

	return this;
};