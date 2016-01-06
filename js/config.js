window.Endless = window.Endless || {}

Endless = {
  width:480,
  height: 320,
  tilesize:{
    floor:480,
    wall:479
  },
  speed:-250,
  DEBUG: false,
  currentSpeed: 250
}

Endless.Ybottom = Endless.height - 32;

Endless.tiles = {
  floor:{
    y: Endless.Ybottom,
    w: 479
  },
  wall: {
    y: 0,
    w: 479
  },
  desk: {
    y: Endless.Ybottom,
    w: 64
  }
};

Endless.initConfig = function(){
    Endless.speed = -250;
    Endless.currentSpeed = 250;
  }