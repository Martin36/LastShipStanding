var Model = function(){
	
    var players = [];

    this.addPlayer = function(){
        //TODO: Fill list with the nr of players specified
        players.push = new Player();
    };
	
    this.removePlayer = function () {
        // Don't remove player if the list is empty
        if (players.length > 0)
            players.pop();
        else
            alert("The list of players is empty!");
    };

    // Vector algebra by using the Victor package
    this.update = function (dt) {
        // TODO: get wind direction and strength from environment.
        // calculate new position of all players.
        // Update things....
        // Should Controller contain a gameloop which calls this??
    }

    

}
