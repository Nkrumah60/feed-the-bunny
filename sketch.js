const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var fruit,ground;
let rope,rope2,rope3
let fruit_con;
let fruit_con_2;
let fruit_con_3

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;

let cutSound
let eatSound
let bgSound
let sadSound
let airSound
let blower
let mute
let shelf


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  mute = loadImage('mute.png');

  cutSound = loadSound("rope_cut.mp3");
  eatSound = loadSound("eating_sound.mp3");
  airSound= loadSound("air.wav");
  bgSound = loadSound("sound1.mp3");
  sadSound = loadSound("sad.wav");
  

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  bgSound.play()
  bgSound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  /*
  button = createImg('cut_btn.png');
  button.position(50,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //button3 = createImg('cut_btn.png');
  button3.position(400,180);
  button3.size(50,50);
  button3.mouseClicked(drop3);
*/
  button2 = createImg('cut_btn.png');
  button2.position(220,40);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  blower = createImg('balloon.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airBlow);

  mute = createImg('mute.png');
  mute.position(450,20);
  mute.size(50,50);
  mute.mouseClicked(muted);
  
  rope2 = new Rope(7,{x:245,y:55});
  //rope3 = new Rope(8,{x:430,y:180});
  //rope = new Rope(7,{x:70,y:30});
  ground = new Ground(200,690,600,20);
  shelf = new Ground(350,350,100,20)

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(350,275,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(250,250,20);
  Matter.Composite.add(rope2.body,fruit);

  //fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  //fruit_con3 = new Link(rope3,fruit);




  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  //rope.show();
  rope2.show();
  //rope3.show();
  Engine.update(engine);
  ground.show();
  shelf.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatSound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     sadSound.play()
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutSound.play();
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  cutSound.play();
}

function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
  cutSound.play();
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=40)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){

Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
airSound.play();

}


function muted(){

if(bgSound.isPlaying()){

bgSound.stop()


}
else{

bgSound.play()

}

}
