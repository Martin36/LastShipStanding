var Player = function () {

	var name = "",
	pos = new Victor(),
	dir = new Victor(1, 0),
	
	engineSpeed = 1,
	angle = 0.0,
	speed = 0.0,
	hp = 0,
	score = 0,
	deltaA = 0.0,
	dead = false,
	keyBindings = [],
	canonballs = [],
	collisionRadius = 0,
	cooldown = 0,
	cooldownTimer = 0,
	fireReady = true,
	
	shipImage = new Image(); // Set to something else in settingsController
	shipImage.alt = "player";
	shipImage.width = 80;
	shipImage.height = 60;
	shipImage.src = "images/ships/ship_pattern9.png"; // Set to something else in settingsController

  	// Give variables standard values
	hp = 100;
	deltaA = Math.PI / 100;
	pos.x = 700, pos.y = 400;
	collisionRadius = 50;
	cooldown = 400;

	this.rotateRight = function () {
		angle += deltaA;
		if (angle > Math.PI * 2) {
			angle -= Math.PI * 2;
		}
		//Rotate direction
		dir.x = Math.cos(angle);
		dir.y = Math.sin(angle);
		dir.normalize();
	};

	this.rotateLeft = function () {
		angle -= deltaA;
		if (angle < Math.PI * 2) {
			angle += Math.PI * 2;
		}
		//Rotate direction
		dir.x = Math.cos(angle);
		dir.y = Math.sin(angle);
		dir.normalize();
	};

	this.takeDamage = function () {
		hp -= 10;
		if (hp <= 0) {
			dead = true;
		}
	};

	this.updatePosition = function (windVelocity, dt) {
		var windDirection = windVelocity.clone().normalize();
		var windMagnitude = windVelocity.length();

		var cosOfAngle = windDirection.dot(dir);		//The cos-value of the angle between the wind direction and the direction of the boat
		speed = windMagnitude * cosOfAngle;		//If the wind is parallell to the boat then the speed becomes equal to the magnitue of the wind, if it is perpendicular then it becomes 0	

		//Here the player is moved to the right position
		var distanceVector = new Victor(speed * dt, speed * dt).multiply(dir);		//The distance traveled with the wind

		//Effect of the engine
		var distanceVectorFromEngine = new Victor(engineSpeed * dt, engineSpeed * dt).multiply(dir);	//The distance traveled with the engine
		distanceVector.add(distanceVectorFromEngine);		//Final distance traveled

		checkBoundaries(distanceVector);
		pos.add(distanceVector);
		//Check if canons are ready to fire
		if (!fireReady) {
			cooldownTimer += dt;
			if (cooldownTimer >= cooldown) {
				fireReady = true;
				cooldownTimer = 0;
			}
		}
	};

	function checkBoundaries(distance) {
		var tempPos = pos.clone().add(distance);
		if (tempPos.y < 0 || tempPos.y > 800) {
			distance.y = 0;
		}
		if (tempPos.x < 0 || tempPos.x > 1400) {

			distance.x = 0;
		}
	}

	this.isDead = function () { return dead; };
	this.getName = function () { return name; };
	this.getDirection = function () { return dir; };
	this.getPosition = function () { return pos; };
	this.getAngle = function () { return angle; };
	this.getSpeed = function () { return speed; };
	this.getHp = function () { return hp; };
	this.getKeyBindings = function () { return keyBindings; };
	this.getCanonballs = function () { return canonballs; };
	this.getCollisionRadius = function () { return collisionRadius; };
	this.getCooldownTimer = function () { return cooldownTimer; };
	this.getCooldownTime = function () { return cooldown; };
	this.getScore = function () { return score; };
	this.getImage = function () { return shipImage; };

	this.setName = function (n) { name = n; };
	this.setDirection = function (direction) { dir = direction; };
	this.setPosition = function (p) { pos.x = p.x; pos.y = p.y; };
	this.setAngle = function (a) {
		angle = a;
		dir.x = Math.cos(angle);
		dir.y = Math.sin(angle);
		dir.normalize();
	};
	this.setSpeed = function (s) { speed = Math.abs(s); };
	this.setKeyBindings = function (keys) { keyBindings = keys; };
	this.isFireReady = function () { return fireReady; };
	this.fired = function () { fireReady = false; };
	this.giveScore = function () { score += 1; };
	this.setImage = function (newship) { shipImage.src = newship; };
	
	return this;
}
