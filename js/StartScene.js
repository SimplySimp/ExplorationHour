    class StartScene extends Phaser.Scene {
    constructor() {
      super({key: 'StartScene'})
  }
    }

  preload() {
  //Loading Assets
    this.load.image('tileset', 'assets/map/atlas.png');
    this.load.image('water','assets/map/pixil-frame-0(5).png');
    this.load.spritesheet('slime', 'assets/map/Slime.png', { frameWidth: 14, frameHeight: 12 });
    this.load.spritesheet('player', 'assets/AlphonsoTheLong.png', { frameWidth: 13, frameHeight: 15 });
    this.load.tilemapTiledJSON('FinalMap', 'assets/map/TrainingMapNew.json');
  }

  create() {
  //Create World
    const map = this.make.tilemap({ key: 'FinalMap' });
    const water = map.addTilesetImage('water', 'water');  
    const tileset = map.addTilesetImage('atlas','tileset');
    //Layers
    const allLayers = [tileset, water];
    const Bot = map.createStaticLayer('Bot', tileset, 0, 0);
    const Top = map.createDynamicLayer('Top', allLayers, 0, 0);
    const mid = map.createStaticLayer('Grass', tileset, 0, 0);
    Top.setCollisionByExclusion([-1], true);

  //Create player & Collision
    this.player = this.physics.add.sprite(40, 180, 'player', 3).setScale(1.2);
    this.physics.add.collider(this.player, Top);
  //Creating Cursor Key   
    this.cursors = this.input.keyboard.createCursorKeys();
  //Creating Camera for world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);
  //MapBoundaries
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
  //Creating Camera for player
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5)
    this.cameras.main.setZoom(4);
          
  //Setting Player Animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 3, 5]}),
      frameRate: 10,
      repeat: -1
        });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 3, 5]}),
      frameRate: 10,
      repeat: -1
        });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 6, 8]}),
      frameRate: 10,
      repeat: -1
        });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 0, 2]}),
      frameRate: 10,
      repeat: -1
        }); 
  //Creating Slimes
    this.slime = this.physics.add.sprite(40, 180, 'slime', 0).setScale(1.2);
  //Creating Slime Animation
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('slime', { frames: [0, 1, 2, 3]}),
      frameRate: 10,
      repeat: -1
        });
      }

  update() {
  //Setting Player Velocity(Grabitygood)
    this.player.body.setVelocity(0);
        
  // Horizontal movement
    if (this.cursors.left.isDown)
      {
    this.player.body.setVelocityX(-80);
      }
    else if (this.cursors.right.isDown)
      {
    this.player.body.setVelocityX(80);
      }
  // Vertical movement
    if (this.cursors.up.isDown)
      {
    this.player.body.setVelocityY(-80);
      }
    else if (this.cursors.down.isDown)
      {
    this.player.body.setVelocityY(80);
      }        

  // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown)
      {
    this.player.anims.play('left', true);
    this.player.flipX = true;
      }
    else if (this.cursors.right.isDown)
      {
    this.player.anims.play('right', true);
    this.player.flipX = false;
      }
    else if (this.cursors.up.isDown)
      {
    this.player.anims.play('up', true);
      }
    else if (this.cursors.down.isDown)
      {
    this.player.anims.play('down', true);
      }
    else
      {
    this.player.anims.stop();
      }
  //Playing Slime Animations
    this.slime.anims.play('idle',true);
        }
              