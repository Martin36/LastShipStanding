// Did not manage to get setter to work
// in chrome console it says "undefined" when i call the set functions
var Player = new function( ){

    var name = "",
	    pos = new Victor(),
        dir = new Victor(), // Use a direction instead of angle?
	    angle = 0.0,
	    speed = 0.0,
	    hp = 0,
        deltaA = 0.0,
	    dead = false;

    hp = 100;
    deltaA = 15;

	this.setName = function (n) { name = n; };
	this.getName = function () { return this.name; };
	this.setPosition = function (p) {
	    pos.x = p.x;
	    pos.y = p.y;
	};
	this.getPosition = function () { return pos; };
	this.setAngle = function (a) { angle = a; };
	this.rotateLeft = function () { angle += deltaA; };
	this.rotateRight = function () { angle -= deltaA; };
	this.getAngle = function () { return this.angle; };
	var setSpeed = function (s) { speed = s; };

	this.takeDamage = function () {
	    hp -= 10;
	    if (hp <= 0) {
	        this.dead = true;
	    }
	};

	this.getHp = function () { return this.hp; };
	this.isDead = function () { return this.dead; };
}

