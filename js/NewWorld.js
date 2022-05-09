const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 468,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      enableBody: true,
    }
  },
  scene: [StartScene]
};
 
const game = new Phaser.Game(config);

class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	preload() {
		//Assets & Backgorund
		this.load.image('NewMap', 'assets/map/NewMapPNG.png');
        this.load.image('tiles', 'assets/map/Tileset.png');
		this.load.image('straw1', 'assets/map/Strawbale1.png');
		this.load.image('straw2', 'assets/map/Strawbale2.png');
		this.load.image('dum1', 'assets/map/TrainingDummy1.png');
		this.load.image('dum2', 'assets/map/TrainingDummy2.png');
		//Enemy
		this.load.image("Wolf1", "assets/Wolf1.png");
		//Two Characters
        this.load.spritesheet('player', 'assets/AlphonsoTheLong.png', { frameWidth: 13, frameHeight: 15 });
		this.load.spritesheet('Second', 'assets/JekkTheFoxCatV4.png', { frameWidth: 30, frameHeight: 17 });
	}
	create() {
	let bg=this.add.image(700,468, "NewMap");
	gameState.player = this.physics.add.sprite(225, 44, "player", 6); 
	
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
	