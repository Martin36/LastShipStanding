var defaultKeyBindings = function () {
	
	this.getDefault = function(playerNr){
		switch (playerNr){
			case 1:
				var keyBindings = defaultPlayer1();
				break;
			case 2:
				var keyBindings = defaultPlayer2();
				break;
			case 3:
				var keyBindings = defaultPlayer3();
				break;
			case 4:
				var keyBindings = defaultPlayer4();
				break;
		}
		return keyBindings;
	}

	this.defaultPlayer1 = function() {
		var listOfKeys = {'65', '87', '68'};			//a, w, d
		return listOfKeys;
	};
	this.defaultPlayer2 = function() {
		var listOfKeys = {'70', '84', '72'};			//f, t, h
		return listOfKeys;
	};
	this.defaultPlayer3 = function() {
		var listOfKeys = {'74', '73', '76'};			//j, i, l
		return listOfKeys;
	};
	this.defaultPlayer4 = function() {
		var listOfKeys = {'37', '38', '39'};			//left, up and right arrow
		return listOfKeys;
	};

	return this;
}