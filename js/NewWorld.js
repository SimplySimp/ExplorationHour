class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'WorldScene' })
	}

	preload() {
  this.load.image('player', 'assets/map/AlphonsoTheLong.png');
  this.load.image('NewMap', 'assets/map/NewMapPNG.png');
  this.load.image('straw1', 'assets/map/Strawbale1.png');
  this.load.image('straw2', 'assets/map/Strawbale2.png');
  this.load.image('dum1', 'assets/map/TrainingDummy1.png');
  this.load.image('dum2', 'assets/map/TrainingDummy2.png');

}
	create() {
  let bg=this.add.image(195,250,"NewMap");
  
  gameState.player = this.physics.add.sprite(225, 50, 'player');
 
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