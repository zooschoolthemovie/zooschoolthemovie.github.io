window.Endless = window.Endless || {};



var terrainGroup;
var birdGravity = 700;
var birdSpeed = -250;
var birdFlapPower = 300;
var lastTile;
var tileSize = 64

var TILESIZE = 64;
var SPEED = Endless.speed;
var GRAVITY = 1000;
var JUMP = 550;
var START = {X: 150, Y: Endless.height-TILESIZE-1}

START.Y = Endless.height/2;

var incr = 0;

Endless.mainMenu = function(game){
  this.game = game;
  this.tileSize = TILESIZE;
  return this;
}

Endless.mainMenu.prototype = {

  create: function () {
    //var gameTitle = this.game.add.sprite(Endless.width/2, 160, 'gametitle');
    //gameTitle.anchor.setTo(0.5,0.5);
    

    //this.game.input.onDown.add(goFull, this);
    Endless.initConfig();
    this.game.time.advancedTiming = true;

    this.game.world.resize(Endless.width, Endless.height)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.level = new Endless.Back(this.game, {tileSize: TILESIZE, speed: SPEED})
    this.level.create();
    //this.player = new Endless.Player(this, {startx: START.X, starty: START.Y, speed: SPEED, gravity: GRAVITY, jump: JUMP})
    this.score = new Endless.score(this.game);
    this.bones = new Endless.Bones(this.game);
    
    play = this.game.add.button(Endless.width/2,Endless.height/2, "start", this.playTheGame, this)
    play.anchor.setTo(0.5,0.5);
    play.scale.setTo(0.7,0.7);
    this.bones.update();
    this.score.init();
  },

  playTheGame: function() {
    Endless.fullscreen.className = "hidden";
    this.game.state.start("play")
  },

  update: function(){
    /* set collisions */
    this.game.physics.arcade.collide(this.level.enemies, this.level.floor.group, null, null, this);

    this.level.update();
    Endless.currentSpeed += 0.01
  }
}

