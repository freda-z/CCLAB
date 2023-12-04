let RING_WIDTH = 50;

let soundFiles = [
    "sound-assets/calm-corner/crickets.mp3",
    "sound-assets/calm-corner/beach-waves.mp3",
    "sound-assets/calm-corner/soft-rain.mp3",
    "sound-assets/calm-corner/daylight.mp3",
    "sound-assets/calm-corner/relaxing-guitar.mp3",
    "sound-assets/calm-corner/soft-ambient-atmosphere.mp3",
];

let sounds = [];
let buttons = [];
let img;
let bg;
let dancer;
let dogimg;

// Visualization variables
let visualizations = [];

function preload() {
    img = loadImage("img/cloud.png");
    bg = loadImage("img/ccb.png");
    dogimg = loadImage("img/sleepingdog.png");
    for (let i = 0; i < soundFiles.length; i++) {
        sounds.push(loadSound(soundFiles[i]));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bx = windowWidth / 2;
    by = windowHeight / 2 + 85;

    for (let i = 0; i < sounds.length; i++) {
        let rad = 300 - i * RING_WIDTH;
        buttons.push(new Button(bx, by, rad, sounds[i]));
    }


    visualizations.push(new SineWaveVisualization(bx - 666, by - 283));
    visualizations.push(new SineWaveVisualization(bx - 550, by - 190));
    visualizations.push(new SineWaveVisualization(bx - 380, by - 260));
    visualizations.push(new SineWaveVisualization(bx + 290, by - 270));
    visualizations.push(new SineWaveVisualization(bx + 500, by - 160));
    visualizations.push(new SineWaveVisualization(bx + 650, by - 80));


    noCursor();

    dancer = new DoggDancer(bx + 300, by + 100);

}

function draw() {
    background(bg);

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.checkMouse();
        b.display();
        visualizations[i].update();
    }

    push();
    imageMode(CENTER);
    image(img, mouseX, mouseY, 50, 50);
    pop();

    // //con
    // push();
    // let txt = (mouseX - bx) + "," + (mouseY - by);
    // fill(255);
    // text(txt, mouseX, mouseY);
    // console.log(txt);
    // pop();

    //dog
    dancer.update();
    dancer.display();
}



class SineWaveVisualization {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frequency = 0.02;
        this.amplitude = new p5.Amplitude();
    }

    update() {
        let level = this.amplitude.getLevel();
        let waveHeight = map(level, 0, 1, 10, 30);

        push();
        translate(this.x, this.y);

        for (let i = 0; i < 360; i += 10) {
            let angle = radians(i);
            let waveY = sin(angle + frameCount * this.frequency) * waveHeight;
            stroke(255);
            strokeWeight(5);
            line(0, 0, waveY, waveY);
            line(0, 0, -waveY, waveY);
        }
        pop();
    }
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

        strokeWeight(0.3);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2, this.rad * 2);

        pop();
    }
}

//dog
class DoggDancer {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
    }
    update() {
        this.offsetx = 0;
        this.offsety = (sin(frameCount * 0.01) * 10);
    }
    display() {

        push();
        translate(this.x + this.offsetx, this.y + this.offsety);

        this.drawDog();
    }
    drawDog() {
        image(dogimg, 0, 0, 300, 150)
    }
}
