let NUM_OF_BUTTONS = 1;
let sounds = ["baby", "birds", "cartoon", "cheering", "chipmunk", "cow", "toy", "horse"];
let buttons = [];
let img;
let bg;
let dancer;
let dogimg = ["d1"];


function preload() {
    baby = loadSound("sound-assets/playground/baby-laughing.mp3");
    birds = loadSound("sound-assets/playground/birds.mp3");
    cartoon = loadSound("sound-assets/playground/cartoon-whistle.mp3");
    cheering = loadSound("sound-assets/playground/cheering-and-clapping-crowd.mp3");
    chipmunk = loadSound("sound-assets/playground/chipmunks.mp3");
    cow = loadSound("sound-assets/playground/cow-moos.mp3")
    toy = loadSound("sound-assets/playground/dog-toy.mp3")
    horse = loadSound("sound-assets/playground/horse.mp3")
    img = loadImage("img/ball.png")
    bg = loadImage("img/pb.png")
    d1 = loadImage("img/d1.png")

}

function setup() {


    createCanvas(windowWidth, windowHeight);

    bx = windowWidth / 2
    by = windowHeight / 2

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        buttons.push(new Button(bx - 550, by + 210, 130, baby));
        buttons.push(new Button(bx - 350, by + 140, 40, birds));
        buttons.push(new Button(bx - 150, by + 130, 90, cartoon));
        buttons.push(new Button(bx + 500, by + 320, 40, cheering));
        buttons.push(new Button(bx + 300, by + 150, 100, chipmunk));
        buttons.push(new Button(bx + 600, by + 130, 70, cow));
        buttons.push(new Button(bx + 100, by + 150, 50, toy));
        buttons.push(new Button(bx, by + 320, 70, horse));
        noCursor();
    }

    //visualizations.push(new SineWaveVisualization(75, 220));
    // dancer.push(new DoggDancer(bx + 300, by + 100, d1));

}

function draw() {
    background(bg);

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.checkMouse();
        b.display();
    }
    push();
    imageMode(CENTER);
    image(img, mouseX, mouseY, 50, 50);
    pop();

    //dog
    dancer.update();
    dancer.display();
}

class Button {
    constructor(x, y, rad, sound) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.sound = sound;
        // color
        this.r = 255;
        this.g = 255;
        this.b = 255;

    }
    checkMouse() {
        let distance = dist(this.x, this.y, mouseX, mouseY);
        if (distance < this.rad) {
            // mouse is in the area
            this.r = 255;
            this.g = 103;
            this.b = 86;
            if (mouseIsPressed) {
                this.r = 155;
                this.b = 80;
                this.g = 63;
                if (this.sound.isPlaying() == false) {
                    this.sound.play();
                }
            }
        } else {
            // mouse is out of the area
            this.r = 255;
            this.g = 255;
            this.b = 255;
            this.sound.stop();
        }
    }
    display() {
        push();

        strokeWeight(.5);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2, this.rad * 2);

        pop();
    }
}
//dog
class DoggDancer {
    constructor(startX, startY, imgdog) {
        this.x = startX;
        this.y = startY;
        this.img = imgdog
    }
    update() {
        this.offsetx = 0;
        this.offsety = (sin(frameCount * 0.01) * 10);
    }
    display() {

        push();
        translate(this.x + this.offsetx, this.y + this.offsety);

        this.drawDog();
        pop();
    }
    drawDog() {
        image(this.img, 0, 0, 200, 200)
    }
}