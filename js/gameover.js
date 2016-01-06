window.Endless = window.Endless || {};

Endless.gameover = function(game){
  this.game = game;
}

Endless.gameover.prototype = {
  create: function(){
    var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    var text = this.game.add.text(Endless.width/2, 70, "Non sei scampato alla furia di Sabot!\nHai percorso "+ Endless.CommonScore+"m", style);
    var twitter = this.game.add.button(Endless.width/2, 110, "twitter", tweet, this);
    twitter.width = 50;
    twitter.scale.setTo(0.6, 0.6);
    text.anchor.setTo(0.5,0.5);
    var play = this.game.add.button(Endless.width/2, 220, "start", this.play, this)
    play.scale.setTo(0.5,0.5)
    play.anchor.setTo(0.5,0.5);
  },
  start: function(){
    this.game.state.start("gameover")
  },
  play: function(){
    this.game.state.start("play")
  }
}

tweet = function(){
      var tweetbegin = 'http://twitter.com/home?status=';
      var tweettxt = 'I scored '+Endless.CommonScore+' at ' + window.location.href + '.';
      var finaltweet = tweetbegin +encodeURIComponent(tweettxt);
      window.open(finaltweet,'_blank');
  }
