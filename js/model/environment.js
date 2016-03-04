var Environment = function () {

	var windMagnitude;
	var windDirection;		//Should be a unit vector
	//max and min used for generation random nr in range for direction
	var max = 10;
	var min = -10; 

	this.update = function () {
		//TODO: Randomize the wind magnitude and direction
		//Should be updated every specified time interval
		windMagnitude = Math.random() * 10;
		var x = Math.random() * (max - min) + min;
		var y = Math.random() * (max - min) + min;
		windDirection = new Victor(x, y);
		windDirection.normalize();		//The direction vector should be a unit vector
	}
	this.getWindMagnitude = function () { return windMagnitude; };
	this.getWindDirection = function () { return windDirection; };

	this.update();

	return this;

}
