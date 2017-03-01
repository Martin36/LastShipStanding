var INTERVAL = 50;

function Game(socket) {
    this.socket = socket;

    var g = this;
    // setInterval(function() {
        g.mainLoop();
    // }, INTERVAL);
}

Game.prototype = {

    mainLoop: function() {
      console.log('mainLoop');
        this.sendData();
    },

    sendData: function() {
        //Send local data to server
        var gameData = {};
        console.log('sendData');
        // //Send tank data
        // var t = {
        //     id: this.localTank.id,
        //     x: this.localTank.x,
        //     y: this.localTank.y,
        //     baseAngle: this.localTank.baseAngle,
        //     cannonAngle: this.localTank.cannonAngle
        // };
        // gameData.tank = t;

        //Client game does not send any info about projectiles,
        //the server controls that part
        this.socket.emit('sync', gameData);
    },

    receiveData: function(serverData) {
        var game = this;
        console.log('recieveData', serverData);
        // serverData.tanks.forEach(function(serverTank) {
        //
        //     // //Update local tank stats
        //     // if (game.localTank !== undefined && serverTank.id == game.localTank.id) {
        //     //     game.localTank.hp = serverTank.hp;
        //     //     if (game.localTank.hp <= 0) {
        //     //         game.killTank(game.localTank);
        //     //     }
        //     // }
        //     //
        //     // //Update foreign tanks
        //     // var found = false;
        //     // game.tanks.forEach(function(clientTank) {
        //     //     //update foreign tanks
        //     //     if (clientTank.id == serverTank.id) {
        //     //         clientTank.x = serverTank.x;
        //     //         clientTank.y = serverTank.y;
        //     //         clientTank.baseAngle = serverTank.baseAngle;
        //     //         clientTank.cannonAngle = serverTank.cannonAngle;
        //     //         clientTank.hp = serverTank.hp;
        //     //         if (clientTank.hp <= 0) {
        //     //             game.killTank(clientTank);
        //     //         }
        //     //         clientTank.refresh();
        //     //         found = true;
        //     //     }
        //     // });
        //
        //     // if (!found &&
        //     //     (game.localTank == undefined || serverTank.id != game.localTank.id)) {
        //     //     //I need to create it
        //     //     game.addTank(serverTank.id, serverTank.type, false, serverTank.x, serverTank.y, serverTank.hp);
        //     // }
        //
        // });

    }
}
