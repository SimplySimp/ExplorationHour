var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 468,
    zoom: 2,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: [
        WorldScene,
        BattleScene,
        UIScene
    ]
};
var game = new Phaser.Game(config);