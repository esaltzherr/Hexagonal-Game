class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {
        // this.load.image('tiles', 'assets/drawtiles-spaced.png');
        // this.load.image('car', 'assets/Dude.png');
        // this.load.tilemapCSV('map', 'assets/Grid.csv');

        this.load.image('square', 'assets/hexfinder.png');

        this.load.tilemapTiledJSON('mappy','assets/Maps/HexTilemap.json');
        

        // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    create() {
        // this.target = new Phaser.Math.Vector2();
        // var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        // var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
        // var layer = map.createLayer(0, tileset, 0, 0);
        // this.player = this.physics.add.image(32 + 16, 32 + 16, 'car');

        // console.log("1");
        // let mappy = this.add.tilemap('mappy');
        // console.log("2");
        // this.square = this.map.addTilesetImage('square');
        // console.log("3");
        // this.botlayer = this.map.createStaticLayer('Ground', [this.square],0,0);

        // console.log(this.map, this.square, this.botlayer);

    }
    update() {
        // var moved = false;
        // if (Phaser.Input.Keyboard.JustDown(keyW)) {
        //     this.target.x = this.player.x;
        //     this.target.y = this.player.y - 32;
        //     moved = true;
        // }
        // else if (Phaser.Input.Keyboard.JustDown(keyA)) {
        //     this.target.x = this.player.x - 32;
        //     this.target.y = this.player.y;
        //     moved = true;
        // }
        // else if (Phaser.Input.Keyboard.JustDown(keyS)) {
        //     this.target.x = this.player.x;
        //     this.target.y = this.player.y + 32;
        //     moved = true;
        // }
        // else if (Phaser.Input.Keyboard.JustDown(keyD)) {
        //     this.target.x = this.player.x + 32;
        //     this.target.y = this.player.y;
        //     moved = true;
        // }
        // if(moved){
        //     moved = false;
        //     this.physics.moveToObject(this.player, this.target, 200);
        //     console.log(this.player.x, this.target.x);
        // }
        // var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y);
        // if(distance < 4 ){
        //     this.player.body.reset(this.target.x, this.target.y);
        // }


    }


}