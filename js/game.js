window.onload = function(){
	var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);

	var bird, pipeGroup;
	var birdGravity = 600;
	var birdSpeed = 200;
	var birdFlapPower = 300;
	var score = 0;
	var scoreText;
  var topScore;
	var lastTile;

	var play = function(game){}
	play.prototype = {
		create: function(){
			scoreText = game.add.text(10,10,"-",{
				font:"bold 16px Arial"
			});
			topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
			score = 0;
			pipeGroup = game.add.group();
			game.stage.backgroundColor = "#87CEEB";
			game.physics.startSystem(Phaser.Physics.ARCADE);
			bird = game.add.sprite(100, 260,"bird");
			bird.anchor.set(0.5)
			game.physics.arcade.enable(bird);
			bird.body.gravity.y = birdGravity;
			game.input.onDown.add(flap, this);
			game.time.events.loop(0, addTerrain);
			addTerrain();
		},

		update: function(){
			game.physics.arcade.collide(bird, pipeGroup);
			bird.body.velocity.x = 0;
			if(bird.body.touching.down){
				bird.body.velocity.x = birdSpeed;
			}
			if(bird.y>game.height || bird.x < 0){
				die();
			}
		}
	}

	function updateScore(){
		scoreText.text = "Score: "+score+"m\nBest: "+topScore+"m";
	}

	function die(){
		lastTile = {x:0, y:20}
		localStorage.setItem("topFlappyScore",Math.max(score,topScore));
		game.state.start("play");
	}

	function flap(){
		if(bird.body.touching.down)
			bird.body.velocity.y = -birdFlapPower;
	}

	function addTerrain(){
		if(lastTile){
			lastTile.y = game.rnd.between(-30,60);
			lastTile.x += 40;
		}else{
			lastTile = {x:0, y:20}
		}
		var tile = new Terrain(game, lastTile.x, 480-lastTile.y, -birdSpeed)
		game.add.existing(tile);
		pipeGroup.add(tile)
	}

	Terrain = function(game, x, y, speed){
		Phaser.Sprite.call(this, game, x, y, "pipe");
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.immovable = true;
		this.body.velocity.x = speed;
	}

	Terrain.prototype = Object.create(Phaser.Sprite.prototype);
	Terrain.prototype.constructor = Terrain;
	Terrain.prototype.update = function() {
		if(this.x+this.width<bird.x){
			score+=1;
			updateScore();
		}
		if(this.x <-this.width) {
			this.destroy();
		}
	};

	var main = function(game){}


	game.state.add("play", play)
	game.state.add("main", main)
	game.state.add("boot", preload)
	game.state.start("boot")
}
