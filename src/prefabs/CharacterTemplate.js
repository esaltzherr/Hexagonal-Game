class CharacterTemplate extends Phaser.GameObjects.Sprite {
    constructor(scene, tile, texture, config = {
        type: 'Test',
        speed: 4,
        health: 100,
        damage: 40
    }) {
        super(scene, texture);
        this.scene = scene;
        this.tile = tile;
        var between = this.scene.map.tileToWorldXY(this.tile.x, this.tile.y);
        this.x = between.x;
        this.y = between.y;
        this.setTexture(texture);
        this.setOrigin(0,0);
        scene.add.existing(this);

        this.type = config.type
        this.maxHealth = config.health;
        this.health = this.maxHealth;
        this.speed = config.speed;
        this.damage = config.damage;
        
    }
}