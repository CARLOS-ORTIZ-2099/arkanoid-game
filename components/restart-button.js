// creando un componente que sera reutilizado en distintas partes de nuestro proyecto


export class RestartButton {
    constructor(scene) {
      // recibiendo la escena en el constructor y asignandola a una propiedad
      this.relatedScene = scene;
    }
  
    // otros métodos de la clase
    preload() {
        /* usamos this.relatedScene para precargar algo en la escena, ya que la propiedad "relatedScene" es donde había guardado la escena relacionada con esta instancia del componente. 
        */
        // creando un sprite los sprites son distintos fotogramas de una imagen
        // el método load.spritesheet() que recibe varios parámetros:
        // El identificado que vamos a darle a este sprite.
        // La imagen donde se encuentran las distintas imágenes, que simplemente tendrá una secuencia de las distintas alternativas de vistas del botón.
        // Las dimensiones del sprite (cada imagen suelta)
        this.relatedScene.load.spritesheet('button', 'images/restart.png', { frameWidth: 190, frameHeight: 49 });
    }

    create() {
        // añadiendo el sprite a la escena
        // El método setInteractive() simplemente sirve para que podamos hacer el botón interactivo
        this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();

        // estableciendo los eventos para el boton
        // 'pointerover' y 'pointerout' simplemente intercambian el sprite visible en el botón.
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });

        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });

          this.startButton.on('pointerdown', () => {
            // se encargará de cambiar la escena, para volver a reiniciar el juego.
            this.relatedScene.scene.start('game');
        });

    }


}









