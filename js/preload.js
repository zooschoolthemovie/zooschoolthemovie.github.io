window.Endless = window.Endless || {};

Endless.preload = function(game){
  this.game = game;
}
Endless.preload.prototype = {

  preload: function(){
    this.game.load.atlas('besnik', 'assets/besnik_atlas.png', 'assets/besnik.json');
    this.game.load.atlas('sabot', 'assets/sabot_atlas.png', 'assets/sabot.json');
    this.game.load.atlas('wall', 'assets/wallAT.png', 'assets/wall.json');
    this.game.load.image("bone", "assets/bone.png");
    this.game.load.image("floor", "assets/floor.png");
    this.game.load.image("gametitle", "assets/bg.png")
    this.game.load.image("background", "assets/bg.png")
    this.game.load.image("start", "assets/play.png")
    this.game.load.image("twitter", "assets/share-twitter.png")
    this.game.load.image("facebook", "assets/share-facebook.png") 
    this.game.load.image("desk", "assets/desk.png")
  },

  create: function(){
    this.game.state.start("mainMenu")
  }

}

function fullScreen(game){
  game.scale.startFullScreen(false);
}

function centerView(game){
  game.scale.scaleMode = Phaser.ScaleManager.ASPECT_RATIO;
  game.scale.maxWidth = Endless.width;
  game.scale.maxHeight = Endless.height;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.setScreenSize( true );
}
