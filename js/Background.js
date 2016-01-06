window.Endless = window.Endless || {};


    /* probability of a hole */
    //this.probCliff = 0.2;
    //this.probVertical = 0.4;
    //this.probMoreVertical = 0.5;


Endless.Back = function(game, init){
  this.game = game;
  this.speed = init.speed;
  //this.createEnemy()

  //this.createDesks()
}

Endless.Back.prototype = {
  create: function(){
    this.wall = new Wall(this.game, {speed: this.speed});
    this.wall.create();
    this.floor = new Floor(this.game, {speed: this.speed});
    this.floor.create();
    this.obstacles = new Obstacles(this.game)
    this.obstacles.create()
  },
  update: function(){
    this.wall.update();
    this.floor.update();
    this.obstacles.update();
  }
}


function Wall(game, init){
  this.game = game;
  this.speed = init.speed;
  this.size = Endless.tiles.wall;
}

Wall.prototype = {
  create: function(){
    this.group = this.game.add.group();
    this.group.enableBody = true;
    var tileOrder = ["corridoio2","base","base","corridoio","corridoio","base","base"]

    for(var i=0; i< tileOrder.length; i++) {
      var newItem = this.group.create((this.size.w * i), this.size.y, "wall", tileOrder[i]);
      newItem.body.immovable = true;
      newItem.body.velocity.x = this.speed;
    }
    this.last = newItem;
  },
  update: function(){
    for(i = 0; i < this.group.length; i++) {
      if(this.group.getAt(i).body.x <= -this.size.w) {
        this.group.getAt(i).body.x = this.last.body.x + this.size.w;
        this.group.getAt(i).body.velocity.x = this.speed;
        this.last = this.group.getAt(i);
        break;
      }
    }
  }
}

function Floor(game, init){
  this.game = game;
  this.speed = init.speed;
  this.size = Endless.tiles.floor;
}

Floor.prototype = {
  create: function(){
    this.group = this.game.add.group();
    this.group.enableBody = true;
    for(var i=0; i< 3; i++) {
      var newItem = this.group.create((this.size.w * i), this.size.y, "floor");
      newItem.body.immovable = true;
      newItem.body.velocity.x = this.speed;
    }
    this.last = newItem;
  },
  update: function(){
    for(i = 0; i < this.group.length; i++) {
      if(this.group.getAt(i).body.x <= -this.size.w) {
        this.group.getAt(i).body.x = this.last.body.x + this.size.w;
        this.last = this.group.getAt(i);
      }
      this.group.getAt(i).body.velocity.x = - Endless.currentSpeed;
    }
  }
}

function Schema(){
  this.schemas = [
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'desk'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 100, type: 'desk'},
      {x: 0, type: 'desk'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'desk'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'desk'},
      {x: 200, type: 'desk'},
      {x: 180, type: 'desk'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 130, type: 'desk'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'sabot'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 130, type: 'desk'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'sabot'},
      {x: 200, type: 'desk'},
      {x: 180, type: 'sabot'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 130, type: 'sabot'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'desk'},
      {x: 20, type: 'sabot'},
      {x: 10, type: 'desk'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 130, type: 'sabot'}
    ],
    [
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'desk'},
      {x: 30, type: 'desk'},
      {x: 180, type: 'sabot'},
      {x: 30, type: 'bone'},
      {x: 30, type: 'bone'},
      {x: 130, type: 'desk'}
    ]
  ]
}

Schema.prototype = {
  start: function(){
    actual = this.randomSelectBlock();
    position = 0;
  },
  run: function(){
    var ret = this.schemas[actual][position];
    if(position < this.schemas[actual].length){
      position++;
    }else{
      this.start();
      return {x: 480, type: 'skip'};
    }
    return ret;
  },
  randomSelectBlock: function(){
    return Math.floor(Math.random() * this.schemas.length)
  }
}

function Obstacles(game){
  this.game = game;
}

  previous = 0;

