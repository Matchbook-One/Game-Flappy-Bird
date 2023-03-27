// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY
//
// Class is exported (eslint flag)
// exported Bird 


import P5 from 'p5'

export class Bird {
  private readonly _x: number = 64
  private readonly lift: number = -10
  private velocity: number = 0
  private readonly gravity: number = 0.6
  private readonly _width: number = 64
  private readonly _height: number = 64

  constructor(private readonly p5: P5, private readonly icon: P5.Image) {
    this._y = p5.height / 2
    this._x = 64

    this.gravity = 0.6
    this.lift = -10
    this.velocity = 0
  }

  private _y: number

  get y(): number {
    return this._y
  }

  get x(): number {
    return this._x
  }

  get height(): number {
    return this._height
  }

  get width(): number {
    return this._width
  }

  show(): void {
    // draw the icon CENTERED around the X and Y coords of the bird object
    this.p5.image(this.icon, this._x - this.width / 2, this._y - this.height / 2, this.width, this.height)
  }

  up() {
    this.velocity = this.lift
  }

  update() {
    this.velocity += this.gravity
    this._y += this.velocity

    if (this._y >= this.p5.height - this.height / 2) {
      this._y = this.p5.height - this.height / 2
      this.velocity = 0
    }

    if (this._y <= this.height / 2) {
      this._y = this.height / 2
      this.velocity = 0
    }
  }
}
