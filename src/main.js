let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: '#FFA500',
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scene: [Play]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keyENTER, keySPACE, keySHIFT, keyQ;