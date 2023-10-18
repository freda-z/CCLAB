let p; // graphics for petal

let x, y;
let angle = 0;
let dia;
let sequence = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(189, 240, 255);

    p = createGraphics(500, 500);
    drawPetalGraphics();
}

function draw() {
    if (sequence == 0) {
        //screen 1 - intro
        drawScreen1();
    } else if (sequence == 1) {
        //screen 2 - welcome to vileplume's world
        drawScreen2();
    } else if (sequence == 2) {
        drawScreen3();
    }
}

function drawScreen1() {
    background(0, 0, 0);

    pokeball(windowWidth / 2, windowHeight / 2 + 50);
    //loading
    loading(20, 20 - 0.001, 3, 33, 194);
    loading(10, 10 + 0.001, 242, 219, 10);
    loading(25, 15 - 0.001, 3, 33, 194);
    loading(30, 35 + 0.001, 242, 219, 10);

    push();
    textSize(30);
    textAlign(CENTER);
    fill(255, 255, 255);
    text(
        "Press 'SPACE' to open the Pokéball",
        windowWidth / 2,
        windowHeight - 600
    );
    pop();
}
function drawScreen2() {
    background(149, 154, 163);

    push();
    textSize(40);
    textAlign(CENTER);
    fill(255, 255, 255);
    textStyle();
    text("Drag your mouse around the screen to see Vileplume transform!", windowWidth / 2, windowHeight - 600);
    pop();

    push();
    stroke(33, 33, 194);
    strokeWeight(15);
    fill(242, 219, 10);
    textSize(70);
    textAlign(CENTER);
    textWrap(WORD);
    strokeJoin(ROUND);
    text(
        "Click around the screen to see Vileplume transform!",
        windowWidth / 2 - 250,
        windowHeight - 550,
        500
    );
    pop();

    push();
    stroke(33, 33, 194);
    textSize(20);
    textAlign(CENTER);
    text("Press 'SPACE' to advance", windowWidth / 2, windowHeight - 50);
    pop();
}

function drawScreen3() {
    background(189, 240, 255, 1);

    //environment
    //sun
    push();
    fill(245, 98, 7);
    noStroke();
    circle(0, 0, 300);
    for (let i = 0; i < 15; i++) {
        push();
        rotate(frameCount * 0.01);
        rotate(radians(72 * i));
        noStroke();
        fill(255, 157, 28);
        ellipse(0, 0, 300, 300 * 0.15);
        pop();
    }
    pop();

    //earth
    push();
    translate(width / 2, 900);
    rotate(frameCount * -0.1);
    noStroke();
    fill(random(151), random(242), random(133), 100);
    ellipse(10, 100, 290, 640);
    pop();

    //flowers
    flower(width / 2 - 250, height / 2 + 150, 90, 10);
    flower(width / 2 + 270, height / 2 + 175, 70, 1);
    flower(width / 2 + 300, height / 2 + 240, 30, 0.01);
    flower(width / 2 - 350, height / 2 + 280, 40, 20);

    // character
    vileplume(width / 2, height / 2 + 100);

    //interaction
    if (mouseIsPressed) {

        //petalgrowth(windowWidth / 2, windowWidth / 2);


        push();
        let distance = 100;
        x = mouseX + random(-1, 1) * distance;
        y = mouseY + random(-1, 1) * distance;
        dia = random(5, 130);

        let r = random(255);
        let g = random(255);
        let b = random(255);

        fill(r, g, b, 100);
        stroke(r, g, b);
        circle(x, y, dia * 0.1);
        pop();
    }
}

function vileplume(posX, posY) {
    //Vileplume's body
    //main body + legs + arms
    push();
    translate(posX, posY);

    translate(-350, -550); // QUICK FIX!

    push();
    strokeWeight(3);
    fill(100, 145, 190);
    rect(282, 450, 130, 200, 15);

    rect(375, 610, 50, 50, 8);
    rect(275, 610, 50, 50, 8);

    rect(260, 575, 30, 20, 4);
    rect(400, 575, 30, 20, 4);
    pop();

    //mouth
    push();
    fill(242, 133, 148);
    rect(360, 575, 10, 10);
    pop();

    //eyes
    push();
    strokeWeight(5);
    noFill();
    arc(340, 565, 20, 20, PI, 0);
    arc(380, 565, 20, 20, PI, 0);
    pop();

    pop();

    //petals
    drawPetal();

}

