var bannerController = function (view, model) {

    var playMusic = false;
    var currentView = 'startView';

    var visible = true;

    model.getSounds().getBgAudio().loop = true;
    //variable to know if we should start playing music automatically after startView;
    var first = true;

    var self = this; //to allow onclick call class functions

    this.toggleVisibility = function(){
        if( visible ){
            visible = false;
            view.bannerHtml.hide();
        }else{
            visible = true;
            view.bannerHtml.show();
        }
    }

    this.toggleMusic = function(){
        if(playMusic) {
            model.getSounds().getBgAudio().pause();
            model.getSounds().getBattleAudio().pause();
            playMusic = false;
            view.muteMusicBtn[0].innerHTML = "Music OFF";
            first = false;
        }
        else {
            if(currentView == 'playView') {model.getSounds().getBgAudio().play(); }
            else{ model.getSounds().getBattleAudio().play(); };
            playMusic = true;
            view.muteMusicBtn[0].innerHTML = "Music ON";
            first = false;
        }
    };

    this.toggleFx = function(){
        if (model.playFx) {
            model.playFx = false;
            view.muteFxBtn[0].innerHTML = "Fx OFF";
        }
        else {
            model.playFx = true;
            view.muteFxBtn[0].innerHTML = "Fx ON";
        }
    };

    view.muteMusicBtn[0].onclick = function(){
        self.toggleMusic();
    };

    view.muteFxBtn[0].onclick = function() {
        self.toggleFx();
    };

    this.setCurrentView = function( view ){
        currentView = view;
    };

    this.getFirst = function(){
        return first;
    };

    this.getPlayMusic = function(){
        return playMusic;
    }
    return this;
}