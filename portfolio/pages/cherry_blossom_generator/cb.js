let start_thickness = 25;
let branch1;
let branch2;
let branches = [];
let start_length = 20;
let branchN = 1300;
let flowerbranches = [];
let numberof_straight = 0;
let numberof_divide = 0;
let flowers = [];
function set_branch(){//this.x2,this.y2,this.angle,this.length,this.branchOut,this.thickness
  branches[0] = new branch(width/2,height-50,PI/2+random(-PI/30,PI/30),start_length,start_thickness,branchN);
  for(let i = 0; i<1505; i++){
    if(i<branches.length){
      
      
      if(branches[i].number>0){
        let a = branches[i].Return();
        if(a[4]){ //two branches
          let ratio = random(0.7,0.88);
          let n = a[6] - floor(random(1,4));
          let num = -1;
          if(random(1)<0.5){
            num = 1;
          }
          let a1 = a[2]+random(-PI/17,PI/17);
          let a2 = a[2]+random(PI/10,PI/4.2)*num;
          let x1 = a[0];
          let y1 = a[1];
          let x2 = a[0];
          let y2 = a[1];
          if(a1<a2){
            x1+=sin(a[2])*a[5]/8;
            y1+=cos(a[2])*a[5]/8;
            x2-=sin(a[2])*a[5]/8;
            y2-=cos(a[2])*a[5]/8;
          }
          else{
            x1-=sin(a[2])*a[5]/8;
            y1-=cos(a[2])*a[5]/8;
            x2+=sin(a[2])*a[5]/8;
            y2+=cos(a[2])*a[5]/8;
          }
          let thicknessT = a[5]*random(0.92,0.96);
          let thickness1 = sqrt(sq(thicknessT)*ratio);
          let thickness2 = sqrt(sq(thicknessT)*(1-ratio));
          branches.push(new branch(x1,y1,a1,a[3]*random(0.93,0.99),thickness1,floor(n*ratio)));
          branches.push(new branch(x2,y2,a2,a[3]*random(0.93,0.99),thickness2,floor(n*(1-ratio))));
        }
        else{ //one branch
          branches.push(new branch(a[0],a[1],a[2]+random(-PI/25,PI/24),a[3]*random(0.93,0.99),a[5]*random(0.92,0.96),a[6]-floor(random(1,3))));
        }
      }
    }
  }
}
function setup() {
  
  createCanvas(800, 800);
  set_branch();
  
  for(let i = 0; i< branches.length; i++){
    branches[i].leaf_out();
  }
  
  //show();
}

function show(){
  translate(-width/4+30,-height/2.5);
  scale(1.4);
  
  background(180,220,255);
  for(let i = 0; i< flowerbranches.length; i++){
    if(flowerbranches[i].over == false)
      
    flowerbranches[i].animate();
  }
  for(let i = 0; i<flowers.length; i++){
    if(flowers[i].over == false)
    flowers[i].animate();
  }
  for(let i = 0; i< branches.length; i++){
    branches[i].show();
  }
  for(let i = 0; i< flowerbranches.length; i++){
    if(flowerbranches[i].over == true)
    flowerbranches[i].animate();
  }
  for(let i = 0; i<flowers.length; i++){
    if(flowers[i].over == true)
    flowers[i].animate();
  }
}
function draw() {
  show();
  
}

