const gameState = {
	score: 0
};

const config = {
  type: Phaser.AUTO,
  width: 1050,
  height: 700,
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