class Barbarian extends CharacterTemplate{
    constructor(scene, tile, texture = 'player') {
        super(scene, tile, texture, {
            type: 'Barbarian',
            speed: 2,
            health: 100,
            damage: 45
        });
        
    }
}