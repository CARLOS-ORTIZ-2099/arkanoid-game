// la clase Gema e extiedne o hereda los ,etodos y/o propiedades de la clase padre Phaser.Scene

export class Game extends Phaser.Scene {
/* Phaser.Scene contiene una escena básica y nosotros la extendemos para darle la funcionalidad que requiere nuestro juego. 
El constructor hace una llamada al constructor de la clase padre, pasando el nombre de la escena. Este nombre nos servirá para referirnos a la escena siempre que sea necesario, por ejemplo para escuchar mensajes, para cambiar la escena activa, etc.*/
    constructor() {
      super({ key: 'game' });
    }
    // metodo que ejecutara una logica inicial cada que se inicia el juego
    init() {
      this.score = 0;
    }

  // este metod sirve para ir "alistando" los recursos que tendra nuestro juego, asi mismo podemos asignar nombres a nuestros recursos esto con el fin de que a lo largo del juego podamos identificarlos
    preload() {
      this.load.image('background', 'images/background.png');
      this.load.image('platform', 'images/platform.png');
      this.load.image('ball', 'images/ball.png');
      this.load.image('bluebrick', 'images/brickBlue.png');
      this.load.image('blackbrick', 'images/brickBlack.png');
      this.load.image('greenbrick', 'images/brickGreen.png');
      this.load.image('orangebrick', 'images/brickOrange.png');
    }

 // este metodo se ejecuta cuando todos los recursos ya se han cargado , este metodo colocara todo lo necesario para el juego 
    create() {

      // estableciendo los limites con los cuales la bola rebotara
      this.physics.world.setBoundsCollision(true, true, true, false);

      // añadiendo la imagen de fondo
      this.add.image(410, 250, 'background');


    /*  creando un grupo
      this.miGrupo = this.physics.add.staticGroup();

      insertando elementos al grupo, pero asociado al grupo que se acaba de generar
      this.miGrupo.create(54, 44, 'elementocargado');
      this.miGrupo.create(75, 32, 'elementocargado'); 
    */

      // Crear grupos y sus elementos mediante un mismo método

      // key: hemos colocado un array con todos los identificadores de las imágenes de los bloques previamente cargadas.

      // frameQuantity: este es el número de elementos para cada uno de las llaves del grupo. Es decir, colcaremos 10 bloques azules, 10 naranjas, 10 verdes y 10 negros.

      // gridAlign: este método permite posicionar los elementos en una rejilla, muy úti para nuestra primera pantalla. Esta rejilla tiene los siguientes valores: 
      // width: La anchura en columnas de la rejilla
      // height: La altura en filas de la rejilla
      // cellWidth: Este es el tamaño de la celda de rejilla de anchura, en píxeles. No tiene que ver con el tamaño de lo que metas dentro. Si lo que metes es menor,
      // cellHeight: Los píxeles de altura de la celda de la rejilla
      // x: La posición del primer elemento de la rejilla, en la horizontal
      // y: La posición del primer elemento de la rejilla, en la vertical.
      this.bricks = this.physics.add.staticGroup({
        key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'], 
        frameQuantity: 10,
        gridAlign: { 
          width: 10, 
          height: 4, 
          cellWidth: 67, 
          cellHeight: 34, 
          x: 112, 
          y: 100
        }
      });
     
      // añadiendo la plataforma y estableciendo la fisica, adicionalmente indicamos que este item sea inamovinle con otro objeto si a futuro hay una colision 
      this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();

      this.platform.body.allowGravity = false;
      // con esto la plataforma no se saldra de los bordes
      this.platform.setCollideWorldBounds(true);



      // creando los cursores que usaremos para mover la plataforma
      this.cursors = this.input.keyboard.createCursorKeys();


      // creando la bola y ajustando sus movimientos
      this.ball = this.physics.add.image(385, 430, 'ball');

      // con esto la bola rebotara cada que choque en la parte inferior del juego, un valor igual a 1 indica que esta rebotara con la misma fuerza que con la que cayo
      this.ball.setBounce(1);
   
   
      // con esto hacemos que la bola se afecte por los bordes del juego, por lo que no se podrá salir del área del juego.
      this.ball.setCollideWorldBounds(true);
   
      // con esto indicamos que la bola estar pegada a la plataforma
      this.ball.setData('glue', true);


      
      // Colisiones que ejecutan métodos
      // estableciendo los elementos que colisionaran, de esta manera la bola no pasara por encima de la plataforma si no que colisionaran
      // Los dos primeros parámetros son necesarios siempre. El resto son opcionales. 
      /* 1- Objeto de colisión 1: el primer objeto sobre el que se configura la colisión.
         2- Objeto de colisión 2: el segundo objeto implicado en la colisión. 
         3- Callback de colisión: es una función que se ejecutará cuando los dos elementos se han chocado.
         4-Callback para decidir si hay colisión: esta sería una función que permite decidir si se debe ejecutar el comportamiento de colisión o no.  Es una función que siempre debe devolver un boleano. Si le entregamos null, entonces cada que se toquen los elementos se producirá el comportamiento de colisión.
         -El contexto Este contexto será habitualmente "this", para que dentro del código de la función, la variable this siga siendo igual a la escena sobre la que estamos trabajando.
      */
         // estableciendo colisones para la bola y la plataforma
         this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

     

        // estableciendo colisones para los bloques
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);


