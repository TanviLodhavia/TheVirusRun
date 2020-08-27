class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    //this.title.html("The Virus Run");
    //this.title.position(displayWidth/2 - 50, 0);
    this.reset.position(displayWidth-100,20);
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);

    logo = createSprite(displayWidth/2+80, displayHeight/2-20, 20,20);
    logo.addImage(logopic);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      logo.visible = false;
      this.greeting.position(displayWidth/2 - 70, displayHeight/2);
    });
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);    
    })

    drawSprites();
  }
}
