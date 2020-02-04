function preload() {

}


const gameState = {}
function create() {

  // When gameState.active is true, the game is being played and not over. When gameState.active is false, then it's game over
  gameState.active = true

  // When gameState.active is false, the game will listen for a click event and restart when the event happens
  this.input.on('pointerup', () => {
    if (gameState.active === false) {
      this.scene.restart()
    }
  })

  // Creating static platforms
  // const platforms = this.physics.add.staticGroup();
  // platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody()

  // Displays score?

  // Uses the physics plugin to create paddle
  // gameState.player = this.physics.add

  // Create Collider objects
  // gameState.player.setCollideWorldBounds(true)
  // this.physics.add.collider(gameState.player, platforms)

  // Creates cursor objects to be used in update()
  gameState.cursors = this.input.keyboard.createCursorKeys()



  // this.physics.add.collider(gameState.enemies, gameState.player, () => {
  //   gameState.active = false,
  //   this.add.text(210, 250, 'Game Over \n Click to restart', { fontSize: '15px', fill: '#000' });
  // })

}

function update() {

  // if (gameState.cursors.left.isDown) {
  //   gameState.player.setVelocityX(-160)
  // } else if (gameState.cursors.right.isDown) {
  //   gameState.player.setVelocityX(160)
  // } else {
  //   gameState.player.setVelocityX(0)
  // }



} 


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
}


const game = new Phaser.Game(config)