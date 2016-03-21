var model = function () {

	var players = [];
	var canonballs = [];
	var environment = new Environment();
	var environmentCooldown = 300;
	var environmentTimer = environmentCooldown;
	var randomizePos = false;
	var canonballSpeed = 10;
	var folder = ""; 		//Path to the folder where the source images is contained
	var defaultKeyBinding = new defaultKeyBindings();

	var canonballImage = new Image();
	canonballImage.alt = "canonballImage";
	canonballImage.width = 30;
	canonballImage.height = 30;
	canonballImage.src = "images/canonBall.png";

	var arrowImage = new Image();
	arrowImage.alt = "arrowImage";
	arrowImage.width = 100;
	arrowImage.height = 100;
	arrowImage.src = "images/windArrow.png";




	this.addPlayer = function (name) {
		var player = new Player();
		player.setName(name);
		//Randomize position?
		if (randomizePos) {
			player.setPosition(new Victor(/*Random values*/));
		}
		// Assign default keybindings
		var keyBindings = defaultKeyBinding.getDefault(players.length + 1);
		player.setKeyBindings(keyBindings);

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
	this.getPlayers = function () { return players; };

	this.getCanonballs = function () { return canonballs; };
	// Vector algebra by using the Victor package
	this.update = function (dt) {
		if (environmentTimer <= 0) {
			environmentTimer = environmentCooldown;
			environment.update();
			//Notify observers
		}
		var windVelocity = environment.getWindVelocity();
		var scalar = new Victor();			//Vector to represent distance scalar in vector multiplication(needed for Victor package)

		//for (var player in players) {
		for (var i = 0; i < players.length; i++) {
			//document.write(players[i].getName());
			players[i].updatePosition(windVelocity, dt);
//			var canonballs = players[i].getCanonballs();
		}
		for (var j = 0; j < canonballs.length; j++) {
			if (canonballs[j].isDead()) {
				canonballs.reverse();
				canonballs.pop();
				canonballs.reverse();
				//break;
			}
			else {
				canonballs[j].updatePosition(windVelocity, dt);
			}
		}

		checkForCollisions();
		environmentTimer -= dt;
		
		// Should Controller contain a gameloop which calls this??
	}

	//Function for firing the cannon
	this.fire = function (playerNr) {
		if (players[playerNr].isFireReady()) {
			var position = players[playerNr].getPosition().clone();
			var playerDirection = players[playerNr].getDirection().clone();

			//The canonballs should be fired in the perpendicular direction to the boat
			var canonball1 = new Canonball();
			var canonball2 = new Canonball();
			canonball1.setPosition(position);
			canonball2.setPosition(position.clone());
			canonball1.setPlayer(playerNr);
			canonball2.setPlayer(playerNr);

			//The vector [x, y] have the orthogonal vector [y, -x] for arbitrary values of x and y the reversed vector of [y, -x] is [-y, x]
			//The multiplication with the canonball speed makes sure that the velocity for the canonball is correct
			var velocity1 = new Victor(playerDirection.y * canonballSpeed, -playerDirection.x * canonballSpeed);
			var velocity2 = new Victor(-playerDirection.y * canonballSpeed, playerDirection.x * canonballSpeed);
			canonball1.setVelocity(velocity1);
			canonball2.setVelocity(velocity2);
			canonballs.push(canonball1);
			canonballs.push(canonball2);
			players[playerNr].fired();

		}
	};

	function checkForCollisions() {
		//Loop through the canonballs
		var hitIndex = [];
		for (var i = 0; i < canonballs.length; i++) {
			for (var j = 0; j < players.length; j++) {
				if (canonballs[i].getPlayer() != j) {		//We dont want to be able to shoot ourselves
					var playerPosition = players[j].getPosition().clone();
					var vectorToPlayer = playerPosition.subtract(canonballs[i].getPosition());
					var distance = vectorToPlayer.length();
					if (distance < players[j].getCollisionRadius()) {		//Then there is a collision
						players[j].takeDamage();
						console.log("Player " + j + 1 + " is hit!");
						//canonballs.splice(i, 1);		//Removes the canonball from the array
						hitIndex.push(i);
					}
				}
			}
		}
		for (i in hitIndex) {
			canonballs.splice(hitIndex[i], 1);
		}
	}

	this.getEnvironment = function () { return environment; };
	this.getCanonballImage = function () { return canonballImage; };
	this.getArrowImage = function () { return arrowImage; };


	return this;
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
