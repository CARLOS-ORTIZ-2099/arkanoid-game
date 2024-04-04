// clase que gestionara la vida del usuario 


export class LiveCounter {
    // Código de la clase para la gestión de vidas del jugador
    constructor(scene, initialLives) {
        this.relatedScene = scene;
        this.initialLives = initialLives;
    }

    create() {
        
        // Básicamente, creo una variable displacement para indicar la cantidad de píxeles que hay entre cada imagen de cada vida.  

        let displacement = 60;
        let firstPosition = 800 - ((this.initialLives - 1) * displacement);
        this.liveImages = this.relatedScene.physics.add.staticGroup({
          setScale: { x: 0.5, y: 0.5 },
          key: 'platform',
          frameQuantity: this.initialLives-1,
          gridAlign: {
            width: this.initialLives - 1,
            height: 1,
            cellWidth: displacement,
            cellHeight: 30,
            x: firstPosition,
            y: 30
          }
        });
        
    }


    // Método para restar una vida del jugador
    liveLost() {
        // estamos verificando si hay elementos disponibles si no hay elementos, quiere decir que ya no hay vidas y debe finalizarse el juego
        if (this.liveImages.countActive() == 0) {
          this.relatedScene.endGame();
          return true;
        }
        // Si aún quedaban vidas en el contador, entonces accedemos a la primera disponible que esté viva, con getFirstAlive(). Luego hacemos que ese elemento del grupo desaparezca del juego es decir descontamos las vidas.
        let currentLiveLost = this.liveImages.getFirstAlive();
        currentLiveLost.disableBody(true, true);
        return false;
    }

}



