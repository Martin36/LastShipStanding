﻿var Canonball = function () {

	var position = new Victor(0, 0);
	var velocity = new Victor(0, 0);
	var speed = 5;
	var deathTimer = 2000;
	var dead = false;

	this.updatePosition = function(windVelocity, dt){
		//velocity.add(windVelocity);		//Calculate the new velocity depending on the wind velocity
		var distanceVector = new Victor(dt, dt).multiply(velocity);
		position.add(distanceVector);
		deathTimer -= dt;
		checkTimer();
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
	this.getSpeed = function() {return speed;};
	this.isDead = function() {return dead;};
	return this;
};