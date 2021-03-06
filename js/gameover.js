window.Endless = window.Endless || {};

Endless.gameover = function(game){
  this.game = game;
}

Endless.gameover.prototype = {
  create: function(){
    Endless.fullscreen.className = "";
    var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    var text = this.game.add.text(Endless.width/2, 70, "Non sei scampato alla furia di Sabot!\nHai percorso "+ Endless.CommonScore+"m", style);
    var twitter = this.game.add.button(245, 110, "twitter", tweet, this);
    twitter.width = 50;
    twitter.scale.setTo(0.6, 0.6);
    var fac = this.game.add.button(75, 110, "facebook", facebook, this);
    fac.width = 50;
    fac.scale.setTo(0.6, 0.6);
    text.anchor.setTo(0.5,0.5);
    var play = this.game.add.button(Endless.width/2, 220, "start", this.play, this)
    play.scale.setTo(0.5,0.5)
    play.anchor.setTo(0.5,0.5);
  },
  start: function(){
    this.game.state.start("gameover")
  },
  play: function(){
    Endless.fullscreen.className = "hidden";
    this.game.state.start("play")
  }
}

tweet = function(){
      var tweetbegin = 'http://twitter.com/home?status=';
      var tweettxt = 'Sono scappato per '+Endless.CommonScore+'m a Sabot su ' + window.location.origin + ' @ZooSchoolMovie';
      var finaltweet = tweetbegin +encodeURIComponent(tweettxt);
      window.open(finaltweet,'_blank');
  }

function facebook(){
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      sendScore()
    }
    else {
      FB.login(sendScore)
    }
  });
}

function sendScore(){
  FB.ui({ 
    method: 'feed',
    link: 'http://zooschoolthemovie.github.io',
    picture: 'http://zooschoolthemovie.github.io/assets/fb.png',
    name: 'Sono fuggito per '+ Endless.CommonScore + 'metri',
    description: 'Sono fuggito per '+ Endless.CommonScore + 'metri. Riuscirai a scappare dalla furia di Sabot?',
    actions: [
        { name: 'Zooschool - The Game', link: 'http://zooschoolthemovie.github.io/' }
    ],
    display: 'popup'
  });  
}