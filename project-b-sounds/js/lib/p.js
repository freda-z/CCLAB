let NUM_OF_BUTTONS = 1;
let sounds = ["baby", "birds", "cartoon", "cheering", "chipmunk", "cow", "toy", "horse"];
let buttons = [];
let img;


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
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bx = windowWidth / 2
    by = windowHeight / 2

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        buttons.push(new Button(bx - 400, by - 150, 100, baby));
        buttons.push(new Button(bx, by, 80, birds));
        buttons.push(new Button(bx + 250, by - 200, 50, cartoon));
        buttons.push(new Button(bx - 300, by + 80, 30, cheering));
        buttons.push(new Button(bx + 300, by + 150, 150, chipmunk));
        buttons.push(new Button(bx + 400, by - 100, 80, cow));
        buttons.push(new Button(bx - 350, by + 230, 50, toy));
        buttons.push(new Button(bx - 130, by + 130, 40, horse));
        noCursor();
    }
}

function draw() {
    background(234, 225, 199);

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.checkMouse();
        b.display();
    }
    push();
    imageMode(CENTER);
    image(img, mouseX, mouseY, 50, 50);
    pop();
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