var Player = new function(){

    var name = "",
	    pos = new Victor(),
        dir = new Victor(), // Use a direction instead of angle?
	    angle = 0.0,
	    speed = 0.0,
	    hp = 0,
        deltaA = 0.0,
	    dead = false;

    // Give variables standard values
    hp = 100;
    deltaA = 15;

	this.setName = function (n) { name = n; };
	this.getName = function () { return this.name; };
	this.setPosition = function (p) {
	    pos.x = p.x;
	    pos.y = p.y;
	};
	this.getPosition = function () { return pos; };
	this.setAngle = function (a) { angle = a; }; // Will we use this or rotate?
	this.rotateLeft = function () {
	    angle += deltaA;
	    if (angle > 360) {
	        angle -= 360;
	    }
	};
	this.rotateRight = function () {
	    angle -= deltaA;
	    if (angle < 0) {
	        angle += 360;
	    }
	};
	this.getAngle = function () { return this.angle; };
	this.setSpeed = function (s) { speed = s; };
	this.takeDamage = function () {
	    hp -= 10;
	    if (hp <= 0) {
	        this.dead = true;
	    }
	};
	this.getHp = function () { return this.hp; };
	this.isDead = function () { return this.dead; };
}

