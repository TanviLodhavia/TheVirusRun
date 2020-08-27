class Game {
  constructor(){
    this.score = createElement('h2');
    this.lives = createElement('h2');
    this.uhoh = createElement('h2');

    this.mask = createButton('Mask');
    this.sanitizer = createButton('Sanitizer');
    this.pills = createButton('Pills');

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    mask1 = createSprite(200,200,20,20);
    mask1.addImage(maskimg);
    mask1.scale = 0.5;
    mask1.visible = false;
    mask1.debug = false;
    mask2 = createSprite(200,200,20,20);
    mask2.addImage(maskimg);
    mask2.scale = 0.5;
    mask2.visible = false;
    mask2.debug = false;
    masks = [mask1,mask2];

    san1 = createSprite(200,200,20,20);
    san1.addImage(sanimg);
    san1.debug = true;
    san1.scale = 0.5;
    san1.visible = false;
    san2 = createSprite(200,200,20,20);
    san2.addImage(sanimg);
    san2.debug = true;
    san2.scale = 0.5;
    san2.visible = false;
    sanitizers = [san1, san2];

    pill1 = createSprite(200,200,20,20);
    pill1.addImage(pillimg);
    pill1.debug = true;
    pill1.scale = 0.1;
    pill1.visible = false;
    pill2 = createSprite(200,200,20,20);
    pill2.addImage(pillimg);
    pill2.debug = true;
    pill2.scale = 0.1;
    pill2.visible = false;
    pills = [pill1, pill2];

    car1 = createSprite(100,200);
    car1.addImage(pic1);
    car1.scale = 0.45;
    car1.setCollider("circle",0,0,80);
    cars.push(car1);
    car2 = createSprite(300,200);
    car2.addImage(pic2);
    car2.scale = 0.45; 
    car2.setCollider("circle",0,0,80);
    cars.push(car2); 
    cars = [car1, car2];
    console.log(cars);

  

  }

  play(){
    form.hide();
    console.log(player.distanceY);
    
  

    
    Player.getPlayerInfo();   
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(236,237,241));
      //img for ground
      image(track1,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;
      //x and y position of the cars
      var x = 175;
      var y;

      
      
      //score
      this.score.html("Score : " + score);
      this.score.position(displayWidth*8/9, 100);
      //lives
      this.lives.html("Lives : " + lives);
      this.lives.position(displayWidth*8/9, 120);
      //end
      //masks
      this.mask.position(displayWidth - 100, displayHeight/2);
      //sanitizers
      this.sanitizer.position(displayWidth - 100, displayHeight/2 + 30);
      //pills
      this.pills.position(displayWidth - 100, displayHeight/2 - 30 );

      

      

      
      

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;    
        //position the cars a little away from each other in x direction
        x = displayHeight - allPlayers[plr].distanceX;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;

        cars[index-1].x = x;
        cars[index-1].y = y;

        car1.depth = 7;
        car2.depth = 7;

        masks[index-1].x = x;
        masks[index-1].y = y;

        mask1.depth = 6;
        mask2.depth = 6;

        sanitizers[index-1].x = x;
        sanitizers[index-1].y = y;

        san1.depth = 5;
        san2.depth = 5;

        pills[index-1].x = x;
        pills[index-1].y = y;

        pill1.depth = 8;
        pill2.depth = 8;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distanceY, 120,display_position)
      }

    }

    this.mask.mousePressed(()=>{
      score = score+35; 
      //virusgrp.velocityY = virus.velocityY - 2;     
      console.log("MASK");
      mask1.visible = true;  
      mask2.visible = true;     
    })

    this.sanitizer.mousePressed(()=>{
      score = score+40;
      //virus.velocityY = virus.velocityY - 2;
      san1.visible = true;
      san2.visible = true;
    })

    this.pills.mousePressed(()=>{
      score = score+45;
      //virus.velocityY = virus.velocityY - 2;
      pill1.visible = true;
      pill2.visible = true;
    })


    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      score = score+10;
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX +=10;
      //cars[player.index - 1] = player.distanceX;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX -=10;
      //cars[player.index - 1] = player.distanceX;
      player.update();
    }

    if(score >= 1500){
      if(keyIsDown(UP_ARROW)){
        player.distanceY+=3;
        score = score+3;
        player.update();
      }     
      if(keyIsDown(LEFT_ARROW)){
        player.distanceX +=3;
        score = score+3;
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW)){
        player.distanceX -=3;
        score = score+3;
        player.update();
      }
    }

    if(score >= 2500){
      if(keyIsDown(UP_ARROW)){
        player.distanceY+=5;
        score = score+5;
        player.update();
      }     
      if(keyIsDown(LEFT_ARROW)){
        player.distanceX +=5;
        score = score+5;
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW)){
        player.distanceX -=5;
        score = score+5;
        player.update();
      }
    }

    if(score >= 4500){
      if(keyIsDown(UP_ARROW)){
        player.distanceY+=5;
        score = score+5;
        player.update();
      }     
      if(keyIsDown(LEFT_ARROW)){
        player.distanceX +=5;
        score = score+5;
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW)){
        player.distanceX -=5;
        score = score+5;
        player.update();
      }
    }

    if (lives === 0){
      gameState = 2;
    }

    if (gameState === 2){
      strokeWeight(3);
      stroke("blue");
      textSize(20);
      this.uhoh.html("Uh Oh! Your lives are over. No problem You Can Try Again");
      this.uhoh.position(displayWidth/3, displayHeight/3)
    }

    if(player.distanceY>5250){
      gameState = 2;
      player.rank+=1;
      vaccine = createSprite(200, player.distanceY, 20, 20);
      console.log(player.rank);
      Player.updateCarsAtEnd(player.rank);
    }

    if (frameCount % 40 === 0){
      spawnVirus();
    }

    if (cars[player.index-1].isTouching(virusgrp)){
      lives = lives-1;
    } 

    drawSprites();
  }
  end(){
    console.log("Game End");
        
    //game.update(2);
  }
}