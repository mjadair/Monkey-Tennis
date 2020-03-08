const middleX = window.innerWidth / 3
const middleY = window.innerHeight / 2.5

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }



  preload() {
    this.load.image('banana', 'assets/fruit_banana.png')
  }


  create() {
    this.titleText = this.add.text(middleX, middleY, 'MONKEY TENNIS', { fill: '#000000', fontSize: '40px', fontFamily: 'Times New Roman' })
    this.add.text(middleX + 30, middleY + 60, 'Click to Start', { fill: '#000000', fontSize: '30px' })
    this.input.on('pointerdown', () => {
      this.scene.stop('StartScene')
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
