// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY
//
// Pipe is exported (eslint flags)
// exported Pipe

import P5 from 'p5'
import { Bird } from './bird'

export class Pipe {

  private readonly spacing: number = 125
  private readonly top: number
  private readonly bottom: number
  private readonly w: number = 80
  private readonly _speed: number = 5

  private x: number
  private passed: boolean
  private highlight: boolean

  constructor(
    private readonly p5: P5,
    private readonly body: P5.Image,
    private readonly peak: P5.Image
  ) {
    this.top = p5.random(p5.height / 6, 3 / 4 * p5.height)
    this.bottom = this.top + this.spacing

    this.x = p5.width

    this.passed = false
    this.highlight = false
  }

  get speed(): number {
    return this._speed
  }

  hits(bird: Bird) {
    let halfBirdHeight = bird.height / 2
    let halfBirdwidth = bird.width / 2
    if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
      //if this.w is huge, then we need different collision model
      if (bird.x + halfBirdwidth > this.x && bird.x - halfBirdwidth < this.x + this.w) {
        this.highlight = true
        this.passed = true
        return true
      }
    }
    this.highlight = false
    return false
  }

  //this function is used to calculate scores and checks if we've went through the pipes
  pass(bird: Bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true
      return true
    }
    return false
  }

  drawHalf() {
    let howManyNedeed = 0
    let peakRatio = this.peak.height / this.peak.width
    let bodyRatio = this.body.height / this.body.width
    //this way we calculate, how many tubes we can fit without stretching
    howManyNedeed = Math.round(this.p5.height / (this.w * bodyRatio))
    //this <= and start from 1 is just my HACK xD But it's working
    for (let i = 0; i < howManyNedeed; ++i) {
      let offset = this.w * (i * bodyRatio + peakRatio)
      this.p5.image(this.body, -this.w / 2, offset, this.w, this.w * bodyRatio)
    }
    this.p5.image(this.peak, -this.w / 2, 0, this.w, this.w * peakRatio)
  }

  show() {
    this.p5.push()
    this.p5.translate(this.x + this.w / 2, this.bottom)
    this.drawHalf()
    this.p5.translate(0, -this.spacing)
    this.p5.rotate(this.p5.PI)
    this.drawHalf()
    this.p5.pop()
  }

  update() {
    this.x -= this.speed
  }

  offscreen() {
    return (this.x < -this.w)
  }
}
