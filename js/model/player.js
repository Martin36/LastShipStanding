var Player = function () {

	var name = "",
		pos = new Victor(0, 0),
		dir = new Victor(1, 0), // Use a direction instead of angle?
		angle = 0.0,
		speed = 0.0,
		hp = 0,
		deltaA = 0.0,
		dead = false,
		image = "",
		keyBindings = [],
		canonballs = [];

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
	this.fire = function(){
		//The canonballs should be fired in the perpendicular direction to the boat
		var canonball1 = new Canonball();
		var canonball2 = new Canonball();
		canonball1.setPosition(pos);		//Add offset to starting position?
		canonball2.setPosition(pos);

		//The vector [x, y] have the orthogonal vector [y, -x] for arbitrary values of x and y the reversed vector of [y, -x] is [-y, x]
		//The multiplication with the canonball speed makes sure that the velocity for the canonball is correct
		var velocity1 = new Victor(dir.y * canonball1.getSpeed(), -dir.x * canonball1.getSpeed());
		var velocity2 = new Victor(-dir.y * canonball2.getSpeed(), dir.x * canonball2.getSpeed());
		canonball1.setVelocity(velocity1);
		canonball2.setVelocity(velocity2);
		canonballs.push(canonball1);
		canonballs.push(canonball2);

	}

	this.updatePosition = function(windVelocity, dt){
		var windDirection = windVelocity.clone().normalize();
		var windMagnitude = windVelocity.lenght();

		var cosOfAngle = windDirection.dot(dir);		//The cos-value of the angle between the wind direction and the direction of the boat
		speed = windMagnitude * cosOfAngle;		//If the wind is parallell to the boat then the speed becomes equal to the magnitue of the wind, if it is perpendicular then it becomes 0	

		//Here the player is moved to the right position
		var distance = speed * dt;
		scalar.x = distance;
		scalar.y = distance;
		var distanceVector = scalar.multiply(dir);		//The lenght and direction to move the player
		pos.add(distanceVector);

		updateCanonballPos(windVelocity, dt);
	}
	
	this.updateCanonballPos = function(windVelocity, dt){
		for(canonball in canonballs){
			canonball.updatePos();
		}

	}

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
	this.setKeyBindings = function(keys) { keyBindings = keys; };
	this.getCanonballs = function() { return canonballs; };

	return this;
}

