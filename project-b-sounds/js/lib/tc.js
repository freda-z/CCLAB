let NUM_OF_BUTTONS = 1;
let sounds = ["ambulance", "blender", "car", "clock", "doorbell", "fireworks", "rain", "security", "thunder", "train", "vacuum"];
let buttons = [];
let img;
let bg;

//dog
let dancer;
let dogimg;

//icons
let icons = [
    "imgambulance", "imgblender", "imgcar", "imgclock", "imgdoorbell", "imgfireworks", "imgrain", "imgsecurity", "imgthunder"];

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
    bg = loadImage("img/tcb.png")

    //dog
    dogimg = loadImage("img/dog.png")

    //icons
    imgdoorbell = loadImage("img/bell.png")
    imgambulance = loadImage("img/ambulance.png")
    imgblender = loadImage("img/blender.png")
    imgcar = loadImage("img/car.png")
    imgclock = loadImage("img/clock.png")
    imgfirework = loadImage("img/firework.png")
    imgrain = loadImage("img/rain.png")
    imgsecurity = loadImage("img/alarm.png")
    imgthunder = loadImage("img/thunder.png")


}

function setup() {
    createCanvas(windowWidth, windowHeight);



    bx = windowWidth / 2
    by = windowHeight / 2

    for (let i = 0; i < NUM_OF_BUTTONS; i++) {
        buttons.push(new Button(bx - 600, by + 100, 75, ambulance, imgambulance));
        buttons.push(new Button(bx - 350, by + 100, 75, blender, imgblender));
        buttons.push(new Button(bx - 100, by + 100, 75, car, imgcar));

        buttons.push(new Button(bx - 600, by - 100, 75, clock, imgclock));
        buttons.push(new Button(bx - 350, by - 100, 75, doorbell, imgdoorbell));
        buttons.push(new Button(bx - 100, by - 100, 75, fireworks, imgfirework));

        buttons.push(new Button(bx - 600, by + 300, 75, rain, imgrain));
        buttons.push(new Button(bx - 350, by + 300, 75, security, imgsecurity));
        buttons.push(new Button(bx - 100, by + 300, 75, thunder, imgthunder));


        // buttons.push(new Button(bx + 400, by, 50, train));
        // buttons.push(new Button(bx + 500, by, 50, vacuum));
    }
    noCursor();
    dancer = new DoggDancer(bx + 450, by + 100);



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
    image(img, mouseX, mouseY, 100, 100);
    pop();

    //banner
    push();
    textSize(40);
    textAlign(CENTER);

    //dog
    dancer.update();
    dancer.display();


}

class Button {
    constructor(x, y, rad, sound, icon) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.sound = sound;
        this.icon = icon;
        // color
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.sR = random(200, 255);
        this.sG = random(200, 255);
        this.sB = random(200, 255);
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
        translate(this.x, this.y);
        strokeWeight(8);
        stroke(this.sR, this.sG, this.sB);
        fill(this.r, this.g, this.b);
        ellipse(0, 0, this.rad * 2, this.rad * 2);
        // imageMode(CENTER);
        image(this.icon, -15, -15, 100, 100);
        // image(this.icon, -15, -15);
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
        this.offsetx = (sin(frameCount * 0.05) * 250);
        this.offsety = -abs(sin(frameCount * 0.12) * 120);
    }
    display() {
        push();
        translate(this.x + this.offsetx, this.y + this.offsety);
        scale(-1, 1);
        image(dogimg, 0, 0, 200, 200)
        pop();
    }
}


//animations
