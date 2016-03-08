var Player = function () {

	var name = "",
		pos = new Victor(0, 0),
		dir = new Victor(1, 0), // Use a direction instead of angle?
		angle = 0.0,
		speed = 0.0,
		hp = 0,
		deltaA = 0.0,
		dead = false;

		keyBindings = []

	// Give variables standard values
	hp = 100;
	deltaA = 15;

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
	this.takeDamage = function () {
		hp -= 10;
		if (hp <= 0) {
			dead = true;
		}
	};
	this.isDead = function () { return dead; };

	this.setName = function (n) { name = n; };
	this.getName = function () { return name; };
	this.setDirection = function (direction) { dir = direction; };
	this.getDirection = function () { return dir; };
	this.setPosition = function (p) {
		pos.x = p.x;
		pos.y = p.y;
	};
	this.getPosition = function () { return pos; };
	this.setAngle = function (a) { angle = a; }; // Will we use this or rotate?
	this.getAngle = function () { return angle; };
	this.setSpeed = function (s) { speed = Math.abs(s); };
	this.getSpeed = function () { return speed; };
	this.getHp = function () { return hp; };
	this.setKeyBindings(keys) {};
	return this;
}

