// Did not manage to get setter to work
// in chrome console it says "undefined" when i call the set functions
var Player = function( ){

	var name = "",
	    position = [],	
	    angle = 0.0,
	    speed = 0.0,
	    hp = 0,
	    dead = false;

	this.setName = function (name) { this.name = name; };
	this.getName = function () { return name; };
	this.setPosition = function (pos) { this.pos = pos; };
	this.getPosition = function () { return position; };
	this.setAngle = function (angle) { this.angle = angle; };
	this.getAngle = function () { return this.angle; };
	var setSpeed = function (speed) { this.speed = speed; };

	this.takeDamage = function () {
	    hp -= 10;
	    if (hp <= 0) {
	        this.dead = true;
	    }
	};

	this.getHp = function () { return this.hp; };
	this.isDead = function () { return this.dead; };
}

