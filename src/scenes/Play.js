class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {

        this.load.image('hexfinder', './assets/hexfinder.png');
        this.load.tilemapTiledJSON('map', 'assets/Maps/HexGrid.json');
        this.load.image('highlight', 'assets/highlight.png');
        this.load.image('select', 'assets/select.png');
        this.load.image('player', 'assets/Dude.png');
        this.load.image('walkable', 'assets/walkable.png');
        this.load.image('assasin', 'assets/assasin.png');


    }

    create() {
        this.input.mouse.disableContextMenu();
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('hexfinder');
        this.layer = this.map.createLayer('Ground', this.tileset, 0, 0);

        this.high = this.add.image(100, 100, 'highlight').setOrigin(0, 0);
        this.selectedTileImage = this.add.image(0, 0, 'select').setOrigin(0, 0);
        this.selectedTile = new Phaser.Math.Vector2();

        this.initGrid();



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
            if (this.selectedTile.x != null && this.selectedTile.y != null) {
                if (this.tile.properties.character) {

                    this.DisplayMovement(this.tile, this.tile.properties.characterObject.speed);
                }
            }
        }, this);

        this.characters = this.add.group();
        this.movement = this.add.group();


        this.characters.add(new Barbarian(this, this.map.getTileAt(8, 9)));
        this.characters.add(new Assasin(this, this.map.getTileAt(7, 8)));


    }
    update() {
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);


        var test = this.map.getTileAtWorldXY(this.input.x, this.input.y);
        if (test != null) {

            this.pointerTileX = test.x;
            this.pointerTileY = test.y;
            this.overTheBoard = true;
        }
        else {
            this.overTheBoard = false;
        }

        // Snap to tile coordinates, but in world space
        var between = this.map.tileToWorldXY(this.pointerTileX, this.pointerTileY);
        this.high.x = between.x;
        this.high.y = between.y;



    }
    clicked() {
        //console.log(this.map.getTileAt(2, 5));

        //console.log("Clicked");
        this.updateGrid();
        this.tile = this.map.getTileAt(this.pointerTileX, this.pointerTileY);
        if (this.overTheBoard) {//this.tile) {
            // Note: JSON.stringify will convert the object tile properties to a string

            //this.tile.properties.selected = true;

            if (!(this.selectedTile.x == this.tile.x) || !(this.selectedTile.y == this.tile.y)) {
                //this.tile.properties.selected = true;

                // console.log(this.high.x);
                //this.selectedTile = this.tile;
                this.selectedTile.x = this.tile.x;
                this.selectedTile.y = this.tile.y;
                // console.log(this.high.x);
            }
            else {
                // Null will default it to 0 from the TileToWorld
                this.selectedTile.x = null;
                this.selectedTile.y = null;
            }

            var between = this.map.tileToWorldXY(this.selectedTile.x, this.selectedTile.y);

            //console.log(between);
            this.selectedTileImage.x = between.x;
            this.selectedTileImage.y = between.y;
            this.propertiesText.setText('Tile: ' + this.pointerTileX + " - " + this.pointerTileY);
        }
    }
    DisplayMovement(tile, speed) {
        
        if(speed == 0){
            this.movement.add(this.add.image(tile.pixelX, tile.pixelY, 'walkable').setOrigin(0, 0));
            return;
        }
        // var efficient;
        // efficient = tile.properties.UpLeft;
        if (tile.properties.UpLeft && tile.properties.UpLeft.properties.Walkable && !tile.properties.UpLeft.properties.occupied) {
            this.DisplayMovement(tile.properties.UpLeft, speed - 1);
        }
        if (tile.properties.UpRight && tile.properties.UpRight.properties.Walkable && !tile.properties.UpRight.properties.occupied) {
            this.DisplayMovement(tile.properties.UpRight, speed - 1);
        }

        if (tile.properties.Left && tile.properties.Left.properties.Walkable && !tile.properties.Left.properties.occupied) {
            this.DisplayMovement(tile.properties.Left, speed - 1);
        }
        if (tile.properties.Right && tile.properties.Right.properties.Walkable && !tile.properties.Right.properties.occupied) {
            this.DisplayMovement(tile.properties.Right, speed - 1);
        }

        if (tile.properties.DownLeft && tile.properties.DownLeft.properties.Walkable && !tile.properties.DownLeft.properties.occupied) {
            this.DisplayMovement(tile.properties.DownLeft, speed - 1);
        }
        if (tile.properties.DownRight && tile.properties.DownRight.properties.Walkable && !tile.properties.DownRight.properties.occupied) {
            this.DisplayMovement(tile.properties.DownRight, speed - 1);
        }


        // if(this.selectedTile.x != null && this.selectedTile.y != null){
        //     if(this.tile.properties.character){
        //         for(var i = 0; i < this.tile.properties.characterObject.speed; i++){






        // var refTile = this.map.tileToWorldXY(this.tile.x, this.tile.y - 1);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));

        // refTile = this.map.tileToWorldXY(this.tile.x + 1, this.tile.y - 1);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));

        // refTile = this.map.tileToWorldXY(this.tile.x + 1, this.tile.y);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));

        // refTile = this.map.tileToWorldXY(this.tile.x + 1, this.tile.y + 1);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));

        // refTile = this.map.tileToWorldXY(this.tile.x, this.tile.y + 1);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));

        // refTile = this.map.tileToWorldXY(this.tile.x - 1, this.tile.y);
        // this.movement.add(this.add.image(refTile.x, refTile.y, 'walkable').setOrigin(0, 0));


        //         }
        //     }

        // }
    }
    updateGrid() {
        // for each object(character) if they have moved update the hexs to reflect that.
        //console.log(this.characters.getChildren());
        var update = this.characters.getChildren();
        for (var i = 0; i < update.length; i++) {
            update[i].tile.properties.occupied = true;

            update[i].tile.properties.character = update[i].type;
            update[i].tile.properties.characterObject = update[i];
            // Need to clear the previous instance
        }
        // might need to change to updateGrid(objhect, beggining tile, ending tile)
    }
    initGrid() {
        // Need to get the Center of the first tile


        var width = this.map.hexSideLength * Math.sqrt(3);
        var height = this.map.hexSideLength * 2;
        for (var i = 0; i < this.map.width; i++) {
            for (var j = 0; j < this.map.height; j++) {
                var tile = this.map.getTileAt(i, j);
                if (tile) {
                    var centerX = tile.pixelX + width / 2;
                    var centerY = tile.pixelY + height / 2;
                    tile.properties.UpRight = this.map.getTileAtWorldXY(centerX + width, centerY - height  * (3/4));
                    tile.properties.UpLeft = this.map.getTileAtWorldXY(centerX - width, centerY - height  * (3/4));
                    tile.properties.Right = this.map.getTileAtWorldXY(centerX - width, centerY);
                    tile.properties.Left = this.map.getTileAtWorldXY(centerX + width, centerY);
                    tile.properties.DownRight = this.map.getTileAtWorldXY(centerX + width, centerY + height  * (3/4));
                    tile.properties.DownLeft = this.map.getTileAtWorldXY(centerX - width, centerY + height  * (3/4));
                }
            }
        }
    }
}
