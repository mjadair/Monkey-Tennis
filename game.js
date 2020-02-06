function preload() {
  this.load.image('banana', 'assets/fruit_banana.png')
  this.load.image('monkey', 'assets/monkey.png')
  this.load.image('tennisball', 'assets/tennisball.png')
}

function create() {

  //  Sets boundaries for ceiling and walls, but disables the floor
  this.physics.world.setBoundsCollision(true, true, true, false)

  // adds target bananas
  this.bananas = this.physics.add.group()
  for (let yVal = 2; yVal < 6; yVal++) {
    for (let xVal = 1; xVal < 15; xVal++) {
      this.bananas.create(50 * xVal, 50 * yVal, 'banana').setScale(.1).setImmovable()
    }
  }

  console.log(window.innerHeight)

  // creates a 'paddle monkey'
  this.monkey = this.physics.add.image(700, (window.innerHeight - 60), 'monkey').setScale(.3).setImmovable()

  //adds a tennis ball
  this.ball = this.physics.add.image(700, 650, 'tennisball').setScale(.08).setCollideWorldBounds(true).setBounce(1)
  this.ball.setData('onMonkey', true)




  //  Input events
  this.input.on('pointermove', function (pointer) {

    //  Keep the monkey within the game
    this.monkey.x = Phaser.Math.Clamp(pointer.x, 52, 900)

    if (this.ball.getData('onMonkey')) {
      this.ball.x = this.monkey.x
    }

  }, this)

  //starts the game on click
  this.input.on('pointerup', function (pointer) {

    if (this.ball.getData('onMonkey')) {
      this.ball.setVelocity(-75, -300)
      this.ball.setData('onMonkey', false)
    }

  }, this)


  //collider effect for when the ball hits a banana
  this.physics.add.collider(this.ball, this.bananas, (ball, banana) => {
    banana.destroy()

    if (this.bananas.countActive() === 0) {
      resetLevel()
    }
  })



// should reset level - but need to add ball to gameState
  function resetLevel() {
    this.ball.setVelocity(0)
    this.ball.setPosition(this.monkey.x, 675)
    this.ball.setData('onMonkey', true)

    this.bananas.children.each(function (banana) {

      banana.enableBody(false, 0, 0, true, true)

    })
  }


  //logic for when the ball hits the paddle monkey
  function hitMonkey(ball, monkey) {
    let diff = 0

    if (ball.x < monkey.x) {
      // For when the ball is on the left-hand side of the monkey
      diff = monkey.x - ball.x
      ball.setVelocityX(-10 * diff)
    } else if (ball.x > monkey.x) {
      //  For when the ball is on the right-hand side of the monkey
      diff = ball.x - monkey.x
      ball.setVelocityX(10 * diff)
    } else {
      //  Ball is perfectly in the middle
      //  Add a random element to the bounce
      ball.setVelocityX(2 + Math.random() * 8)
    }
  }



  //  Collider for when the ball hits the paddle monkey
  this.physics.add.collider(this.ball, this.monkey, this.hitMonkey, null, this)
}


// returns the ball to the paddle monkey if dropped
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