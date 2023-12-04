let NUM_OF_BUTTONS = 1;
let sounds = ["baby", "birds", "cartoon", "cheering", "chipmunk", "cow", "toy", "horse"];
let buttons = [];
let img;
let bg;

let dogImg1, dogImg2, dogImg3, dogImg4, dogImg5, dogImg6, dogImg7, dogImg8, dogImg9;
let dogs = [];


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

    //dogs
    dogImg1 = loadImage("img/d1.png")
    dogImg2 = loadImage("img/d2.png")
    dogImg3 = loadImage("img/d3.png")
    dogImg4 = loadImage("img/d4.png")
    dogImg5 = loadImage("img/d5.png")
    dogImg6 = loadImage("img/d6.png")
    dogImg7 = loadImage("img/d7.png")
    dogImg8 = loadImage("img/d8.png")
    dogImg9 = loadImage("img/d9.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

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

    dogs.push(new Dog(bx - 370, by - 2, 200, dogImg1, 10, 0));
    dogs.push(new Dog(bx - 550, by - 195, 100, dogImg2, 0, 5));
    dogs.push(new Dog(bx - 88, by - 30, 100, dogImg3, 0, 9));
    dogs.push(new Dog(bx + 50, by - 6, 130, dogImg4, 2, 0));
    dogs.push(new Dog(bx + 200, by - 32, 100, dogImg5, 0, 7));
    dogs.push(new Dog(bx - 630, by - 24, 90, dogImg6, 11, 2));
    dogs.push(new Dog(bx + 590, by - 170, 100, dogImg7, 0, 10));
    dogs.push(new Dog(bx + 230, by + 330, 150, dogImg8, 5, 1));
    dogs.push(new Dog(bx - 330, by + 270, 100, dogImg9, 1, 3));
}

function draw() {
    background(bg);

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.checkMouse();
        b.display();
    }

    for (let i = 0; i < dogs.length; i++) {
        let dog = dogs[i];
        // add more actions
        dog.update();
        dog.display();
    }

    // ball image
    push();
    imageMode(CENTER);
    image(img, mouseX, mouseY, 50, 50);
    pop();

    //con
    // push();
    // let txt = (mouseX - bx) + "," + (mouseY - by);
    // fill(255);
    // text(txt, mouseX, mouseY);
    // console.log(txt);
    // pop();
}

class Dog {
    constructor(x, y, size, img, jmpx, jmpy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = img;
        this.jmpx = jmpx
        this.jmpy = jmpy

    }
    update() {


        this.offsetx = (sin(frameCount * this.jmpx) * 10);
        this.offsety = (cos(frameCount * this.jmpy) * 10);
    }
    display() {
        push();
        translate(this.x + this.offsetx, this.y + this.offsety);
        imageMode(CENTER);
        image(this.img, 0, 0, this.size, this.size);
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
        this.sR = random(255);
        this.sG = random(255);
        this.sB = random(255);

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
        strokeWeight(8);
        stroke(this.sR, this.sG, this.sB);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2, this.rad * 2);

        pop();

    }
}