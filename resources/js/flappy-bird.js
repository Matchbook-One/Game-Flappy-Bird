/** @namespace humhub */
humhub.module('flappy-bird', (module, requireModule, $) => {

  const event = requireModule('event')
  const gamecenter = new (requireModule('gamecenter'))()

  event.on('humhub:ready', () => {
    $('canvas').trigger('gameEnd')
  })

  /**
   * @typedef {object} Point
   * @property {number} x
   * @property {number} y
   *
   * @typedef {object} Size
   * @property {number} width
   * @property {number} height
   */

  /** @type {number} */
  const masterPipeDelay = 1.5
  /** @type {string} */
  const KEYCODE_SPACE = 'Space'

  /**
   * @typedef {object} Config
   * @property {number} wiggle
   * @property {number} rotation
   * @property {number} count
   * @property {number} jumpHeight
   * @property {number} jumpTime
   * @property {number} rd
   * @property {boolean} isStarted
   * @property {boolean} restartable
   * @property {boolean} counterShow
   * @property {boolean} isDead
   * @property {Point} start
   * @property {Size} dimension
   * @property {number} pipeDelay
   */
  const config = {
    ...module.config,
    wiggle: 18,
    count: 0,
    rotation: undefined,
    isStarted: false,
    jumpHeight: 120,
    jumpTime: 266,
    isDead: false,
    start: { x: undefined, y: undefined },
    dimension: { width: undefined, height: undefined },
    pipeDelay: masterPipeDelay,
    restartable: false,
    rd: 0,
    counterShow: false
  }

  /** @type {createjs.Stage} */
  let stage
  /** @type {createjs.LoadQueue} */
  let loader
  /** @type {createjs.Sprite} */
  let bird
  /** @type {createjs.Shape} */
  let ground
  /** @type {createjs.Container} */
  let pipes
  /** @type {createjs.Text} */
  let counter
  /** @type {createjs.Text} */
  let highScore
  /** @type {createjs.Bitmap} */
  let start
  /** @type {createjs.Bitmap} */
  let share
  /** @type {createjs.Bitmap} */
  let score


  /**
   *
   */
  function init() {
    document.onkeydown = handleKeyDown
    /** @type {JQuery<HTMLCanvasElement>} */
    const canvas = $('#game')[0]
    stage = new createjs.Stage(canvas)
    createjs.Touch.enable(stage)
    config.dimension.width = stage.canvas.width
    config.dimension.height = stage.canvas.height
    const manifest = [
      ...['bird', 'background', 'ground', 'pipe', 'start', 'score', 'share'].map(pngAsset)
      /*,
       { src: "fonts/FB.eot" },
       { src: "fonts/FB.svg" },
       { src: "fonts/FB.ttf" },
       { src: "fonts/FB.woff" }*/
    ]
    loader = new createjs.LoadQueue(false)
    loader.addEventListener('complete', handleComplete)
    loader.loadManifest(manifest)
  }

  function handleComplete() {
    stage.addChild(createBackground())
    ground = createGround()
    bird = createBird()
    stage.addChild(createFill())

    pipes = new createjs.Container()
    stage.addChild(pipes)
    stage.addChild(bird, ground)
    stage.addEventListener('stagemousedown', handleJumpStart)

    stage.addChild(createFill(false))

    counter = createText(config.count, false, '#000000', 1, '86px')
    highScore = createText(config.highscore, false, '#000000', 0, '60px')
    stage.addChild(counter)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.interval = 100
    createjs.Ticker.addEventListener('tick', tick)
  }

  /**
   *
   * @param {?Event} event
   * @returns {boolean}
   */
  function handleKeyDown(event) {
    event = event || window.event
    if (event.code === KEYCODE_SPACE) {
      spacebar()
      return false
    }
  }

  /**
   * @returns {boolean}
   */
  function spacebar() {
    handleJumpStart()
    if (config.isDead && config.restartable) {
      restart()
      config.restartable = false
    }
    return false
  }

  function handleJumpStart() {
    if (!config.isDead) {
      createjs.Tween.removeTweens(bird)
      bird.gotoAndPlay('fly')
      if (bird.y < -200) {
        bird.y = -200
      }
      if (bird.rotation < 0) {
        config.rotation = (-bird.rotation - 20) / 5
      } else {
        config.rotation = (bird.rotation + 20) / 5
      }
      createjs.Tween
              .get(bird)
              .to({ y: bird.y - config.rotation, rotation: -20 }, config.rotation, createjs.Ease.linear)
              .to({ y: bird.y - config.jumpHeight, rotation: -20 }, config.jumpTime - config.rotation, createjs.Ease.quadOut)
              .to({ y: bird.y }, config.jumpTime, createjs.Ease.quadIn)
              .to({ y: bird.y + 200, rotation: 90 }, (380) / 1.5, createjs.Ease.linear)
              .call(diveBird)
              .to({ y: ground.y - 30 }, (config.dimension.height - (bird.y + 200)) / 1.5, createjs.Ease.linear)
      if (!config.isStarted) {
        config.isStarted = true
        config.counterShow = true
        bird.framerate = 60
        gamecenter.startGame(module.id)
                  .then((res) => console.log(res))
                  .catch((e) => {
                    console.error(e)
                    module.log.error(e, undefined, true)
                  })
      }
    }
  }

  function diveBird() {
    bird.gotoAndPlay('dive')
  }

  function restart() {
    $('canvas').trigger('gameRestart')
    config.count = 0
    pipes.removeAllChildren()
    createjs.Tween
            .get(start)
            .to({ y: start.y + 10 }, 50)
            .call(removeStart)

    counter.text = `${config.count}`
    counter.alpha = 0
    counter.font = '86px \'Flappy Bird\''
    counter.y = 150
    config.counterShow = false

    highScore.alpha = 0
    config.pipeDelay = masterPipeDelay
    config.isDead = false
    config.isStarted = false
    createjs.Tween.removeTweens(bird)
    bird.x = config.start.x
    bird.y = config.start.y
    bird.rotation = 0
    config.rd = 0
    createjs.Tween
            .get(bird, { loop: -1 })
            .to({ y: config.start.y + config.wiggle }, 380, createjs.Ease.sineInOut)
            .to({ y: config.start.y }, 380, createjs.Ease.sineInOut)
  }

  function die() {
    $('canvas').trigger('gameEnd')
    submitScore()

    config.isDead = true
    bird.gotoAndPlay('dive')

    if (config.count > config.highscore) {
      config.highscore = config.count
    }
    highScore.text = config.highscore
    createjs.Tween.removeTweens(bird)
    createjs.Tween
            .get(bird)
            .wait(0)
            .to({ y: bird.y + 200, rotation: 90 }, (380) / 1.5, createjs.Ease.linear)
            .call(diveBird)
            .to({ y: ground.y - 30 }, (config.dimension.height - (bird.y + 200)) / 1.5, createjs.Ease.linear)
    createjs.Tween
            .get(stage)
            .to({ alpha: 0 }, 100)
            .to({ alpha: 1 }, 100)
    score = addImageAtCenter('score', 0, -150)
    start = addImageAtCenter('start', -120, 50)
    share = addImageAtCenter('share', 120, 50)
    stage.removeChild(counter)
    stage.addChild(score)
    stage.addChild(start)
    stage.addChild(share)
    counter.y = counter.y + 160
    counter.font = '60px \'Flappy Bird\''
    counter.alpha = 0
    highScore.y = counter.y + 80
    stage.addChild(counter, highScore)
    dropIn(score)
    dropIn(start)
    dropIn(counter)
    dropIn(highScore)
    createjs.Tween
            .get(share)
            .to({ alpha: 1, y: share.y + 50 }, 400, createjs.Ease.sineIn)
            .call(addClickToStart)
  }

  /**
   * @param {createjs.DisplayObject} item
   */
  function dropIn(item) {
    createjs.Tween
            .get(item)
            .to({ alpha: 1, y: item.y + 50 }, 400, createjs.Ease.sineIn)
  }

  /**
   * @todo Replace with humhub share
   */
  function goShare() {
    const countText = config.count === 1
      ? '1 point'
      : `${config.count} points`
    const text = `I scored ${countText} in Flappy Bird.`
    gamecenter.share(module.id, text)
              .then(r => console.log('ok', r))
              .catch(e => console.error(e))
  }

  /**
   *
   * @param index
   * @returns {createjs.Bitmap}
   */
  function getPipeAt(index) {
    return pipes.getChildAt(index)
  }

  /**
   * @param {createjs.Event} event
   * @returns {void}
   */
  function tick(event) {
    const deltaS = event.delta / 1000
    const l = pipes.numChildren

    if (bird.y > (ground.y - 40)) {
      if (!config.isDead) {
        die()
      }
      if (bird.y > (ground.y - 30)) {
        createjs.Tween.removeTweens(bird)
      }
    }

    if (!config.isDead) {
      ground.x = (ground.x - deltaS * 300) % ground.tileW
    }

    if (config.isStarted && !config.isDead) {
      config.rd = config.rd + deltaS
      if (config.pipeDelay < 0) {
        createPipePair(ground.y)
          .map(pipe => pipes.addChild(pipe))

        config.pipeDelay = masterPipeDelay
      } else {
        config.pipeDelay -= deltaS
      }

      for (let i = 0; i < l; i++) {
        const pipe = getPipeAt(i)
        const collision = ndgmr.checkRectCollision(pipe, bird, 1, true)
        if (collision) {
          if (collision.width > 8 && collision.height > 8) {
            die()
          }
        }
        pipe.x = (pipe.x - deltaS * 300)
        if (pipe.x <= 338 && pipe.rotation === 0 && pipe.name !== 'counted') {
          pipe.name = 'counted'
          config.count += 1
          counter.text = `${config.count}`
        }
        if (pipe.x + pipe.image.width <= -pipe.y) {
          pipes.removeChild(pipe)
        }
      }
      if (config.counterShow) {
        counter.alpha = 1
        config.counterShow = false
      }
    }
    stage.update(event)
  }

  function submitScore() {
    gamecenter.endGame(module.id)
    gamecenter.submitScore(module.id, config.count)
              .then((res) => console.log(res))
              .catch((e) => {
                console.error(e)
                module.log.error(e, undefined, true)
              })
  }

  function removeStart() {
    stage.removeChild(start)
    stage.removeChild(share)
    stage.removeChild(score)
  }

  function addClickToStart() {
    start.addEventListener('click', restart)
    share.addEventListener('click', goShare)
    config.restartable = true
  }

  /**
   *
   * @param {string} id
   * @returns {{src: string, id: string}}
   */
  function pngAsset(id) {
    return { src: `${config.assetUrl}/${id}.png`, id }
  }

  /**
   * @returns {createjs.Shape}
   */
  function createBackground() {
    const image = loader.getResult('background')
    const background = new createjs.Shape()
    background.graphics
              .beginBitmapFill(image)
              .drawRect(0, 0, config.dimension.width, config.dimension.height)

    return background
  }

  /**
   * @returns {createjs.Shape}
   */
  function createGround() {
    const image = loader.getResult('ground')
    const ground = new createjs.Shape()
    ground.graphics.beginBitmapFill(image)
          .drawRect(0, 0, config.dimension.width + image.width, image.height)
    ground.tileW = image.width
    ground.y = config.dimension.height - image.height

    return ground
  }

  /**
   * @returns {createjs.Sprite}
   */
  function createBird() {
    const spriteConfig = {
      images: [loader.getResult('bird')],
      frames: {
        width: 92,
        height: 64,
        regX: 46,
        regY: 32,
        count: 3
      },
      animations: {
        fly: [0, 2, 'fly', 0.21],
        dive: [1, 1, 'dive', 1]
      }
    }
    const data = new createjs.SpriteSheet(spriteConfig)
    config.start.x = (config.dimension.width - spriteConfig.frames.width) / 2
    config.start.y = config.dimension.height / 2


    const bird = new createjs.Sprite(data, 'fly')
    bird.setTransform(config.start.x, config.start.y, 1, 1)
    bird.framerate = 30
    createjs.Tween
            .get(bird, { loop: -1 })
            .to({ y: config.start.y + config.wiggle }, 380, createjs.Ease.sineInOut)
            .to({ y: config.start.y }, 380, createjs.Ease.sineInOut)

    return bird
  }

  /**
   * @param {boolean} isTop
   * @returns {createjs.Shape}
   */
  function createFill(isTop = true) {
    const graphic = new createjs.Graphics()
    const color = isTop ? '#70c5ce' : '#ded895'
    const y = isTop ? 0 : config.dimension.height
    graphic.beginFill(color)
           .rect(0, y, config.dimension.width, 0)

    return new createjs.Shape(graphic)
  }

  /**
   * @param {number} ground
   * @returns {createjs.Bitmap[]}
   */
  function createPipePair(ground) {
    const image = loader.getResult('pipe')

    const gap = 250
    const x = config.dimension.width + 600
    const y = (ground - gap * 2) * Math.random() + gap * 1.5

    const pipe1 = new createjs.Bitmap(image)
    pipe1.x = x
    pipe1.y = y

    const pipe2 = new createjs.Bitmap(image)
    pipe2.scaleX = -1
    pipe2.rotation = 180
    pipe2.x = x
    pipe2.y = y - gap

    return [pipe1, pipe2]
  }

  /**
   * @param {string} id
   * @param {number} xOffset
   * @param {number} yOffset
   * @returns {createjs.Bitmap}
   */
  function addImageAtCenter(id, xOffset, yOffset) {
    const image = loader.getResult(id)
    const bitmap = new createjs.Bitmap(image)
    bitmap.alpha = 0
    bitmap.x = config.dimension.width / 2 - bitmap.image.width / 2 + xOffset
    bitmap.y = config.dimension.height / 2 - bitmap.image.height / 2 + yOffset

    return bitmap
  }

  /**
   * @param {string} str
   * @param {boolean} isOutline
   * @param {string} color
   * @param {number} alpha
   * @param {string} fontSize
   * @returns {createjs.Text}
   */
  function createText(str, isOutline, color, alpha, fontSize) {
    const text = new createjs.Text(str, `${fontSize} 'Flappy Bird'`, color)
    if (isOutline) {
      text.outline = 5
    }
    text.color = color
    text.textAlign = 'center'
    text.x = config.dimension.width / 2
    text.y = 150
    text.alpha = alpha
    return text
  }

  module.export({ init })
})