Obstacles.prototype = {
  create: function(){
    this.schema = new Schema();
    this.schema.start();

    this.desk = new DeskGroup(this.game);
    this.desk.create();

    this.sabot = new SabotGroup(this.game)
    this.sabot.create();

    this.bone = new BoneGroup(this.game)
    this.bone.create();

    this.obstaclesList = ["desk", "sabot", "bone"]
  },

  update: function(){
    this.killInactive();
    this.next = this.next || this.schema.run();
    /*if(previous != this.next){
      console.log(this.next)
    }*/
    previous = this.next;

    if(this.next.type === 'skip'){
      this.next.type = 'bone';
    }

    elem = this[this.next.type].getFirstAvailable();

    if(elem){
      if(this.last){
        if(this.last.x < 900){
          elem.x = this.last.x + this.last.width + this.next.x;
          this.last = elem;
          this.next = undefined;
        }
      }else{
        elem.x = Endless.width;
        this.last = elem;
        this.next = null;
      }
      elem.body.velocity.x =  - Endless.currentSpeed;
      elem.revive();
    }
  },

  killInactive: function(){
    var self = this;
    [].forEach.call(this.obstaclesList, function(obsType){
      self[obsType].killUnderZero();
    })
  }
}

function DeskGroup(game){
    this.game = game;
}

DeskGroup.prototype = {
  create: function(){
    this.group = this.game.add.group();
    this.group.enableBody = true;

    for(var i=0; i<8; i++) {
      var desk = new Desk(this.game, "desk")
      this.group.add(desk);
      desk.body.velocity.x = Endless.speed;
      desk.body.immovable = true;
    }
  },

  killUnderZero: function(){
    for(i=0;i<this.group.length; i++){
      this.group.getAt(i).body.velocity.x = - Endless.currentSpeed;
      if(this.group.getAt(i).x < -64){
        this.group.getAt(i).kill();
      }
    }
  },
  getFirstAvailable: function(){
    return this.group.getFirstDead();
  }
}

function Desk (game, sprite){
  var elem = game.add.sprite(-70, Endless.height-82,sprite)
  return elem;
}

function SabotGroup(game){
    this.game = game;
}

SabotGroup.prototype = {
  create: function(){
    this.group = this.game.add.group();
    this.group.enableBody = true;

    for(var i=0; i<3; i++) {
      var sabot = this.game.add.sprite(-70, Endless.Ybottom -70, "sabot")
      this.group.add(sabot);
      sabot.body.velocity.x = - Endless.currentSpeed;
      sabot.body.immovable = true;
      sabot.animations.add('run', Phaser.Animation.generateFrameNames('sabot', 1, 3, '', 0), 10, true)
      sabot.animations.play('run');
    }
  },

  killUnderZero: function(){
    for(i=0;i<this.group.length; i++){
      this.group.getAt(i).body.velocity.x = - Endless.currentSpeed;
      if(this.group.getAt(i).x < -64){
        this.group.getAt(i).kill();
      }
    }
  },
  getFirstAvailable: function(){
    return this.group.getFirstDead();
  }
}

function BoneGroup(game){
    this.game = game;
}

BoneGroup.prototype = {
  create: function(){
    this.group = this.game.add.group();
    this.group.enableBody = true;

    for(var i=0; i<15; i++) {
      var bone = this.game.add.sprite(-70, Endless.Ybottom -30, "bone")
      this.group.add(bone);
      bone.body.velocity.x = - Endless.currentSpeed;
      bone.body.immovable = true;
    }
  },

  killUnderZero: function(){
    for(i=0;i<this.group.length; i++){
      this.group.getAt(i).body.velocity.x = - Endless.currentSpeed;
      if(this.group.getAt(i).x < -64){
        this.group.getAt(i).kill();
      }
    }
  },
  getFirstAvailable: function(){
    return this.group.getFirstDead();
  }
}
