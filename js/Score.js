window.Endless = window.Endless || {};

Endless.score = function(game){
  this.val = 0;
  this.best = localStorage.getItem("topScore")==null?0:localStorage.getItem("topScore");
  this.text = game.add.text(10,10,"-",{
    font:"bold 16px Arial", fill: "#000"
  });
}

Endless.score.prototype = {
  incr: function(){
    this.val += 1;
    this.update();
  },
  update: function(){
    this.text.text = "Distanza: "+this.val+"m\nMigliore: "+this.best+"m";
    Endless.CommonScore = this.val;
  },
  register: function(){
    localStorage.setItem("topScore",Math.max(this.val, this.best));
  },
  init: function(){
    this.text.text = "Distanza: --\nMigliore: "+this.best+"m";
  }
}
