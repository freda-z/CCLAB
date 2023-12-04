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

// Visualization variables
let amplitude;
let frequency = 0.02;
let yOffset;

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

    amplitude = new p5.Amplitude();

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

    // Visualize audio using sine waves
    visualizeAudio();

    push();
    imageMode(CENTER);
    image(img, mouseX, mouseY, 50, 50);
    pop();

    push();
    let txt = mouseX + "," + mouseY;
    fill(255)
    text(txt, mouseX, mouseY);
    console.log(txt);
    pop();
}

function visualizeAudio() {
    let level = amplitude.getLevel();
    let waveHeight = map(level, 0, 1, 1, 200);

    push();
    translate(width / 2, height / 2);

    for (let i = 0; i < 360; i += 10) {
        let angle = radians(i);
        let y = sin(angle + frameCount * frequency) * waveHeight;
        stroke(0);
        strokeWeight(5);
        line(1000 - 650, 675 - 400, y + (1000 - 650), y + (675 - 400));
    }

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
                if (!this.sound.isPlaying()) {
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

        strokeWeight(0.5);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2, this.rad * 2);

        pop();
    }
}
