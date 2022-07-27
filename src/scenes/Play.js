class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {

        this.load.image('hexfinder', './assets/hexfinder.png');
        this.load.tilemapTiledJSON('map', 'assets/Maps/HexGrid.json');
        this.load.image('highlight', 'assets/highlight.png');
        this.load.image('select', 'assets/select.png');

        console.log('tiles');


    }

    create() {
        this.input.mouse.disableContextMenu();
        this.map = this.make.tilemap({ key: 'map' });
        console.log("1");
        this.tileset = this.map.addTilesetImage('hexfinder');
        console.log("2");
        this.layer = this.map.createLayer('Ground', this.tileset, 0, 0);

        console.log("1" + this.map);

        this.high = this.add.image(100, 100, 'highlight').setOrigin(0, 0);
        this.selectedTileImage = this.add.image(0, 0, 'select').setOrigin(0, 0);
        this.selectedTile = new Phaser.Math.Vector2();





        this.help = this.add.text(16, 500, 'Click on a tile to view its properties.', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        this.help.setScrollFactor(0);

        this.propertiesText = this.add.text(16, 540, 'Properties: ', {
            fontSize: '18px',
            fill: '#ffffff'
        });


        this.selectedTile;
        this.input.on('pointerdown', function (pointer) {
            this.clicked();

        }, this);

    }
    update() {
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        //console.log(this.map);
        //console.log(this.map.getTileAtWorldXY(this.input.x,this.input.y));
        //console.log(Phaser.Tilemaps.Components.HexagonalWorldToTileXY(this.input.x, this.input.y));

        //console.log(this.map.HexagonalWorldToTileY(this.input.y));
        var test = this.map.getTileAtWorldXY(this.input.x, this.input.y);
        //console.log(test);
        if (test != null) {

            this.pointerTileX = test.x;
            this.pointerTileY = test.y;
        }
        //console.log(test.x);

        // console.log();
        // console.log(this.pointerTileX, this.pointerTileY);


        //console.log(Phaser.Math.RoundTo(this.pointerTile.x, 0),Phaser.Math.RoundTo(this.pointerTile.y, 0) );



        // this.pointerTile = this.map.worldToTileXY(this.worldPoint.x, this.worldPoint.y);
        // //console.log(Phaser.Math.RoundTo(this.pointerTile.x, 0),Phaser.Math.RoundTo(this.pointerTile.y, 0) );
        // this.pointerTile.x = Phaser.Math.RoundTo(this.pointerTile.x, 0);
        // this.pointerTile.y = Phaser.Math.RoundTo(this.pointerTile.y, 0);
        //console.log(this.map.worldToTileXY(200,200));


        //console.log(this.pointerTile.x, this.pointerTile.y);


        //console.log(this.worldPoint.x, this.worldPoint.y);
        // Snap to tile coordinates, but in world space


        var between = this.map.tileToWorldXY(this.pointerTileX, this.pointerTileY);
        //console.log(between);
        this.high.x = between.x;
        this.high.y = between.y;

        //console.log(this.marker.x, this.input.x, this.marker.y, this.input.y);

        //console.log(this.pointerTile.x, this.marker.x, this.pointerTile.y, this.marker.y);





    }
    clicked() {
        //console.log("Clicked");
        this.tile = this.map.getTileAt(this.pointerTileX, this.pointerTileY);
        console.log(this.tile);
        if (this.tile) {
            // Note: JSON.stringify will convert the object tile properties to a string

            //this.tile.properties.selected = true;
            console.log(this.selectedTile.x, this.pointerTileX);
            if (!(this.selectedTile.x == this.tile.x) || !(this.selectedTile.y == this.tile.y)) {
                //this.tile.properties.selected = true;

                // console.log(this.high.x);
                //this.selectedTile = this.tile;
                this.selectedTile.x = this.tile.x;
                this.selectedTile.y = this.tile.y;
                // console.log(this.high.x);
            }
            else {
                console.log("Unselect");
                this.selectedTile.x = null;
                this.selectedTile.y = null;
                
                
            }

            var between = this.map.tileToWorldXY(this.selectedTile.x,  this.selectedTile.y);
            //console.log(between);
            this.selectedTileImage.x = between.x;
            this.selectedTileImage.y = between.y;



            this.propertiesText.setText('Properties: ' + JSON.stringify(this.tile.properties) + this.pointerTileX + " - " + this.pointerTileY);
        }
    }

}
