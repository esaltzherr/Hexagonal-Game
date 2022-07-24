class Logo extends Phaser.Scene {
    constructor() {
        super("logoscene");
    }

    preload() {
        this.load.spritesheet('logo', './assets/Sprite-0001.png', { frameWidth: 320, frameHeight: 320 });
    }

    create() {
        this.logo = this.add.sprite(0,0, 'logo').setOrigin(0,0);
        this.logo.setScale(1);

        this.logo.anims.create({
            key: 'intro',
            frames: 'logo',
            frameRate: 15,
        });
        this.logo.anims.play('intro', true);
        //this.logo.on('animationcomplete', this.logo);
    }
    update(){
        
    }
    
    
}