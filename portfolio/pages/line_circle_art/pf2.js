let Im;
let x = [];
let y = [];
let c = [];
let current = 0;
let direction = 0;
let distance = 0.7; 
function preload(){
  Im = loadImage('audrey.jpg');
}
function setup() {
  createCanvas(500, 500);
  image(Im,0,0,width,height);
  x[0] = width/2;
  y[0] = height/2+40;
  c[0] = get(x[0],y[0]);
  
  for(let i = 0; i<22000; i++){
    x.push(width/2+cos(direction)*distance);
    y.push(height/2+40+sin(direction)*distance);
    c.push(get(x[x.length-1],y[y.length-1]));
    direction+=PI/random(33,35);
    distance+=0.2/(distance**0.1);
  }
  background(20);
}
let i = 0;
function draw() {
  
  
  
  strokeWeight(3);
  if(i<x.length)
  i++;
    
    strokeWeight((c[i][1]+8)/255*6);
    stroke(250,250,200);
    line(x[i],y[i],x[i+1],y[i+1]);
  
  
  if(mouseIsPressed){
    x.push(mouseX);
    y.push(mouseY);
    c.push(get(x[x.length-1],y[y.length-1]));
  }
}