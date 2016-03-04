var Model = function () {

	var players = [];
	var environment = new Environment();
	var randomizePos = false;

	this.addPlayer = function (name) {
		//TODO: Fill list with the nr of players specified
		var player = new Player();
		player.setName(name);
		//Randomize position?
		if (randomizePos) {
			player.setPosition(new Victor(/*Random values*/));
		}
		players.push(player);
	};

	this.removePlayer = function () {
		// Don't remove player if the list is empty
		if (players.length > 0)
			players.pop();
		else
			alert("The list of players is empty!");
	};

	this.getPlayer = function (index) {
		if (index < 0 || index > players.length) {	//Safety check
			throw "Index Out Of Bounds!";
		}
		return players[index];
	}

	// Vector algebra by using the Victor package
	this.update = function (dt) {
		// TODO: get wind direction and strength from environment.
		var windDirection = environment.getWindDirection();
		var windMagnitude = environment.getWindMagnitude();
		var scalar = new Victor();			//Vector to represent distance scalar in vector multiplication
		for(var i = 0; i < players.length; i++){
			var cosOfAngle = windDirection.dot(players[i].getDirection());		//The cos-value of the angle between the wind direction and the direction of the boat
			var speed = windMagnitude * cosOfAngle;		//If the wind is parallell to the boat then the speed becomes equal to the magnitue of the wind, if it is perpendicular then it becomes 0	
			players[i].setSpeed(speed);		
			//Here the player is moved to the right position
			var currPos = players[i].getPosition();
			var distance = speed * dt;
			document.write(distance + "<br/>");
			var dir = players[i].getDirection();
			document.write(dir.toString() + "<br/>");
			scalar.x = distance;
			scalar.y = distance;
			var distanceVector = scalar.multiply(dir);		//The lenght and direction to move the player
			document.write(distanceVector.toString() + "<br/>");
			players[i].setPosition(currPos.add(distanceVector));
			document.write(currPos.toString() + "<br/>");

		}
		// calculate new position of all players.
		// Update things....
		// Should Controller contain a gameloop which calls this??
	}

	return this;

}
