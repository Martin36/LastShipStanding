var Player = function () {

    var name = "",
		pos = new Victor(),
		dir = new Victor(1, 0), // Use a direction instead of angle?
		angle = 0.0,
		speed = 0.0,
		hp = 0,
		deltaA = 0.0,
		dead = false,
		keyBindings = [],
		canonballs = [],
		collisionRadius = 50,
		cooldown = 400,
		cooldownTimer = 0,
		fireReady = true,
		mapImage = new Image();
		mapImage.alt = "player";
		mapImage.width = 80;
		mapImage.height = 60;
		mapImage.src = "images/ships/ship_pattern4.png";

	// Give variables standard values
	hp = 100;
	deltaA = Math.PI / 12;
	pos.x = 700, pos.y = 400;
//	speed = 3;
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
	/*
	this.fire = function(){
		if(fireReady){
			//The canonballs should be fired in the perpendicular direction to the boat
			var canonball1 = new Canonball();
			var canonball2 = new Canonball();
			canonball1.setPosition(pos.clone());		//Add offset to starting position?
			canonball2.setPosition(pos.clone());

			//The vector [x, y] have the orthogonal vector [y, -x] for arbitrary values of x and y the reversed vector of [y, -x] is [-y, x]
			//The multiplication with the canonball speed makes sure that the velocity for the canonball is correct
			var velocity1 = new Victor(dir.y * canonball1.getSpeed(), -dir.x * canonball1.getSpeed());
			var velocity2 = new Victor(-dir.y * canonball2.getSpeed(), dir.x * canonball2.getSpeed());
			canonball1.setVelocity(velocity1);
			canonball2.setVelocity(velocity2);
			canonballs.push(canonball1);
			canonballs.push(canonball2);
			fireReady = false;
		}

	}*/

	this.updatePosition = function(windVelocity, dt){
		var windDirection = windVelocity.clone().normalize();
		var windMagnitude = windVelocity.length();

		var cosOfAngle = windDirection.dot(dir);		//The cos-value of the angle between the wind direction and the direction of the boat
		speed = windMagnitude * cosOfAngle;		//If the wind is parallell to the boat then the speed becomes equal to the magnitue of the wind, if it is perpendicular then it becomes 0	

		//Here the player is moved to the right position
		var distance = speed * dt;
		var scalar = new Victor();
		scalar.x = distance;
		scalar.y = distance;
		var distanceVector = scalar.multiply(dir);		//The lenght and direction to move the player
		checkBoundaries(distanceVector);
		//document.write(distanceVector.toString());
		pos.add(distanceVector);
		//Check if canons are ready to fire
		if(!fireReady){
			cooldownTimer += dt;
			if(cooldownTimer >= cooldown){
				fireReady = true;
				cooldownTimer = 0;	
			} 
		}

		this.updateCanonballPos(windVelocity, dt);
	}
	function checkBoundaries(distance){
	 	var tempPos = pos.clone().add(distance);
	 	if(tempPos.y < 0 || tempPos.y > 800 ){

	 	//if(tempPos.y < 0 || tempPos.y > window.innerHeight ){
	 		distance.y = 0;
	 	}
	 	if(tempPos.x < 0 || tempPos.x > 1400){
	 	
	 	//if(tempPos.x < 0 || tempPos.x > window.innerWidth * 0.8 - 450){
	 		distance.x = 0;
	 	}
	}
	this.updateCanonballPos = function(windVelocity, dt){
	    for(var i = 0; i < canonballs.length; i ++) {
	        canonballs[i].updatePosition(windVelocity, dt);
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
	this.getKeyBindings = function() { return keyBindings; };
	this.getCanonballs = function () { return canonballs; };
	this.getCollisionRadius = function () { return collisionRadius; };
	this.isFireReady = function () { return fireReady; };
	this.fired = function () { fireReady = false; };
	this.getImage = function () { return mapImage; };
	this.getCooldownTimer = function () { return cooldownTimer; };
	this.getCooldownTime = function () { return cooldown; };
	return this;
}

