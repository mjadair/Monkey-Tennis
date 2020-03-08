class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }


  preload() {
    this.load.image('banana', 'assets/fruit_banana.png')
    this.load.image('monkey', 'assets/TennisMonkey.png')
    this.load.image('tennisball', 'assets/tennisball.png')
    this.load.image('bananapeel', 'assets/banana_peel.png')
    this.load.audio('monkeyhitball', 'assets/Audio/BallOnRacket.mp3')
    this.load.audio('ballbouncing', 'assets/Audio/BallBounce2.mp3')
  }

  create() {

    this.monkeyHittingBall = this.sound.add('monkeyhitball')

    //  Sets boundaries for ceiling and walls, but disables the floor===============================================================================================
    this.physics.world.setBoundsCollision(true, true, true, false)

    // adds target bananas===============================================================================================
    this.bananas = this.physics.add.group()
    for (let yVal = 3; yVal < 8; yVal++) {
      for (let xVal = 2; xVal < (Math.floor(window.innerWidth / 51)); xVal++) {
        window.innerHeight < 1000 ?
          this.bananas.create(50 * xVal, 50 * yVal, 'banana').setScale(.1).setImmovable()
          :
          this.bananas.create(50 * xVal, 50 * yVal, 'banana').setScale(.15).setImmovable()
      }
    }


    // creates a 'paddle monkey'========================================================================================================
    this.monkey = window.innerHeight < 1000 ? this.physics.add.image(700, (window.innerHeight - 60), 'monkey').setScale(.3).setImmovable() :
      this.physics.add.image(700, (window.innerHeight - 200), 'monkey').setScale(.5).setImmovable()



    //adds a tennis ball===============================================================================================================
    this.ball = window.innerHeight < 1000 ? this.physics.add.image(700, (window.innerHeight - 10), 'tennisball').setScale(.08).setCollideWorldBounds(true).setBounce(1) :
      this.physics.add.image(700, (window.innerHeight - 360), 'tennisball').setScale(.1).setCollideWorldBounds(true).setBounce(1)
    this.ball.setData('onMonkey', true)


    //  Input events===================================================================================================================
    this.input.on('pointermove', function (pointer) {

      //  Keep the monkey within the game===============================================================================================
      this.monkey.x = Phaser.Math.Clamp(pointer.x, 52, window.innerWidth)

      if (this.ball.getData('onMonkey')) {
        this.ball.x = this.monkey.x
      }

    }, this)

    //starts the game on click===============================================================================================
    this.input.on('pointerup', function (pointer) {

      if (this.ball.getData('onMonkey')) {
        window.innerHeight < 1000 ? this.ball.setVelocity(-500, -500) : this.ball.setVelocity(-1200, -1200)
        this.ball.setData('onMonkey', false)
      }

      this.sound.play('monkeyhitball')

    }, this)


    //prints score to page=================================================================================
    this.scoreText = this.add.text(5, 5, `Bananas Left: ${this.bananas.getChildren().length}`, { fontSize: '15px', fill: '#000000' })

    //collider effect for when the ball hits a banana============================================================================
    this.physics.add.collider(this.ball, this.bananas, (ball, banana) => {
      this.sound.play('ballbouncing')
      banana.destroy()
      this.physics.add.sprite(banana.x, banana.y, 'bananapeel').setScale(.05).setGravity(0, 400)
      this.scoreText.setText(`Bananas Left: ${this.bananas.getChildren().length}`)

    })


    //logic for when the ball hits the paddle monkey===============================================================================================
    this.hitMonkey = function () {

      this.monkeyHittingBall.play('', 0, 1, true)

    }

    //  Collider for when the ball hits the paddle monkey===============================================================================================
    this.physics.add.collider(this.ball, this.monkey, this.hitMonkey, null, this, this.sound.play('monkeyhitball'))

  }

  // returns the ball to the paddle monkey if dropped===============================================================================================
  update() {
    if (this.ball.y > window.innerHeight) {
      this.ball.setVelocity(0)
      window.innerHeight < 1000 ? this.ball.setPosition(this.monkey.x - 50, (window.innerHeight - 150)) : this.ball.setPosition(this.monkey.x, (window.innerHeight - 360))
      this.ball.setData('onMonkey', true)
    }
    // Resets the game is all the bananas are removed===============================================================================================
    const numOfBananas = this.bananas.getChildren().length
    if (numOfBananas <= 0) {
      setTimeout(() => {
        this.scene.stop('GameScene')
        this.scene.start('EndScene')
      }, 1300)

    }

  }

}
