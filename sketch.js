// there will be a penguin running across the screen to the right. This penguin will have to catch fish as it goes along. There will be a seal chasing the penguin. If the penguin hits one of the randomly spawned sharks, the seal will get closer for a while.   

var arctic, arcticImage, penguin, penguinImage, fish1, fishGroup, seal, sealImage, sharkImage, sharkGroup, score=0, distance, marker, gamestate="play";
var rand;

function preload(){
  penguinImage = loadImage("penguin.png");
  sealImage = loadImage("seal.png");
  sharkImage = loadImage("shark.png");
  arcticImage = loadImage("arctic.jpeg");
  fish1 = loadImage("fish1.png");
  arctic = loadImage("arctic.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  distance = windowHeight/3;
  
  penguin = createSprite(50,340);
  penguin.addImage('penguin', penguinImage);
  penguin.scale = windowWidth/10000;
  
  seal = createSprite(penguin.x-150,penguin.y);
  seal.addImage('seal',sealImage);
  seal.scale = windowWidth/1990;
  seal.setCollider("rectangle", 0,0, 200,180);
  //seal.debug = true;
  
  fishGroup = createGroup();
  sharkGroup = createGroup();

}



function draw() {
  background(20, 200, 45);
  //background(arcticImage);

  console.log(penguin.x);  
  rand = Math.round(random(1,10));

  if(gamestate === "play"){
    camera.position.x = penguin.x;
    camera.position.y = displayHeight/2;
   
    
    //allow the penguin to move
    movePenguin();

  //call fish
 if(World.frameCount%50===0){ 
 fishTime();
 }
  //call shark
  if(World.frameCount%80===0){ 
  sharkTime();
  } 
    
  //seal trails behind the penguin
  seal.x = penguin.x - distance;
  seal.y = penguin.y;
  
  //seal comes closer to penguin if the seal touches the shark
   if(penguin.isTouching(sharkGroup)){
    sharkGroup.destroyEach();
    distance-=distance/6;
    marker = score;
  }
   
  //score increases as penguin collects fish
   if(penguin.isTouching(fishGroup)){
    fishGroup.destroyEach();
    score++;
  }
  
  //seal backs up if the score is a multiple of 3  
  if(distance<250){ 
 if((score - marker)%4 === 0 && marker != score){
      distance++;  
    } 
 }
  //once the seal touches the penguin, the game state switches to end 
    if(seal.isTouching(penguin) || penguin.x>5000){
    gamestate = "end";
  }
    
  } else if(gamestate === "end"){
     penguin.lifetime = -1;
     seal.lifetime = -1;

     fishGroup.destroyEach();
     sharkGroup.destroyEach();
     } 
  
 drawSprites();
 
  
  //display the score and the highest score
  fill(255,0,255);
  textSize(15)
  text("SCORE: " + score, penguin.x-400,15);
 
  //ending text
  if(gamestate==="end"){
  fill(255,0,0);
  textSize(35);
  text("You caught "+ score + "fish" , seal.x + 30,windowHeight/4.5);
 console.log("la");
  }
}


function fishTime(){
  var fish;
  fish = createSprite(windowWidth+30, Math.round(random(50,windowHeight-70)));
  //rand = Math.round(random(1,windowWidth));

  fish.x = windowHeight/rand;
  fish.scale = windowWidth/3000;
  fish.lifetime = 100;
  fish.addImage('fish', fish1);
  fishGroup.add(fish);
}

function movePenguin(){
    if(keyDown("up")){
      penguin.y-=20;
     }
  if(keyDown("down")){
      penguin.y+=20;
     }
  if(keyDown("right")){
      penguin.x+=20;
     }
  if(keyDown("left")){
      penguin.x-=20;
     }
}

function sharkTime(){
var shark = createSprite(windowWidth+30, Math.round(random(50,windowHeight-100)));
//console.log(windowWidth/rand);
shark.x = windowWidth/rand;
shark.scale = windowWidth/2203;
sharkGroup.add(shark);
shark.addImage('shark', sharkImage);
shark.lifetime = 100;

}
