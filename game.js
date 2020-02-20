function preload() {
  this.load.image('banana', 'assets/fruit_banana.png')
  this.load.image('monkey', 'assets/monkey.png')
  this.load.image('tennisball', 'assets/tennisball.png')
  this.load.image('bananapeel', 'assets/banana_peel.png')
}

function create() {

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
  this.ball = window.innerHeight < 1000 ? this.physics.add.image(700, (window.innerHeight - 140), 'tennisball').setScale(.08).setCollideWorldBounds(true).setBounce(1) :
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
      this.ball.setVelocity(-500, -500)
      this.ball.setData('onMonkey', false)
    }

  }, this)


  //collider effect for when the ball hits a banana============================================================================
  this.physics.add.collider(this.ball, this.bananas, (ball, banana) => {
    banana.destroy()
    this.physics.add.image(banana.x, banana.y, 'bananapeel').setScale(.05).setGravity(0, 400)

  })


  //logic for when the ball hits the paddle monkey===============================================================================================
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
      //  If the Ball is perfectly in the middle, adds a random element to the bounce
      ball.setVelocityX(2 + Math.random() * 8)
    }
  }

  //  Collider for when the ball hits the paddle monkey===============================================================================================
  this.physics.add.collider(this.ball, this.monkey, this.hitMonkey, null, this)


  this.add.text(175, 482, `Bananas Left: ${this.bananas.getChildren().length}`, { fontSize: '15px', fill: '#000000' });



}


// returns the ball to the paddle monkey if dropped===============================================================================================
function update() {
  if (this.ball.y > window.innerHeight) {
    this.ball.setVelocity(0)
    window.innerHeight < 1000 ? this.ball.setPosition(this.monkey.x, (window.innerHeight - 140)) : this.ball.setPosition(this.monkey.x, (window.innerHeight - 340))
    this.ball.setData('onMonkey', true)
  }
  // Resets the game is all the bananas are removed===============================================================================================
  let numOfBananas = this.bananas.getChildren().length
  if (numOfBananas <= 0) {
    this.scene.restart()
  }
}


// resets level
// function resetLevel(ball, monkey, bananas) {
//   ball.setVelocity(0)
//   window.innerHeight < 1000 ? ball.setPosition(monkey.x, (window.innerHeight - 140)) : ball.setPosition(monkey.x, (window.innerHeight - 340))
//   ball.setData('onMonkey', true)

//   bananas.children.each(function (banana) {

//     banana.enableBody(false, 0, 0, true, true)

//   })
// }

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