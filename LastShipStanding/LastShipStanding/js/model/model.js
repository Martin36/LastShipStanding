var model = function () {

	var players = [];
	var canonballs = [];
	var observers = [];
	var environment = new Environment();
	var sound = new Sounds();
	var img = new Images();
	var defaultKeyBinding = new DefaultKeyBindings();
	var randomizePos = false;
	var canonballSpeed = 10;
	var folder = ""; 		//Path to the folder where the source images is contained
	var defaultKeyBinding = new defaultKeyBindings();
	var fireAudio, deathAudio, bgMusicAudio, battleAudio, boatHit;
	var shipSkins = ["images/ships/ship_blue.png","images/ships/ship_green.png","images/ships/ship_orange.png",
					"images/ships/ship_pattern1.png","images/ships/ship_pattern2.png","images/ships/ship_pattern3.png",
					"images/ships/ship_pattern4.png","images/ships/ship_pattern5.png","images/ships/ship_pattern6.png",
					"images/ships/ship_pattern7.png","images/ships/ship_pattern8.png","images/ships/ship_pattern9.png",
					"images/ships/ship_pattern10.png","images/ships/ship_pattern11.png","images/ships/ship_pattern12.png",
					"images/ships/ship_purple.png","images/ships/ship_red.png","images/ships/ship_teal.png",
					"images/ships/ship_yellow.png"];
	
	var fadeInActive = false;
	var fadeOutActive = false;

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
	
	//Adds new observer.
	this.addObserver = function(obs){
		observers.push(obs);
		console.log("Added an observer");
	}
	//Notifies observer with info. Used to update score for now.
	this.notifyObservers = function(info){
		console.log("Sending information to observers");
		for(i in observers){
			observers[i].newInfo();
		}
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
		return player;
	};

	this.removePlayer = function () {
		// Don't remove player if the list is empty
		if (players.length > 0)
			players.pop();
		else
			alert("The list of players is empty!");
	};
	
	this.removeAllPlayers = function(){
		while(players.length > 0){
			players.pop();
		}
	}

	this.getPlayer = function (index) {
		if (index < 0 || index > players.length) {	//Safety check
			throw "Index Out Of Bounds!";
		}
		return players[index];
	}


    // Vector algebra by using the Victor package
	this.update = function (dt) {
	    
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
		environment.update(dt);
	}

	//Function for firing the cannon
	this.fire = function (playerNr) {
		if (players[playerNr].isFireReady()) {

		    if(this.playFx){ sound.getFireAudio().play(); }

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
			var velocity1 = new Victor(playerDirection.y * canonball1.getSpeed(), -playerDirection.x * canonball1.getSpeed());
			var velocity2 = new Victor(-playerDirection.y * canonball2.getSpeed(), playerDirection.x * canonball2.getSpeed());
			canonball1.setVelocity(velocity1);
			canonball2.setVelocity(velocity2);
			canonballs.push(canonball1);
			canonballs.push(canonball2);
			players[playerNr].fired();

		}
	};

    // Check if someone gets hit by a canonball
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
					  	if(this.playFx) { sound.getBoatHitAudio().play(); } // Boat hit audio
						players[j].takeDamage();
						hitIndex.push(i);
						players[canonballs[i].getPlayer()].giveScore();
					}
				}
			}
		}
		hitIndex.sort();
		for (var i = hitIndex.length - 1; i >= 0; i--) {
			canonballs.splice(hitIndex[i], 1);
		}
	}

    // If canonballs collide midair, they disappear
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
	this.getShips = function () {return shipSkins; };
	this.getImages = function () { return img; };
	this.getPlayers = function () { return players; };
	this.getCanonballs = function () { return canonballs; };
	this.getSounds = function () { return sound; };

	return this;
}
