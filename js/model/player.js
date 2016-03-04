var Player = function(){

    var name = "",
	    pos = new Victor(),
        dir = new Victor(), // Use a direction instead of angle?
	    angle = 0.0,
        deltaA = 0.0,
	    speed = 0.0,
        score = 0,
        reloadTime = 0.0, // Should we have something like this?
	    hp = 0,
	    dead = false;

    // Give variables standard values
    reloadTime = 0.6;
    hp = 100;
    deltaA = 15;

	this.setName = function (n) { name = n; };
	this.getName = function () { return name; };

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
	this.getAngle = function () { return angle; };

	this.setSpeed = function (s) { speed = s; };

	this.giveScore = function (s) { score += s; };
	this.getScore = function () { return score; };

	this.takeDamage = function (d) {
	    hp -= d;
	    if (hp <= 0) {
	        dead = true;
	    }
	};
	this.getHp = function () { return hp; };

	this.isDead = function () { return dead; };
    
}

