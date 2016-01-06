window.Endless = window.Endless || {};

Endless.mainMenu = function(game){
  this.game = game;
  return this;
};

Endless.mainMenu.prototype = {

  create: function () {
    //var gameTitle = this.game.add.sprite(Endless.width/2, 160, 'gametitle');
    //gameTitle.anchor.setTo(0.5,0.5);
    this.game.scale.scaleMode = Phaser.ScaleManager.ASPECT_RATIO;
    this.game.scale.startFullScreen(false)
    play = this.game.add.button(Endless.width/2,Endless.height/2, "start", this.playTheGame, this)
    play.anchor.setTo(0.5,0.5);
    play.scale.setTo(0.7,0.7);

    this.game.input.onDown.add(goFull, this);
  },

  playTheGame: function() {
    this.game.state.start("play")
  }
}

function goFull(menu){
  var game = menu.game;
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  game.scale.startFullScreen(false);
}
