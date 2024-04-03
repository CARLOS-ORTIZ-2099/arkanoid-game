import { RestartButton } from "../components/restart-button.js";

export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
    // instanciando la clase RestartButton y pasandole como parametro el objeto actual es decir la clase Congratulations
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('congratulations', 'images/congratulations.png');
    // accediendo al metodo preload de la propiedad restartButton que tiene como valor la instancia de la clase RestartButton
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'background');
    // accediendo al metodo create de la propiedad restartButton que tiene como valor la instancia de la clase RestartButton
    this.restartButton.create();
    this.congratsImage = this.add.image(400, 90, 'congratulations');
  }
}