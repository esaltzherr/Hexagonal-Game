class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {

        this.load.image('hexfinder', './assets/hexfinder.png');
        this.load.tilemapTiledJSON('map', 'assets/Maps/HexGrid.json');
        
        console.log('tiles');


    }

    create() {
        this.map = this.make.tilemap({ key: 'map' });
        console.log("1");
        this.tileset = this.map.addTilesetImage('hexfinder');
        console.log("2");
        this.layer = this.map.createLayer('Ground', this.tileset, 0, 0);

        console.log("1" + this.map);

        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        this.help = this.add.text(16, 500, 'Click on a tile to view its properties.', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        this.help.setScrollFactor(0);
        
        this.propertiesText = this.add.text(16, 540, 'Properties: ', {
            fontSize: '18px',
            fill: '#ffffff'
        });


    }
    update() {
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        //console.log(this.map);
        //console.log(this.map.getTileAtWorldXY(this.input.x,this.input.y));
        //console.log(Phaser.Tilemaps.Components.HexagonalWorldToTileXY(this.input.x, this.input.y));

        //console.log(this.map.HexagonalWorldToTileY(this.input.y));
        var test = this.map.getTileAtWorldXY(this.input.x, this.input.y);
        if(test!=null){
            console.log(test.x, test.y);
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
        this.marker.x = between.x;
        this.marker.y = between.y

        //console.log(this.pointerTile.x, this.marker.x, this.pointerTile.y, this.marker.y);


        //console.log(this.marker.x, this.marker.y);


        if (this.input.manager.activePointer.isDown) {
            this.tile = this.map.getTileAt(this.pointerTileY, this.pointerTileY);

            if (this.tile) {
                // Note: JSON.stringify will convert the object tile properties to a string
                this.propertiesText.setText('Properties: ' + JSON.stringify(this.tile.properties));
                this.tile.properties.viewed = true;
            }
        }

    }


}