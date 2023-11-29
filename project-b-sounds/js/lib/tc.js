let NUM_OF_BUTTONS = 1;
let sounds = ["ambulance", "blender", "car", "clock", "doorbell", "fireworks", "rain", "security", "thunder", "train", "vacuum"];
let buttons = [];
let img


function preload() {
    ambulance = loadSound("sound-assets/training-center/ambulance-siren.mp3");
    blender = loadSound("sound-assets/training-center/blender.mp3");
    car = loadSound("sound-assets/training-center/car-horn.mp3");
    clock = loadSound("sound-assets/training-center/clock-alarm.mp3");
    doorbell = loadSound("sound-assets/training-center/doorbell.mp3");
    fireworks = loadSound("sound-assets/training-center/fireworks.mp3");
    rain = loadSound("sound-assets/training-center/heavy-rain.mp3")
    security = loadSound("sound-assets/training-center/security-alarm.mp3")
    thunder = loadSound("sound-assets/training-center/thunder.mp3")
    train = loadSound("sound-assets/training-center/train.mp3")
    vacuum = loadSound("sound-assets/training-center/vacuum.mp3")
    img = loadImage("img/bone.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bx = windowWidth / 2
    by = windowHeight / 2

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        buttons.push(new Button(bx - 250, by, 75, ambulance));
        buttons.push(new Button(bx, by, 100, blender));
        buttons.push(new Button(bx + 250, by, 75, car));

        buttons.push(new Button(bx - 250, by - 200, 50, clock));
        buttons.push(new Button(bx, by - 200, 50, doorbell));
        buttons.push(new Button(bx + 250, by - 200, 100, fireworks));

        buttons.push(new Button(bx - 250, by + 200, 100, rain));
        buttons.push(new Button(bx, by + 200, 50, security));
        buttons.push(new Button(bx + 250, by + 200, 50, thunder));
        // buttons.push(new Button(bx + 400, by, 50, train));
        // buttons.push(new Button(bx + 500, by, 50, vacuum));
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
    image(img, mouseX, mouseY, 100, 100);
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