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
	var fireAudio, deathAudio, bgMusicAudio, battleAudio, boatHit;

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

	bgMusicAudio = new Audio('sounds/menuMusic1.mp3');
	battleAudio = new Audio('sounds/battleMusic.mp3');

	this.getBgAudio = function () { return bgMusicAudio; };
	this.getBattleAudio = function () { return battleAudio; };
	this.getBoatHitAudio = function () { return new Audio('sounds/boatHit1.mp3'); };

	this.getFireAudio = function () {
	    fireAudio = [new Audio('sounds/canonFire2.mp3'),
	                 new Audio('sounds/canonFire3.mp3')];
	    var r = Math.floor((Math.random() * fireAudio.length));
	    return fireAudio[r];
	}

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
				canonballs.shift();		//removes top element
				/*
				canonballs.reverse();
				canonballs.pop();
				canonballs.reverse();
*/
				//break;
			}
			else {
				canonballs[j].updatePosition(windVelocity, dt);
			}
		}

	    //checkForCollisions();
		this.checkForCollisions();
		this.checkForCanonballCollisions();
		environmentTimer -= dt;
		
		// Should Controller contain a gameloop which calls this??
	}

	//Function for firing the cannon
	this.fire = function (playerNr) {
		if (players[playerNr].isFireReady()) {

		    this.getFireAudio().play(); // FIRE!!!

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

    //function checkForCollisions() {
    // Can't use this.getBoatHitAudio if the function is declared as above
	this.checkForCollisions = function() {
		//Loop through the canonballs
		var hitIndex = [];
		for (var i = 0; i < canonballs.length; i++) {
			for (var j = 0; j < players.length; j++) {
				if (canonballs[i].getPlayer() != j) {		//We dont want to be able to shoot ourselves
					var playerPosition = players[j].getPosition().clone();
					var vectorToPlayer = playerPosition.subtract(canonballs[i].getPosition());
					var distance = vectorToPlayer.length();
					if (distance < players[j].getCollisionRadius()) {		//Then there is a collision
					  this.getBoatHitAudio().play(); // Boat hit audio
						players[j].takeDamage();
						hitIndex.push(i);
					}
				}
			}
		}
		hitIndex.sort();
		for (var i = hitIndex.length - 1; i >= 0; i--) {
			canonballs.splice(hitIndex[i], 1);
		}
	}
	this.checkForCanonballCollisions = function () {
		var hitIndex = [];		//Which canonballs collided
		for (var i = 0; i < canonballs.length; i++) {
			for (var j = i + 1; j < canonballs.length; j++) {			//Just want to check the remaining canonballs
				var distance = canonballs[i].getPosition().clone().subtract(canonballs[j].getPosition()).length();	//Distance from canonball i to canonball j
				if (distance < canonballs[i].getCollisionRadius() * 2 && canonballs[i].getPlayer() !== canonballs[j].getPlayer()) {
					hitIndex.push(i);
					hitIndex.push(j);
				}
			}
		}
		hitIndex.sort();
		for (var i = hitIndex.length - 1; i >= 0; i--) {		//Start from the end so the order doesn't fuck up
			canonballs.splice(hitIndex[i], 1);
		}
	}

	this.getEnvironment = function () { return environment; };
	this.getCanonballImage = function () { return canonballImage; };
	this.getArrowImage = function () { return arrowImage; };


	return this;
}
