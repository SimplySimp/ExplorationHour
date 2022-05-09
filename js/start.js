var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 700,
    height: 468,
    zoom: 2,
    pixelArt: true,
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