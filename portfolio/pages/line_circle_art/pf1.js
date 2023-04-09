var s= function(sketch){
    let Im;
    let x = [];
    let y = [];
    let c = [];
    let current = 0;
    let direction = 0;
    let distance = 1.5; 
    let i = 0;
    sketch.preload = function(){
        Im = sketch.loadImage('popart.jpg');
    }
    sketch.setup = function() {
        sketch.createCanvas(600, 600);
        sketch.image(Im,0,0,sketch.width,sketch.height);
        x[0] = width/2;
        y[0] = height/2;
        c[0] = get(x[0],y[0]);
        
        for(let i = 0; i<22000; i++){
            x.push(sketch.width/2+cos(direction)*distance);
            y.push(sketch.height/2+sin(direction)*distance);
            c.push(sketch.get(x[x.length-1],y[y.length-1]));
            direction+=PI/random(33,35);
            distance+=0.2/(distance**0.1);
        }
        sketch.background(20);
    }
        
    sketch.draw = function() {
        sketch.strokeWeight(3);
        if(i<x.length){
            i++;
                
            sketch.strokeWeight(c[i][1]/255*5);
            sketch.stroke(255,0,0);
            sketch.line(x[i],y[i],x[i+1],y[i+1]);
        }
        
        if(mouseIsPressed){
            x.push(mouseX);
            y.push(mouseY);
            c.push(get(x[x.length-1],y[y.length-1]));
        }
    }
}
let ph1 = new p5(s,'p5sketch');
