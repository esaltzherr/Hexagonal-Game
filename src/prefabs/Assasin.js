class Assasin extends CharacterTemplate{
    constructor(scene, tile, texture = 'assasin') {
        super(scene, tile, texture, {
            type: 'Assasin',
            speed: 4,
            health: 100,
            damage: 45
        });
        
    }
}