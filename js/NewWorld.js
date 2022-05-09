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
	gameState.player = this.physics.add.sprite(225, 44, "AlphonsoTheLong.png"); 
	
	}
	