let webcam;
let ballSystem = [];
let scale = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide();
  for (x = 0; x< 100; x++){
    rx = random(15, width - 15);
    ry = random(15, height - 15);
    rr = random(4, 30);
    ballSystem[x] = new Ball(rx, ry, rr);
  }
}

function draw() {
  webcam.loadPixels();
  for (x = 0; x < ballSystem.length; x++){
    ballSystem[x].move();
    ballSystem[x].show();
    ballSystem[x].checkEdges();
  }
}

class Ball {

  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move(){
    this.x = this.x + random (-8, 8);
    this.y = this.y + random (-8, 8);
  }

  show(){
    // let pixelColour = webcam.get(this.x, this.y);
    let pX = this.x / scale;
    let pY = this.y / scale;
    let pixelColour = webcam.get(pX, pY);
    fill(pixelColour[0], pixelColour[1], pixelColour[2]);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }

  checkEdges(){
    if(this.x < 15){
      this.x = 15;
    } else if (this.x > width - 15){
      this.x = width - 15;
    }
    if (this.y < 15){
      this.y = 15;
    } else if (this.y > height - 15){
      this.y = height - 15;
    }
  }
}


