// creating variable for bacdkground 
var bg,bgImage;

//creating variables for mario 
var mario,mario_running,mario_collided;

//creating variables for bricks
var brick,bricksGroup;

//creating variables for score
var score = 0

//creating variables for obstacles
var mushObstacleImage,turtleObstacleImage;

//starting for play
var gameState="PLAY"

//creating variable for restart
var restart;

//function for loading all images
function preload()
{
    mario_running=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
    bgImage=loadImage("images/bgnew.jpg")
    brickImage=loadImage("images/brick.png")
    coinImage=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
    mushObstacleImage=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
    turtleObstacleImage=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
    coinSound=loadSound("sounds/coinSound.mp3")
    dieSound=loadSound("sounds/dieSound.mp3")
    dieImage=loadAnimation("images/dead.png")
}

//creating all the sprites
function setup() {
    createCanvas(1000, 600);


    //creating  sprite  for background 
    bg=createSprite(550,300)
    bg.scale=0.5
    bg.velocityX=-6
    bg.addImage(bgImage)

    //creating sprit for mario
    mario=createSprite(200,505,20,50)
    mario.addAnimation("running",mario_running)
    mario.addAnimation("collided",dieImage)
    mario.scale=0.3

    //creating sprite for ground 
    ground=createSprite(200,585,400,10)
    ground.visible=false;

    //creating all groups
    bricksGroup   = new Group();
    coinsGroup    = new Group(); 
    obstaclesGroup = new Group();
}

//adding all the properties
function draw()
{

    if(gameState=="PLAY")
    {

    
   //jump mario
    if(keyDown("space"))
    {
        mario.velocityY=-16
    }

    //repeating the background after some interval
    if(bg.x<100)
    {
        bg.x=bg.width/4
    }
    //preventing mario for moving out from its X axis
    if(mario.x<200)
    {
        mario.x=200
    }
    //preventing mario for moving out from its Y axis
    if(mario.y<50)
    {
        mario.y=50
    }
    
    //adding gravity to mario
    mario.velocityY=mario.velocityY+0.5;
    mario.collide(ground);

    //calling function for creating bricks
    generateBricks();

    for(var i=0; i<(bricksGroup).length; i++)
    {
        //taking 1 brick at a time
        var temp=(bricksGroup).get(i)
        if(temp.isTouching(mario))
        {
            //colloiding mario with bricks
           mario.collide(temp);
        }
    }
    //calling function for generating coins
    generateCoins();
    var i =0 ;
    while(i<(coinsGroup).length)
    {
        //taking 1 coin at a time
        var temp=(coinsGroup).get(i)
        if(temp.isTouching(mario))
        {
            //destroying coins when mario touches it 
            temp.destroy()
            temp=null
            score++

            //playing the sound when coin touches by mario
            coinSound.play()
        }
        i++
    }

    //calling function for generating the obsticle
    generateObstacles();
    if(obstaclesGroup.isTouching(mario))
    {
        gameState="END"
        dieSound.play()
    }
}
else if(gameState=="END")
{   
    bg.velocityX=0;
    mario.velocityX=0;
    mario.velocityY=0;
    obstaclesGroup.setVelocityXEach(0) 
    obstaclesGroup.setLifetimeEach(-1)
    coinsGroup.setVelocityXEach(0)
    coinsGroup.setLifetimeEach(-1)
    bricksGroup.setVelocityXEach(0)
    bricksGroup.setLifetimeEach(-1)
    mario.changeAnimation("collided",dieImage)
    mario.y=570

    text("press R to restart",50,50);
    if(keyDown("r")){
        gameState="PLAY"
        reset();
    }
}
    drawSprites()
    textSize(20)
    fill("brown")
    text("score = "+score,500,50)
}

//creating function for generating the bricks
function generateBricks()
{
    if(frameCount%70==0)
    {
      //creating sprites for bricks
      var bricks=createSprite(1200,120,40,10)
      bricks.y=random(50,450)
      bricks.addImage(brickImage)
      bricks.scale=0.5
      bricks.velocityX=-5
      bricks.lifetime=250
     
       //adding bricks in a group
      bricksGroup.add(bricks)
    }
}

//creating function for generating coins
function generateCoins()
{
if(frameCount%50==0)
  {
      //creating sprites for coins
    var coins = createSprite(1200,120,40,10)
    coins.addAnimation("coin",coinImage)
    coins.velocityX=-3
    coins.scale=0.1
    coins.y=Math.round(random(80,350))
    coins.lifetime=1200
    //adding coins in a group
    coinsGroup.add(coins)
  }  
}

//creating function for generate obstacles
function generateObstacles()
{
    if(frameCount%120==0)
    {
        //creating sprite for obstaces
        var obstacle = createSprite(1050,550,10,40)
        obstacle.velocityX=-3
        obstacle.scale=0.2
        var rand = Math.round(random(1,2))

        //selecting 1 obstacle at a time by using switch case
        switch(rand){
            case 1 :
               obstacle.addAnimation("mush",mushObstacleImage)
               break
            case 2 :
                obstacle.addAnimation("turtle",turtleObstacleImage)
                break
            default :
                break
        }
        obstacle.lifetime=400
        //adding obstacles in group
        obstaclesGroup.add(obstacle)
    }
}
function reset(){
    gameState="PLAY"

    score=0

}