// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);


}

function draw() {
  background(50);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height), random(1, 3));
  }

  // generate objects for the disco ball
  particles.push(new Particle(mouseX, mouseY, random(10, 20)));



  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.speedUp();
    p.checkOutOfCanvas();
    p.display();
  }

  // control the number of objects based in its "isDone" value
  /***** the For loop MUST be flipped! *****/
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone == true) {
      particles.splice(i, 1); // (index, quantity)
    }
  }
  noStroke();
  fill(0, 255, 0);
  text(particles.length, 10, 20);
}

class Particle {
  // constructor function
  constructor(startX, startY, startDisc) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.diaSpark = startDisc;
    this.xSpd = random(-0.01, 0.01);
    this.ySpd = random(-0.000001, 0.00001);
    this.diaDisc = random(10, 20) * 5;
    this.isDone = false; // ***
  }

  //check out of canvas
  checkOutOfCanvas() {
    // horizontally
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    // vertically
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }

  // methods (functions): particle's behaviors
  update() {
    this.x += this.xSpd;
    this.y += sin(this.ySpd) * 3;
  }

  speedUp() {
    this.xSpd *= 1.1;
    this.ySpd *= 1.1;
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    stroke(random(255), random(255), random(255))
    ellipse(0, 0, this.diaSpark * .05, this.diaSpark * 2);
    pop();

    //disco ball
    push();
    fill(200);
    noStroke();
    rect(mouseX, mouseY, this.diaSpark * .005, -windowHeight);
    pop();

    push();
    strokeWeight(5);
    stroke(random(255), random(255), random(255));
    fill(255)
    ellipse(mouseX, mouseY, this.diaDisc, this.diaDisc);
    pop();
  }
}
