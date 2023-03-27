// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

class Bird {
    constructor() {
      this.y = height / 2;
      this.x = 64;

      this.gravity = 0.6;
      this.lift = -10;
      this.velocity = 0;

      //this.icon = birdSprite;

      this.width = 64;
      this.height = 64;
    }

    show() {
      // draw the icon CENTERED around the X and Y coords of the bird object
      //image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    up() {
      this.velocity = this.lift;
    }

    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;

      if (this.y >= height - this.height / 2) {
        this.y = height - this.height / 2;
        this.velocity = 0;
      }

      if (this.y <= this.height / 2) {
        this.y = this.height / 2;
        this.velocity = 0;
      }
    }
  }

class Pipe {
    constructor() {
      this.spacing = 125;
      this.top = random(height / 6, 3 / 4 * height);
      this.bottom = this.top + this.spacing;

      this.x = width;
      this.w = 80;
      this.speed = 3;

      this.passed = false;
      this.highlight = false;
    }

    hits(bird) {
      let halfBirdHeight = bird.height / 2;
      let halfBirdwidth = bird.width / 2;
      if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
        //if this.w is huge, then we need different collision model
        if (bird.x + halfBirdwidth > this.x && bird.x - halfBirdwidth < this.x + this.w) {
          this.highlight = true;
          this.passed = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    }

    //this function is used to calculate scores and checks if we've went through the pipes
    pass(bird) {
      if (bird.x > this.x && !this.passed) {
        this.passed = true;
        return true;
      }
      return false;
    }

    drawHalf() {
      let howManyNedeed = 0;
      //let peakRatio = pipePeakSprite.height / pipePeakSprite.width;
      let peakRatio = 6
      //let bodyRatio = pipeBodySprite.height / pipeBodySprite.width;
      let bodyRatio = 8
      //this way we calculate, how many tubes we can fit without stretching
      howManyNedeed = Math.round(height / (this.w * bodyRatio));
      //this <= and start from 1 is just my HACK xD But it's working
      for (let i = 0; i < howManyNedeed; ++i) {
        let offset = this.w * (i * bodyRatio + peakRatio);
        //image(pipeBodySprite, -this.w / 2, offset, this.w, this.w * bodyRatio);
        rect(-this.w / 2, offset, this.w, this.w * bodyRatio);
      }
      rect(-this.w / 2, 0, this.w, this.w * peakRatio);
    }

    show() {
      push();
      translate(this.x + this.w / 2, this.bottom);
      this.drawHalf();
      translate(0, -this.spacing);
      rotate(PI);
      this.drawHalf();
      pop();
    }

    update() {
      this.x -= this.speed;
    }

    offscreen() {
      return (this.x < -this.w);
    }
  }

var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;

/*
function preload() {
  pipeBodySprite = loadImage('assets/pipe_marshmallow_fix.png');
  pipePeakSprite = loadImage('pipe_marshmallow_fix.png');
  birdSprite = loadImage('train.png');
  bgImg = loadImage('background.png');
}
*/
function setup() {
  createCanvas(800, 600);
  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  //image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  /*
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }
*/
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  // touches is an list that contains the positions of all
  // current touch points positions and IDs
  // here we check if touches' length is bigger than one
  // and set it to the touched var
  touched = (touches.length > 0);

  // if user has touched then make bird jump
  // also checks if not touched before
  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}

function touchStarted() {
  if (isOver) reset();
}

