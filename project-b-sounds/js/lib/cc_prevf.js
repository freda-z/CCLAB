let RING_WIDTH = 50;

let soundFiles = [
    "sound-assets/calm-corner/daylight.mp3",
    "sound-assets/calm-corner/beach-waves.mp3",
    "sound-assets/calm-corner/beach-waves.mp3",
    "sound-assets/calm-corner/relaxing-guitar.mp3",
    "sound-assets/calm-corner/soft-ambient-atmosphere.mp3",
    "sound-assets/calm-corner/soft-rain.mp3"
];
let sounds = [];
let buttons = [];
let img;
let bg;

function preload() {
    img = loadImage("img/cloud.png")
    bg = loadImage("img/ccb.png")
    for (let i = 0; i < soundFiles.length; i++) {
        sounds.push(loadSound(soundFiles[i]));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bx = (windowWidth / 2)
    by = (windowHeight / 2) + 85

    for (let i = 0; i < sounds.length; i++) {
        let rad = 300 - i * RING_WIDTH;
        buttons.push(new Button(bx, by, rad, sounds[i]));
    }
    noCursor();
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
        if (distance < this.rad && distance > this.rad - RING_WIDTH) {
            // mouse is in the area
            this.r = 255;
            this.g = 103;
            this.b = 86;
            if (mouseIsPressed) {
                this.r = 155;
                this.b = 80;
                this.g = 63;
                this.sound.play();
                if (this.sound.isPlaying() == false) {
                    this.sound.play();
                }
            }
        }
        else {
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