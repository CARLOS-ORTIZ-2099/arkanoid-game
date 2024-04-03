import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
    // instanciando la clase RestartButton y pasandole como parametro el objeto actual es decir la clase Gameover
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('gameover', 'images/gameover.png');
    // accediendo al metodo preload de la propiedad restartButton que tiene como valor la instancia de la clase RestartButton
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'background');
    // accediendo al metodo create de la propiedad restartButton que tiene como valor la instancia de la clase RestartButton
    this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}