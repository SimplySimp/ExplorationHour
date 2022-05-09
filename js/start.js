const gameState = {
};

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: -200 },
      enableBody: true,
    }
  },
  scene: [WorldScene]
};
 
const game = new Phaser.Game(config);