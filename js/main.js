window.Endless = window.Endless || {};

window.onload = function(){
  var game = new Phaser.Game(Endless.width, Endless.height, Phaser.CANVAS, document.body, null, true);

  game.state.add("boot", Endless.preload)
  game.state.add("mainMenu", Endless.mainMenu)
  game.state.add("play", Endless.run)
  game.state.add("gameover", Endless.gameover)
  game.state.start("boot")

  document.addEventListener('mainMenu', function(){
    game.state.start("mainMenu")
  })
  document.addEventListener('play', function(){
    game.state.start("play")
  })
}
