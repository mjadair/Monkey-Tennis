function preload() {
  this.load.image('banana', '../assets/fruit_banana.png')
  this.load.image('monkey', '../assets/monkey.png')
  this.load.image('tennisball', '../assets/tennisball.png')
}


const gameState = {}
function create() {

  //  Sets boundaries for ceiling and walls, but disables the floor
  this.physics.world.setBoundsCollision(true, true, true, false)

  // adds target bananas
  gameState.bananas = this.physics.add.group()
  for (let yVal = 1; yVal < 6; yVal++) {
    for (let xVal = 1; xVal < 29; xVal++) {
      gameState.bananas.create(50 * xVal, 50 * yVal, 'banana').setScale(.1)
    }
  }

  // creates a 'paddle monkey'
  this.monkey = this.physics.add.image(700, 750, 'monkey').setScale(.3).setImmovable()

  //adds a tennis ball
  this.ball = this.physics.add.image(700, 650, 'tennisball').setScale(.1).setCollideWorldBounds(true).setBounce(1)
  this.ball.setData('onMonkey', true)




  //  Input events
  this.input.on('pointermove', function (pointer) {

    //  Keep the monkey within the game
    this.monkey.x = Phaser.Math.Clamp(pointer.x, 52, 900)

    if (this.ball.getData('onMonkey')) {
      this.ball.x = this.monkey.x
    }

  }, this)

  this.input.on('pointerup', function (pointer) {

    if (this.ball.getData('onMonkey')) {
      this.ball.setVelocity(-75, -300)
      this.ball.setData('onMonkey', false)
    }

  }, this)



  function hitBanana(ball, banana) {
    banana.disableBody(true, true)

    if (this.bananas.countActive() === 0) {
      this.resetLevel()
    }
  }



  function resetLevel() {
    resetBall()

    this.bananas.children.each(function (banana) {

      banana.enableBody(false, 0, 0, true, true)

    })
  }

  function hitMonkey(ball, monkey) {
    var diff = 0

    if (ball.x < monkey.x) {
      //  Ball is on the left-hand side of the monkey
      diff = monkey.x - ball.x
      ball.setVelocityX(-10 * diff)
    } else if (ball.x > monkey.x) {
      //  Ball is on the right-hand side of the monkey
      diff = ball.x - monkey.x
      ball.setVelocityX(10 * diff)
    } else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8)
    }
  }



  //  Colliders
  this.physics.add.collider(this.ball, this.bananas, this.hitBanana, null, this)
  this.physics.add.collider(this.ball, this.monkey, this.hitmonkey, null, this)
}



function update() {
  if (this.ball.y > 1000) {
    this.ball.setVelocity(0)
    this.ball.setPosition(this.monkey.x, 675)
    this.ball.setData('onMonkey', true)
  }

}



const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade'
  },
  scene: {
    preload,
    create,
    update
  }
}


const game = new Phaser.Game(config)