class branch{
  constructor(x,y,a,l,t,n){
    this.x = x;
    this.y = y;
    this.angle = a;
    this.length = l;
    this.x2 = this.x+cos(this.angle)*this.length;
    this.y2 = this.y-sin(this.angle)*this.length;
    this.thickness = t;
    this.branchOut = true;
    this.number = n;
  }
  show(){
    strokeWeight(this.thickness);
    stroke(90,30,0);
    line(this.x,this.y,this.x2,this.y2);
  }
  Return(){
    this.branchOut = true;
    if(random(1)<0.45){
      this.branchOut = false;
    }
    let r = [this.x2,this.y2,this.angle,this.length,this.branchOut,this.thickness,this.number];
    
    return r;
  }
  leaf_out(){
    let length = random(0.8)*this.length;
    let x2 = this.x+cos(this.angle)*length;
    let y2 = this.y-sin(this.angle)*length;
    if(this.thickness<5.6){
      let n = 1;
      if(random(1)<0.5)
        n = -1;
      
      flowerbranches.push(new flowerbranch(x2,y2,this.angle+n*PI/3,this.thickness));
    }
    if(this.thickness<5){
      while(random(1)<constrain((1-this.thickness/8),0.83,0.97)){
        length = random(0.8)*this.length;
        x2 = this.x+cos(this.angle)*length;
        y2 = this.y-sin(this.angle)*length;
        let n = 1;
        if(random(1)<0.5)
          n = -1;
        
        flowerbranches.push(new flowerbranch(x2,y2,this.angle+n*PI/3+random(-PI/10,PI/10)));
      }
    }
    if(this.thickness<3){
      while(random(1)<constrain((1-this.thickness/7),0.7,0.93)){
        length = random(0.8)*this.length;
        x2 = this.x+cos(this.angle)*length+random(-this.thickness,this.thickness);
        y2 = this.y-sin(this.angle)*length;
        flowers.push(new flower(x2,y2));
      }
    }
    
    
  }
}
class flower{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.c = random(20);
    this.time = 0;
    this.delay = random(15,40);
    this.r = 0;
    this.over = true;
    if(random(1)<0.5){
      this.over = false;
    }
  }
  animate(){
    this.time++;
    if(this.time>this.delay&&this.r<4){
      this.r+=0.2;
    }
    
    noStroke();
    fill(235+this.c,235-this.c,245-this.c);
    ellipse(this.x,this.y,this.r,this.r);
  }
}
class flowerbranch{
  constructor(x,y,a,t){
    this.x = x;
    this.y = y;
    this.angle = a;
    let n = floor(random(6,10+t));
    this.delay = floor(random((15-n)));
    this.length = random(4,5+n*3);
    this.count = 0;
    this.x2 = this.x+this.length*cos(a);
    this.y2 = this.y-this.length*sin(a);
    this.points = [];
    this.side = [];
    this.phase = 0;
    this.thickness = 0.1+t/10;
    this.c = [];
    for(let i = 0; i<floor(random(n-2,n+5));i++){
      this.points.push(random(this.length));
      this.side.push(floor(random(2)));
      this.c.push(random(20));
    }
    this.over = true;
    
    if(random(1)<0.86){
      this.over = false;this.c = [];
    }
    this._length =0;
    this._flowerR = 0;
  }
  animate(){
    strokeWeight(this.thickness);
    if(this.phase == 0){
      this.count++;
    }
    if(this.count>=this.delay){
      this.phase = 1;
    }
    
    this._x2 = this.x+this._length*cos(this.angle);
    this._y2 = this.y-this._length*sin(this.angle);
    stroke(110,50,20);
    line(this.x,this.y,this._x2,this._y2);
    if(this.phase == 1){
      this._length++;
    }
    if(this._length>this.length){
      this._length = this.length;
      this.phase = 2;
    }
    
    if(this.phase == 2){
      this._flowerR += 0.2;
    }
    if(this._flowerR>=4){
      this.phase = 3;
      this._flowerR = 4;
    }
    for(let i = 0; i<this.points.length; i++){
      let x = this.x+this.points[i]*cos(this.angle);
      let y = this.y-this.points[i]*sin(this.angle);
      noStroke();
      fill(235+this.c[i],235-this.c[i],245-this.c[i]);
      if(this.side[i] == 0){
        ellipse(x-cos(PI/2-this.angle)*1.5,y-sin(PI/2-this.angle)*1.5,this._flowerR,this._flowerR);
      }
      else if(this.side[i] == 1){
        ellipse(x+cos(PI/2-this.angle)*1.5,y+sin(PI/2-this.angle)*1.5,this._flowerR,this._flowerR);
      }
      ellipse(this.x2,this.y2,this._flowerR,this._flowerR);
      
    }
  }
}

