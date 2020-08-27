var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1, car2;
var track1, pic1, pic2, ground1, vir1img, vir2img, virusimgs;
var mask1, mask2, maskimg;
var san1, san2, sanimg;
var pill1, pill2, pillimg;
var vaccine, vaccimg;
var logo, logopic;
var cars = [];
var masks = [];
var sanitizers = [];
var pills = [];
var virusgrp;
var maskbutton;

var score = 0;
var lives = 5;

function preload(){
  //ground
  track1 = loadImage ("images/GAMEEND.png");
  //player1
  pic1 = loadImage("images/player1.png");
  //player2
  pic2 = loadImage("images/player2.png");
  //virus1
  vir1img = loadImage("images/img1.png");
  //virus2
  vir2img = loadImage("images/img2.png");
  //mask
  maskimg = loadImage("images/Mask.png");
  //san
  sanimg = loadImage("images/Sanitzer.png");
  //pill
  pillimg = loadImage("images/med.png");
  //vaccine
  vaccimg = loadImage("images/Vac.png");
  //logo
  logopic = loadImage("images/bckgrnd.png");
  
  
  
  
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  virusgrp = new Group();

}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }

}

function spawnVirus(){
  var virus;
  virus = createSprite(random (displayWidth/8, displayWidth * 7/8), random(-displayHeight*4, -displayHeight), 20, 20);
  virus.velocityY = random(2,7);
  virus.addImage(vir1img);
  virus.scale = random(0.1,0.25);
  virusgrp.add(virus);
  virus.debug = true;
  
}
