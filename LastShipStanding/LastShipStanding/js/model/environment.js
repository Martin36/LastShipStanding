var Environment = function () {

	var windMagnitude;
	var windDirection;		//Should be a unit vector
	var windVelocity;
	//max and min used for generation random nr in range for direction
	var max = 10;
	var min = -10;
	var eVCooldown = 300;
	var eVTimer = eVCooldown;

	this.update = function (dt) {
	    if (eVTimer <= 0) {
	        this.generateNewWind();
	    }
	    this.decreaseEVTimer(dt);
	};

	this.generateNewWind = function (first) {
	    this.resetEVTimer();
	    //environment.update();
	    //Should be updated every specified time interval
	    windMagnitude = Math.random() * 2;
	    if (first) windMagnitude = Math.random();
	    //Code to randomize the wind direction using an angle
	    //This code does not need to normalize the vector
	    var theta = Math.random() * Math.PI * 2;		//Random angle between 0 and 2pi (radians)
	    windDirection = new Victor(Math.cos(theta), Math.sin(theta));
	    windVelocity = new Victor(windDirection.x * windMagnitude, windDirection.y * windMagnitude);
	    //Notify observers
	};
	
	this.getWindAngle = function () {return Math.atan2(windDirection.y,windDirection.x);}
	this.getWindMagnitude = function () { return windMagnitude; };
	this.getWindDirection = function () { return windDirection; };
	this.getWindVelocity = function () { return windVelocity; };
	this.getEVCooldown = function () { return eVCooldown; };
	this.getEVTimer = function () { return eVTimer; };
	this.decreaseEVTimer = function (dt) { eVTimer -= dt; };
	this.resetEVTimer = function () { eVTimer = eVCooldown; };
    this.generateNewWind(true);
	return this;

}
