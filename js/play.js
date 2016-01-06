window.Endless = window.Endless || {};
var mainMenu = new Event('mainMenu');
var play = new Event('play');

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

Endless.run = function(game){
  this.game = game;
  this.tileSize = TILESIZE;
}

Endless.run.prototype = {

  create: function(){
    this.game.time.advancedTiming = true;

    this.game.world.resize(Endless.width, Endless.height)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.level = new Endless.Back(this.game, {tileSize: TILESIZE, speed: SPEED})
    this.level.create();
    this.player = new Endless.Player(this, {startx: START.X, starty: START.Y, speed: SPEED, gravity: GRAVITY, jump: JUMP})
    this.score = new Endless.score(this.game);
    this.bones = new Endless.Bones(this.game);
    /*this.fps = this.game.add.text(10,50, this.game.time.fps,{
      font:"bold 16px Arial", fill: "#000"
    })*/
    this.game.input.onDown.add(this.player.jump, this);
    //var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //space.onDown.add(this.jump, this);
  },

  start: function(){
    this.game.state.start("play");
  },

  update: function(){
    /* set collisions */
    this.game.physics.arcade.collide(this.player.self, this.level.floor.group, null, null, this);
    this.game.physics.arcade.collide(this.level.enemies, this.level.floor.group, null, null, this);
    this.game.physics.arcade.collide(this.level.enemies, this.player.self, this.die, null, this);
    this.game.physics.arcade.collide(this.level.obstacles.desk.group, this.player.self, null, null, this);
    this.game.physics.arcade.overlap(this.player.self, this.level.obstacles.bone.group, this.collect, null, this);
    this.game.physics.arcade.collide(this.level.obstacles.sabot.group, this.player.self, this.die, null, this);

    this.player.update();
    this.score.incr();
    this.level.update();
    //this.fps.text = this.time.fps;
    if(!this.player.alive){
      this.die()
    }
    Endless.currentSpeed += 0.05
  },

  collect: function(player, bone){
    bone.position.x = -70;
    this.bones.incr();
  },

  die: function(){
    this.score.register();
    this.game.state.start("gameover")
  }
}
