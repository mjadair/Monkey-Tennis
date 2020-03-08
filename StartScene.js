class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  create() {
    this.add.text(250, 350, 'MONKEY TENNIS', { fill: '#000000', fontSize: '40px' })
    this.add.text(280, 400, 'Click to Start', { fill: '#000000', fontSize: '30px' })
    this.input.on('pointerdown', () => {
      this.scene.stop('StartScene')
      this.scene.start('GameScene')
    })
  }
}