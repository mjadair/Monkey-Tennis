// const middleX = window.innerWidth / 3
// const middleY = window.innerHeight / 2.5

class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' })
  }

  preload() {
    this.load.image('banana', 'assets/fruit_banana.png')
  }


  create() {
    this.add.text(middleX + 70, middleY, 'Game Over', { fill: '#000000', fontSize: '40px', fontFamily: 'Times New Roman' })
    this.add.text(middleX + 30, middleY + 60, 'Click to Play Again!', { fill: '#000000', fontSize: '30px' })
    this.input.on('pointerdown', () => {
      this.scene.stop('EndScene')
      this.scene.start('GameScene')
    })

    const fallingBananas = this.physics.add.group()

    function continuouslyFallingBananas() {
      const xCoord = Math.random() * window.innerWidth
      fallingBananas.create(xCoord, 10, 'banana').setScale(.1).setVelocityY(200)
    }

    const bananaFallLoop = this.time.addEvent({
      delay: 100,
      callback: continuouslyFallingBananas,
      callbackScope: this,
      loop: true,
    })

  }



}