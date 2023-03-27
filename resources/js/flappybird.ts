// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY
//
// P5 exported functions (eslint flags)
// exported preload, setup, draw, keyPressed
//
// Exported sprites (eslint flags)
// exported birdSprite, pipeBodySprite, pipePeakSprite

import P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import { Bird } from './bird'
import { Pipe } from './pipe'

const sketch = (p5: P5) => {

  let bird: Bird
  let pipes: Pipe[]
  const parallax = 0.8
  let score = 0
  let maxScore = 0
  let birdSprite: P5.Image
  let pipeBodySprite: P5.Image
  let pipePeakSprite: P5.Image
  let bgImg: P5.Image
  let bgX: number
  let gameoverFrame = 0
  let isOver = false

  let touched = false
  let prevTouched = false

  p5.preload = () => {
    pipeBodySprite = p5.loadImage('graphics/pipe_marshmallow_fix.png')
    pipePeakSprite = p5.loadImage('graphics/pipe_marshmallow_fix.png')
    birdSprite = p5.loadImage('graphics/train.png')
    bgImg = p5.loadImage('graphics/background.png')
  }

  p5.setup = () => {
    p5.createCanvas(800, 600)
    reset()
  }

  p5.draw = () => {
    p5.background(0)
    // Draw our background image, then move it at the same speed as the pipes
    p5.image(bgImg, bgX, 0, bgImg.width, p5.height)
    bgX -= pipes[0].speed * parallax

    // this handles the "infinite loop" by checking if the right
    // edge of the image would be on the screen, if it is draw a
    // second copy of the image right next to it
    // once the second image gets to the 0 point, we can reset bgX to
    // 0 and go back to drawing just one image.
    if (bgX <= -bgImg.width + p5.width) {
      p5.image(bgImg, bgX + bgImg.width, 0, bgImg.width, p5.height)
      if (bgX <= -bgImg.width) {
        bgX = 0
      }
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update()
      pipes[i].show()

      if (pipes[i].pass(bird)) {
        score++
      }

      if (pipes[i].hits(bird)) {
        gameover()
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1)
      }
    }

    bird.update()
    bird.show()

    if ((p5.frameCount - gameoverFrame) % 150 == 0) {
      pipes.push(new Pipe(p5, pipeBodySprite, pipePeakSprite))
    }

    showScores()

    // touches is an list that contains the positions of all
    // current touch points positions and IDs
    // here we check if touches' length is bigger than one
    // and set it to the touched var
    touched = (p5.touches.length > 0)

    // if user has touched then make bird jump
    // also checks if not touched before
    if (touched && !prevTouched) {
      bird.up()
    }

    // updates prevTouched
    prevTouched = touched


  }

  function showScores() {
    p5.textSize(32)
    p5.text('score: ' + score, 1, 32)
    p5.text('record: ' + maxScore, 1, 64)
  }

  function gameover() {
    p5.textSize(64)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text('GAMEOVER', p5.width / 2, p5.height / 2)
    p5.textAlign(p5.LEFT, p5.BASELINE)
    maxScore = p5.max(score, maxScore)
    isOver = true
    p5.noLoop()
  }

  function reset() {
    isOver = false
    score = 0
    bgX = 0
    pipes = []
    bird = new Bird(p5, birdSprite)
    pipes.push(new Pipe(p5, pipeBodySprite, pipePeakSprite))
    gameoverFrame = p5.frameCount - 1
    p5.loop()
  }

  p5.keyPressed = () => {
    if (p5.key === ' ') {
      bird.up()
      if (isOver) reset() //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
    }
  }

  p5.touchStarted = () => {
    if (isOver) reset()
  }
}

new P5(sketch)
