window.Endless = window.Endless || {};

Endless.Bones = function(game){
  this.val = localStorage.getItem("bones")==null ? 0 : parseInt(localStorage.getItem("bones"));
  this.text = game.add.text(Endless.width -100, 10,"-",{
    font:"bold 16px Arial", fill: "#000"
  });
  setInterval(this.register.bind(this), 1000)
}

Endless.Bones.prototype = {
  incr: function(){
    this.val += 1;
    this.update();
  },
  update: function(){
    this.text.text = "Ossa: "+this.val;
    Endless.CommonBones = this.val;
  },
  register: function(){
    localStorage.setItem("bones", this.val);
  }
}
