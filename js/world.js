

const BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/Tileset.png');
		this.load.image('straw1', 'assets/map/Strawbale1.png');
		this.load.image('straw2', 'assets/map/Strawbale2.png');
		this.load.image('dum1', 'assets/map/TrainingDummy1.png');
		this.load.image('dum2', 'assets/map/TrainingDummy2.png');
        
        // map in json format
        this.load.tilemapTiledJSON('NewMap', 'assets/map/NewMap.json');
        
        // enemies
        this.load.image("Wolf1", "assets/Wolf1.png");
        this.load.image("ColdBeardPirate2", "assets/ColdBeardPirate2.png");
        
        // our two characters
        this.load.spritesheet('player', 'assets/AlphonsoTheLong.png', { frameWidth: 13, frameHeight: 15 });
		this.load.spritesheet('Second', 'assets/JekkTheFoxCatV4.png', { frameWidth: 30, frameHeight: 17 });
    },

    create: function ()
    {
        // start the WorldScene
        this.scene.start('WorldScene');
    }
});

const WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        // create the map
        var map = this.make.tilemap({ key: 'NewMap' });
        
        // first parameter is the name of the tilemap in tiled
		var tiles = map.addTilesetImage('tiles');
		var straw1 = map.addTilesetImage('straw1');
		var straw2 = map.addTilesetImage('straw2');
		var dum1 = map.addTilesetImage('dum1');
		var dum2 = map.addTilesetImage('dum2');
        
        // creating the layers
        var bot = map.createStaticLayer('bot', tiles, 0, 0);
        var top = map.createStaticLayer('top', tiles, straw1, straw2, dum1, dum2, 0, 0);
        var Collision = map.createStaticLayer('Collision', tiles, 0, 0);
        
        // make all tiles in obstacles collidable
        top.setCollisionByExclusion([-1]);
        
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 3, 5]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
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

        // our player sprite created through the phycis system
        this.player = this.physics.add.sprite(50, 100, 'player', 6);
        
        // don't go out of the map
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        
        // don't walk on trees
        this.physics.add.collider(this.player, top);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; // avoid tile bleed
    
        // user input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // where the enemies will be
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        // add collider
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
		
        // we listen for 'wake' event
        this.sys.events.on('wake', this.wake, this);
    },
    wake: function() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
		
    },
     onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.fadeIn(1100);
        
        this.input.stopPropagation();
		
        // start battle 
        this.scene.switch('BattleScene');        
	},
    update: function (time, delta)
    {             
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
    }
    
});