function drawPetal() {

    if (mouseIsPressed) {
        petalScale += 0.001;
        push();
        fill(255)
        noStroke();
        rect(width - 300, 50, 200, 30);
        textAlign(CENTER);
        textSize(20);
        fill(0, 0, 0);
        noStroke();
        text("restart", width - 200, 65);
        pop();

        if (petalScale > 1.4) {
            noLoop();

            // textAlign(CENTER);
            // textSize(20);
            // text("GAME OVER - Take a pic and restart", windowWidth/2,windowHeight-600);
            // console.log("OVER");


            // sequence == 0 
            //LA Office hr objectives 

            // game over when petal size reaches 1.4

            //Option 1
            // create a button for download a pic
            //saveCanvas('Vileplume', 'png');
            // create a button for reset from start

            //Option 2
            //automatically reset from start




        }




        let x = p.width / 2;
        let y = p.height / 2;

        // draw more rects!
        if (random(1) < 0.07) {
            p.stroke(200, 90, 90);
            p.rectMode(CENTER);
            p.fill(255, 255, 255, 200);
            p.rect(x + random(-150, -50), y + random(-35, 35), 15, 10, 10);
            p.rect(x + random(-150, -50), y + random(-35, 35), 10, 10, 10);
            p.rect(x + random(50, 150), y + random(-35, 35), 15, 10, 10);
            p.rect(x + random(50, 150), y + random(-35, 35), 10, 10, 10);
            p.rect(x + random(-45, 45), y + random(-80, 65), 15, 10, 10);
            p.rect(x + random(-45, 45), y + random(-80, 65), 10, 10, 10);

        }
    }



    let freq = frameCount * 0.15;
    let ampp = 15;
    let sinValue = sin(freq) * ampp;

    push();
    translate(width / 2, height / 2 + sinValue);
    scale(petalScale);
    imageMode(CENTER);
    image(p, 0, 0);
    pop();
}

let petalScale = 0.9;

function drawPetalGraphics() {
    let x = p.width / 2;
    let y = 250;

    p.push();

    //petal 1
    p.rectMode(CENTER);
    p.stroke(194, 135, 90);
    p.fill(200, 90, 90);
    p.rect(x + 90, y, 130, 80, 4);

    //petal 2
    p.stroke(194, 135, 90);
    p.fill(200, 90, 90);
    p.rect(x - 90, 250, 130, 80, 4);

    //petal 3
    p.stroke(194, 135, 90);
    p.fill(200, 90, 90);
    p.rect(x, y - 10, 100, 150, 4);

    p.pop();
}

function pokeball(px, py) {
    push();
    translate(px, py);

    strokeWeight(20);
    fill(255, 0, 0);
    circle(0, 0, 400);

    strokeWeight(20);
    fill(255, 255, 255);
    arc(0, 0, 400, 400, 0, PI);

    strokeWeight(15);
    stroke(0, 0, 0);
    line(-200, 0, 200, 0);

    strokeWeight(20);
    fill(255, 255, 255);
    circle(0, 0, 100);

    pop();
}

//flower(random(width),random(height),10,10)
function flower(x, y, size, speed) {
    push();
    noStroke();
    fill(189, 440, 255);
    circle(x, y, size * 0.5);
    pop();

    push();
    strokeWeight(3);
    stroke(102, 176, 70);
    line(x, y, x, y + 90);
    pop();

    for (let i = 0; i < 5; i++) {
        push();
        translate(x, y);
        rotate(frameCount * speed);
        rotate(radians(62 * i));
        noStroke();
        fill(random(255), random(255), random(255), 120);
        ellipse(0, 0, size, size * 0.15);
        pop();
    }
}

function loading(size, speedd, r, b, g) {
    push();
    translate(windowWidth / 2, windowHeight / 2 + 50);
    rotate(frameCount * speedd);
    noStroke();
    fill(r, b, g);
    ellipse(170, 170, size, size);
    pop();
}

// Event Listener from p5
//function for screens
function keyPressed() {
    if (key == " ") {
        sequence++;
        if (sequence == 2) {
            background(189, 240, 255);
        } else if (sequence > 2) {
            sequence = 0;
        }
    }
}

function mousePressed() {

    if (mouseX < width - 100 && mouseX > width - 300 && mouseY > 50 && mouseY > 80) {
        sequence = 0

    }


}
