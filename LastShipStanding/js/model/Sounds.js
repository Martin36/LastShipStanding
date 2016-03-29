 var Sounds = function () {

    var fireAudio, deathAudio, bgMusicAudio, battleAudio, boatHit;
    var fadeInActive = false;
    var fadeOutActive = false;
    this.playFx = true;

    bgMusicAudio = new Audio('sounds/menuMusic.mp3');
    battleAudio = new Audio('sounds/battleMusic.mp3');

    this.getFireAudio = function () {
        fireAudio = [new Audio('sounds/cannonFire1.mp3'),
	                 new Audio('sounds/cannonFire2.mp3')];
        var r = Math.floor((Math.random() * fireAudio.length));
        return fireAudio[r];
    }
    
    this.getDeathAudio = function () {
        var s = new Audio('sounds/shipDeath.mp3');
        s.volume = 0.5;
        return s;
    }

    this.fadeIn = function (sound) {
        if (!fadeInActive) {
            fadeInActive = true;
            var vol = 0.00;
            var ID = setInterval(
			function () {
			    if (vol < 1) {
			        sound.volume = vol;
			        vol += 0.05;
			    }
			    else {
			        clearInterval(ID);
			        fadeInActive = false;
			    }
			}, 200);
        }
    }

    this.fadeOut = function (sound) {
        if (!fadeOutActive) {
            fadeOutActive = true;
            var vol = 1;
            var ID = setInterval(
			function () {
			    if (vol > 0) {
			        sound.volume = vol;
			        vol -= 0.05;
			    }
			    else {
			        clearInterval(ID);
			        fadeOutActive = false;
			        sound.pause();
			    }
			}, 200);
        }
    }

    this.getBGAudio = function () { return bgMusicAudio; };
    this.getBattleAudio = function () { return battleAudio; };
    this.getBoatHitAudio = function () { return new Audio('sounds/boatHit1.mp3'); };

    return this;
}