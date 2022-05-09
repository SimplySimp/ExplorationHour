class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	preload() {
	
	}
	create() {
	let bg=this.add.image(700,468, "NewMap");
	gameState.player = this.physics.add.sprite(225, 44, "AlphonsoTheLong"); 
	
	}
	