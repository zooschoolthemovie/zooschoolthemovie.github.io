window.Endless = window.Endless || {};
var mainMenu = new Event('mainMenu');
var play = new Event('play');
var rogue = new Event("rogue");

var bird, terrainGroup;
var birdGravity = 700;
var birdSpeed = -250;
var birdFlapPower = 300;
var score = 0;
var scoreText;
var topScore;
var lastTile;
var tileSize = 64

var incr = 0;

Endless.run = function(game){
  this.game = game;
  this.tileSize = tileSize;
}
Endless.run.prototype = {

  create: function(){
    scoreText = this.game.add.text(10,10,"-",{
      font:"bold 16px Arial"
    });
    topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
    score = 0;
    this.probCliff = 0.2;
    //this.probVertical = 0.4;
    //this.probMoreVertical = 0.5;

    this.floors = this.game.add.group();
    this.floors.enableBody = true;
    this.game.world.resize(this.game.world.width, window.innerHeight)

    for(var i=0; i<12; i++) {
      newItem = this.floors.create(i * this.tileSize, this.game.world.height - this.tileSize, 'pipe');
      newItem.body.immovable = true;
      newItem.body.velocity.x = birdSpeed;
    }
    this.lastFloor = newItem;

    this.lastCliff = false;
    this.lastVertical = false;

    this.game.stage.backgroundColor = "#87CEEB";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    bird = this.game.add.sprite(150, this.game.world.height-65,"dude");
    bird.anchor.set(0.5, 1)
    this.game.physics.arcade.enable(bird);
    bird.body.gravity.y = birdGravity;
    //this.game.input.onDown.add(this.flap, this);
    key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key3.onDown.add(this.flap, this);
    //this.game.camera.follow(bird);
    this.player = bird;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.animations.add('normal', [8], 10, true);
    this.player.animations.play('normal');

  },

  update: function(){
    this.game.physics.arcade.collide(bird, this.floors, null, null, this);

    if(bird.body.touching.down) {
      bird.body.velocity.x = -birdSpeed;
      this.player.animations.play('right');
    }
    else {
      bird.body.velocity.x = 0;
      this.player.animations.play('normal');
    }

    if(bird.x <= -tileSize) {
      this.die()
    }
    if(bird.y >= this.game.world.height || bird.x <= 0) {
      this.die()
    }
      score += 1
      updateScore()
      this.generateTerrain();
      if(Math.floor(score/500) > incr){
        birdSpeed -= 50;
        incr = Math.floor(score/500)
      }
  },

  generateTerrain: function(){
    //delta = distance between tiles
    var i, delta = 0;
    for(i = 0; i < this.floors.length; i++) {
      if(this.floors.getAt(i).body.x <= -this.tileSize) {

        if(Math.random() < this.probCliff && !this.lastCliff && !this.lastVertical) {
          delta = this.game.rnd.between(10,20)/10;
          this.lastCliff = true;
          this.lastVertical = false;
        }
        else {
          this.lastCliff = false;
          this.lastVertical = false;
        }

        this.floors.getAt(i).body.x = this.lastFloor.body.x + this.tileSize + delta * this.tileSize * 1.5;
        this.floors.getAt(i).body.velocity.x = birdSpeed;
        this.lastFloor = this.floors.getAt(i);
        break;
      }
    }
  },

  die: function(){
		localStorage.setItem("topFlappyScore",Math.max(score,topScore));
    score = 0;
    birdSpeed = -250

		document.dispatchEvent(rogue)
  },

  flap: function(){
    if(bird.body.touching.down)
			bird.body.velocity.y = -birdFlapPower;
  }
}

	function updateScore(){
		scoreText.text = "Score: "+score+"m\nBest: "+topScore+"m";
	}
