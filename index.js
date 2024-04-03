import { Game } from './game.js';

const config = {
  // Esto indica que Phaser podrá usar tanto canvas como WebGL, según el navegador sea o no compatible con uno u otro.
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  // las escenas se entregan en un array.
  scene: [Game],
  // estamos indicando que la física será por defecto "arcade"
  // Arcade incluye movimiento, colisiones, gravedad y en general todo lo que necesitarías para un juego de plataformas.
  // Phaser admite hasta 4 tipos distintos de física.
  physics: {
    default: 'arcade',
    arcade: {
    /* La gravedad en nuestro caso la hemos ajustado a 400, que será el empuje de los elementos hacia el suelo, en la vertical. A mayor valor, más rápido caen los objetos al suelo, */
    //  gravity: { y: 400 },
      debug: false
    }
  }
}
// ahora que tenemos acceso a phaser mediante la cdn hacemos la creación del juego
var game = new Phaser.Game(config);
console.log(Phaser);
