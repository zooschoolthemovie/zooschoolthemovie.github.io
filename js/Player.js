window.Endless = window.Endless || {};

Endless.Player = function(origin, init){
  this.speed = init.speed;
  this.jumpPower = init.jump;
  this.game = origin.game;
  this.alive = true;
  //this.tileSize = init.tileSize;
  this.self = this.game.add.sprite(init.startx, init.starty, "besnik");
  this.self.anchor.set(0.5, 1)
  this.game.physics.arcade.enable(this.self);
  this.self.body.gravity.y = init.gravity;
  //this.self.body.acceleration.x = Endless.acceleration;

  this.self.animations.add('right', Phaser.Animation.generateFrameNames('besnik', 1, 4), 12, true);
  this.self.animations.add('jump', Phaser.Animation.generateFrameNames('besnik', 3, 3), 10, true);
  this.self.animations.play('right');
}

Endless.Player.prototype = {
  jump: function(){
      if(this.player.self.body.touching.down){
        this.player.self.animations.play("jump")
  			this.player.self.body.velocity.y = -this.player.jumpPower;
    }
  },
  update: function(){
    /* enable jump while touching the floor */
    if(this.self.body.touching.down) {
      this.self.body.velocity.x = Endless.currentSpeed;
      this.self.animations.play('right');
    }
    else {
      this.self.body.velocity.x = 0;
    }

    /* check if it is still alive */
    if(this.self.x <= -this.tileSize) {
      this.die()
    }
    if(this.self.y >= this.game.world.height || this.self.x <= 0) {
      this.die()
    }
  },
  die: function(){
    this.alive = false;
  }
}
