var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var RoadObs;
var redCG, pinkCG, yellowCG;
var cycleBellll;
var red, pink, yellow;
var player1, player2, player3;
var gameOver, restart, gameOverSprite, resetButton;
var END =0;
var cone, hole, nails;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  red = loadAnimation("opponent7.png","opponent8.png")
  redfall=loadAnimation("opponent9.png")
  yellow = loadAnimation("opponent4.png","opponent5.png")
  yellowfall=loadAnimation("opponent6.png")
  pink = loadAnimation("opponent1.png","opponent2.png")
  pinkfall=loadAnimation("opponent3.png")
  gameOver = loadImage("gameOver.png")
  cone = loadImage("obstacle1.png")
  hole = loadImage("obstacle2.png")
  nails = loadImage("obstacle3.png")
  cycleBell = loadSound("sound/bell.mp3")
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

gameOverSprite=createSprite(300,150,10,10)
gameOverSprite.scale = 0.75;
gameOverSprite.addImage("gO", gameOver)
gameOverSprite.visible = false




//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.debug = false
mainCyclist.setCollider("circle",0,0,600)

  
  
  player1 = new Group()
  
  player2 = new Group()
  
  player3 = new Group()
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
 
  
  
  
  if(gameState===PLAY){
    if(keyDown("space")){
      cycleBell.play()
    }
    
  
      distance =distance+Math.round(getFrameRate()/50)
      
      path.velocityX = -5
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);


  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    var obstaclesRan = Math.round(random(1,3))
    if(frameCount%150 === 0){
      if(obstaclesRan===1){
        pinkCyclists()
      }else if(obstaclesRan===2){
        redCyclists();
      }
      else{
        yellowCyclists();
      }
    }
    if (mainCyclist.isTouching(player1)){
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      pinkCG.addAnimation("obstacle1",pinkfall)
      pinkCG.velocityX=0
      gameState=END;
    }
    if (mainCyclist.isTouching(player2)){
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      redCG.addAnimation("obstacle2",redfall)
      redCG.velocityX=0
      gameState=END;
    }
    if (mainCyclist.isTouching(player3)){
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      yellowCG.addAnimation("obstacle3",yellowfall)
      yellowCG.velocityX=0
      gameState=END;
    }
 }
 if (gameState===END){
   path.velocityX=0;
   player1.setLifetimeEach(-1)
   player2.setLifetimeEach(-1)
   player3.setLifetimeEach(-1)
gameOverSprite.visible = true

   
  if(keyDown("r")){
    gameState = PLAY
    player1.destroyEach();
    player2.destroyEach();
    player3.destroyEach();
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1)
    gameOverSprite.visible = false
    distance = 0
  }
 }
  
}
function pinkCyclists(){
  pinkCG = createSprite(600,random(50,250),20,20)
  pinkCG.scale = 0.06
  pinkCG.addAnimation("obstacle1",pink)
  pinkCG.debug = false
  pinkCG.lifetime = 170
  player1.add(pinkCG)
  pinkCG.velocityX=-4
  
}
function redCyclists(){
  redCG = createSprite(600,random(50,250),20,20)
  redCG.scale = 0.06
  redCG.addAnimation("obstacle2",red)
  redCG.lifetime = 170
  player2.add(redCG)
  redCG.debug = false
  redCG.velocityX=-4
  
}
function yellowCyclists(){
  yellowCG = createSprite(600,random(50,250),20,20)
  yellowCG.scale = 0.06
  yellowCG.addAnimation("obstacle3",yellow)
  yellowCG.lifetime = 170
  player3.add(yellowCG)
  yellowCG.velocityX=-4
  yellowCG.debug = false
  
}

function newObstacle(){
  RoadObs = createSprite(600,Math.round(random(50,270)),20,20)
  var random = Math.round(random(1,3))

  switch(random){
    case 1:
      RoadObs.addImage("obs",cone);
      break;
      case 2:
        RoadObs.addImage("obs",hole);
        break;
        case 3:
          RoadObs.addImage("obs",nails);
          break;
          default:
          break;
  }
}