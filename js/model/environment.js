var Environment = function () {

	var windMagnitude;
	var windDirection;		//Should be a unit vector
	var windVelocity
	//max and min used for generation random nr in range for direction
	var max = 10;
	var min = -10; 

	this.update = function () {
		//Should be updated every specified time interval
		//windMagnitude = Math.random() * 0.1;
		windMagnitude = 0;
		/* Code to randomize the wind direction using random values for the x and y coordinates 
		var x = Math.random() * (max - min) + min;
		var y = Math.random() * (max - min) + min;
		windDirection = new Victor(x, y);
		windDirection.normalize();		//The direction vector should be a unit vector
		*/
		//Code to randomize the wind direction using an angle
		//This code does not need to normalize the vector
		var theta = Math.random() * Math.PI * 2;		//Random angle between 0 and 2pi (radians)
		windDirection = new Victor(Math.cos(theta), Math.sin(theta));
		windVelocity = new Victor(windDirection.x * windMagnitude, windDirection.y * windMagnitude);

	}
	this.getWindMagnitude = function () { return windMagnitude; };
	this.getWindDirection = function () { return windDirection; };
	this.getWindVelocity = function () { return windVelocity; };

	this.update();

	return this;

}
