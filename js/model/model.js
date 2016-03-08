var Model = function () {

	var players = [];
	var environment = new Environment();
	var randomizePos = false;
	var canonballSpeed = 10;
	var folder = ""; 		//Path to the folder where the source images is contained

	this.addPlayer = function (name) {
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
	this.getPlayers = function(){ return players; };
	this.setFolder = function(f) { folder = f;};
	this.getFolder = function() { return folder; };

	// Vector algebra by using the Victor package
	this.update = function (dt) {

		var windVelocity = environment.getWindVelocity();
		var scalar = new Victor();			//Vector to represent distance scalar in vector multiplication(needed for Victor package)

		for (player in players) {
			player.updatePos(windVelocity, dt);
		}

		checkForCollisions();

		// Should Controller contain a gameloop which calls this??
	}
	//Turns the player in the specified direction
	//Give the direction input as a string
	/*
	this.turnPlayer = function(playerNr, direction){
		if(playerNr > players.length || playerNr < 0) {		//Safety check
			alert("Index out of bounds! Please try again");
		}
		if(direction === "right"){
			players[playerNr].rotateRight();
		}
		else if (direction === "left") {
			players[playerNr].rotateLeft();
		}
		else {
			alert("That's not a valid direction! Try again.")
		}
	};
	*/
	//Function for firing the cannon
	/*
	this.fire = function (playerNr) {

		var position = players[playerNr].getPosition();
		var playerDirection = players[playerNr].getDirection();

		//The canonballs should be fired in the perpendicular direction to the boat
		var canonball1 = new Canonball();
		var canonball2 = new Canonball();
		canonball1.setPosition(position);
		canonball2.setPosition(position);

		//The vector [x, y] have the orthogonal vector [y, -x] for arbitrary values of x and y the reversed vector of [y, -x] is [-y, x]
		//The multiplication with the canonball speed makes sure that the velocity for the canonball is correct
		var velocity1 = new Victor(playerDirection.y * canonballSpeed, -playerDirection.x * canonballSpeed);
		var velocity2 = new Victor(-playerDirection.y * canonballSpeed, playerDirection.x * canonballSpeed);
		canonball1.setVelocity(velocity1);
		canonball2.setVelocity(velocity2);
		canonballs.push(canonball1);
		canonballs.push(canonball2);

	};
	*/
	var checkForCollisions = function () {
		//TODO: Check for intersection between canonballs and boats
	}
	return this;

}
