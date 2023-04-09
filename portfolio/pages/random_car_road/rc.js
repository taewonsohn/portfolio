let x = 300;
let y = 0;
let screenX = 0;
let roadY = [];
let xoff = 0;
let yspeed = 0;
let g = 0.15;
let angle = 0;
let Aangle = 0;
let above = true;
let sunRise = true;
let DayColor = 0;
let roadLength = 50;
let colorY
function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseDetail(2,0.9);
  for(let i = 0; i<ceil(1000/roadLength); i++){
    roadY.push(noise(xoff));
    xoff+=0.05;
  }
}
let time = 0;
function draw() {
  resizeCanvas(windowWidth, windowHeight);
  translate(-screenX,100);
  background(30,0,10);
  background(130,230,275,DayColor);
  DayColor = 255*sin(radians(time/5%180));
  rectMode(CENTER);
  time ++;
  let Rx = x+screenX;
  y+=yspeed;
  yspeed+=g;
  Aangle += 0.4*(angle-Aangle);
  stroke(0);
  strokeWeight(1);
  push();
  translate(Rx,y);
  rotate(Aangle);
  noStroke();
  fill(250,250,45,250-DayColor);
  triangle(23,-14,75,-34,75,6);
  rectMode(CORNER);
  for(let i = 0; i< 35; i++){
    fill(250,250,45,250-DayColor-i*5);
    rect(75+i,-34-i*0.4,1,40+i*2*0.4);
  }
  rectMode(CENTER);
  fill(100+DayColor*0.6,constrain(DayColor*0.6-20,0,255),constrain(DayColor*0.6-20,0,255));
  
  rect(0,-10,80,30,10);
  rect(-5,-20,40,40,8);
  
  fill(constrain(DayColor*0.3,0,60));
  ellipse(-20,10,20,20);
  ellipse(20,10,20,20);
  fill(40+DayColor*0.6);
  rect(41,-13,10,20,4);
  
  pop();
  fill(0);
  //text(time,100+Rx,50);
  beginShape();
  vertex(Rx-width,height+100);
  for(let i = ceil(screenX/roadLength)-20; i<roadY.length; i++){
    colorMode(HSB,100);
    stroke((Rx/370)%100,100-y/4,constrain(-60+DayColor*0.4,0,253)+DayColor*0.05);
    strokeWeight(6);
    colorMode(RGB);
    let roadAY = roadY[i-1]*height;
    let roadBY = roadY[i]*height;
    line(i*roadLength-roadLength,roadAY+2,i*roadLength,roadBY+2);
    vertex(i*roadLength-roadLength,roadAY+2);
    //ellipse(i*100-100,roadY[i-1]*height,10,10);
    //ellipse(i*100,roadY[i]*height,10,10);
    if(Rx>=i*roadLength-roadLength&&Rx<=i*roadLength){
      let mY = roadBY-roadAY;
      let v1 = createVector(roadLength,0);
      let v2 = createVector(roadLength,mY);
      if(above == false){
        angle = v1.angleBetween(v2);
      }
      
      fill(255,0,0,100);
      let groundY = (Rx-10-i*roadLength+roadLength)*mY/roadLength+roadAY;
      //ellipse(Rx,groundY,20,20);
      fill(255);
      if(y+20>groundY){
        
        y = groundY-20;
        yspeed -=1;
      }
      if(y+20>groundY-3){
        above = false;
      }
      else{
        above = true;
      }
      
    }
    
  }
  //fill(126,200,80);
  vertex(Rx+width,height+100);
  colorMode(HSB,100);
  fill((Rx/370)%100,100,constrain(-30+DayColor*0.4,7,253)+DayColor*0.05);
  
  endShape();
  colorMode(RGB);
  if(!keyIsPressed||keyIsPressed||above){
    screenX+=10;
  }
  if(above){
    angle+=radians(-0.3);
  }
  if(screenX>roadY.length*roadLength-600-width){
    xoff+=0.05;
    roadY.push(noise(xoff));
  }
}
