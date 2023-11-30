let NUM_OF_BUTTONS = 1;
let sounds = ["daylight", "beachwaves", "crickets", "guitar", "hope", "rain"];
let buttons = [];
let img;


function preload() {
    daylight = loadSound("sound-assets/calm-corner/daylight.mp3");
    beachwaves = loadSound("sound-assets/calm-corner/beach-waves.mp3");
    crickets = loadSound("sound-assets/calm-corner/crickets.mp3");
    guitar = loadSound("sound-assets/calm-corner/relaxing-guitar.mp3");
    hope = loadSound("sound-assets/calm-corner/soft-ambient-atmosphere.mp3");
    rain = loadSound("sound-assets/calm-corner/soft-rain.mp3")
    img = loadImage("img/cloud.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bx = windowWidth / 2
    by = windowHeight / 2

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        buttons.push(new Button(bx, by, 300, daylight));
        buttons.push(new Button(bx, by, 250, beachwaves));
        buttons.push(new Button(bx, by, 200, crickets));
        buttons.push(new Button(bx, by, 150, guitar));
        buttons.push(new Button(bx, by, 100, hope));
        buttons.push(new Button(bx, by, 50, rain));

    }
    noCursor();
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
        if (distance < this.rad && distance > this.rad - 50) {
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