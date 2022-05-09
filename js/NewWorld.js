class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'WorldScene' })
	}

	preload() {
  this.load.image('', '');
  this.load.image('', '');
  this.load.image('', '');
  this.load.image('', '');
  this.load.image('', '')
}

	create() {
  let bg=this.add.image(195,250,"background");
  
  gameState.player = this.physics.add.sprite(225, 50, '');
 
  gameState.player.setCollideWorldBounds(true);
  
  gameState.cursors = this.input.keyboard.createCursorKeys();
}

	update() {
if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-100);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(100);
} else if (gameState.cursors.up.isDown) {
    gameState.player.setVelocityY(100);
} else if (gameState.cursors.down.isDown) {
    gameState.player.setVelocityY(-100);
  } else {
    gameState.player.setVelocityX(0);
  }
}
}