        // añadiendo un texto
        this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { 
          fontSize: '20px', 
          fill: '#fff', 
          fontFamily: 'verdana, arial, sans-serif' 
        });

/*       // calculando la velocidad horizontal de manera aleatoria
      // obtendra numeros de minimo 130 y maximo 200
      let velocity = 100 * Phaser.Math.Between(1.3, 2);

      // condicionar si el numero random que produce el metodo es mayor a 5 si es asi la establecemos la direccion en la que ira la bola en negativo (izquierda), caso contrario lo dejamos en positivo (derecha)
      if (Phaser.Math.Between(0, 10) > 5) {
        velocity = 0 - velocity;
      }
      this.ball.setVelocity(velocity, 10); */

      

 /*      // añadiendo el panel de fin del juego
      this.gameoverImage = this.add.image(400, 90, 'gameover');
      this.gameoverImage.visible = false;


      // añadiendo imagen cuando se rompan todos los bloques
      this.congratsImage = this.add.image(400, 90, 'congratulations');
      this.congratsImage.visible = false; */


    }



     // recordemos que el metodo update se ejecutara a lo largo del juego buscando cambios constantemente
    update() {
      // cuando se mueva a la izquierda, moveremos la plataforma a la izquierda tambien
      if (this.cursors.left.isDown) {
        this.platform.setVelocityX(-500);
        // tambien corroboramos si existe la propiedad glue si es asi moveremos la bola a la par de la plataforma
          if(this.ball.getData('glue')) {
            this.ball.setVelocityX(-500);
          }

      }

      // cuando se mueva a la derecha, moveremos la plataforma a la derecha tambien
      else if (this.cursors.right.isDown) {
        this.platform.setVelocityX(500);
         // tambien corroboramos si existe la propiedad glue si es asi moveremos la bola a la par de la plataforma
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(500);
          }

      }

      // si no se presiona nada se establecera una velocidad de 0 es decir estara quieto
      else {
        this.platform.setVelocityX(0);

          // corroborando si existe una propiedad glue en la bola si es asi quiere desir que aun no se desprende de la plataforma
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(0);
          }

      }

      // aqui buscaremos el instante en el que la bola ha llegado a los límites inferiores, recordemos que la escena tien un alto de 500 si y  es mayor a 500 = 501, 502 etc quiere decir que ya bajamos demasiado recordemos tambien que Y en positivo hace referencia a abajo, mientras que Y en negativo hace referencia a arriba
      if (this.ball.y > 500 && this.ball.active) {
        console.log('fin', this.ball.y, this.ball, '--');
        this.endGame();
       /*  this.gameoverImage.visible = true;
        this.scene.pause();
        // cuando perdamos tambien haremos desaparecer los bloques
        this.bricks.setVisible(false); */
      }

      // aqui corroboramos si el usuario ha pulsado la flecha de arriba
      if (this.cursors.up.isDown) {
        // corroboramos tambien si la bola tiene la propiedad glue
          if (this.ball.getData('glue')) {
            // si es asi quiere decir que la bola aun no se ha desprendido de la plataforma y entonces la mandaremos para arriba un poco a la izquierda
            this.ball.setVelocity(-60, -300);
            // luego seteamos la propiedad glue en false para que ya no tenga efecto otra vez al presionar hacia arriba
            this.ball.setData('glue', false);
          }
      }

    }
  


    // metodo que se ejecutara cada que halla una colision
    // basicamente lo que hacemos es calcular donde esta la posicion de la bola y la plataforma si al hacer la diferencia de sus posiciones me da positivo quiere decir que la bola ha impactado a la derecha de la plataforma, si sale negativo quiere decir que la bola impacto a la izquierda, si da cero quiere decir que impacto en el medio 
    platformImpact(ball, platform) {
      console.log(ball);
      console.log(platform);
      // cuando el juego choque a la plataforma llamamos al metod que se encarga de incrementar el score y le pasamos 1
      this.increasePoints(1);
      // luego hacemos los calculos de las posiciones de la bola y la plataforma
      let relativeImpact = ball.x - platform.x;

      if(relativeImpact > 0) {
        console.log('derecha!');
        ball.setVelocityX(8 * relativeImpact);
      } 

      else if(relativeImpact < 0) {
        console.log('izquierda!');
        ball.setVelocityX(8 * relativeImpact);
      }

      else {
        console.log('centro!!');
        ball.setVelocityX(Phaser.Math.Between(-10, 10))
      }
    }

    // metodo que se encargara de borrar los bloques
    brickImpact(ball, brick) {
      brick.disableBody(true, true);
      // cuando rompamos un bloque tambien aumentaremos el score en 10 con el metodo increasePoints 
      this.increasePoints(10);
      // cuando ya no hallan mas bloques por romper
      if (this.bricks.countActive() === 0) {
        this.endGame(true);
        // mostraremos una imagen de felicitaciones
        /* this.congratsImage.visible = true;
        this.scene.pause(); */
      }
    }


    // incrementando el marcador
    increasePoints(points) {
      this.score += points;
      this.scoreText.setText('PUNTOS: ' + this.score);
    }


    endGame(completed = false) {
      this.scene.pause();
      if(! completed) {
        // la escena se inicia con el método start() indicando el indentificador de la escena que quieres iniciar.
        this.scene.start('gameover');
      } else {
        this.scene.start('congratulations');
      }
    }
   

}

