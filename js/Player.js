class Player {
  constructor(){
    this.index = null;
    //this.distance = 0;
    this.distanceX = 200;
    this.distanceY = 0;
    this.name = null;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distanceY:this.distanceY,
      distanceX:this.distanceX
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd(){
    var carsendRef = database.ref('carsAtEnd');
    carsendRef.on("value", (data)=>{
      this.rank = data.val();
    })
  }
  static updateCarsAtEnd(val){
    database.ref("/").update({
      carsAtEnd:val
    });
  }
}
