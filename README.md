# phaser
## Ciclo de vida de una escena de Phaser ##
En todo momento vamos a usar el modelo de creación de escenas basado en una clase ES6, sin embargo, conviene decir que Phaser 3 hereda un método de creación de escena basado en un objeto


## constructor
El constructor es un método que resume las tareas de inicialización de los objetos. En Phaser es el lugar adecuado para colocar código de configuración de la escena, que se ejecutará una única vez.
Lo más básico es asignarle un nombre a la escena,

## Método init()
este metodo ejecuta funciones o tareas de inicializacion,  pero recalcar que este metodo init solo se ejecutara cuando la escena se aborte por completo , como cuando se resetea y/o se inicia una nueva partida, si solo se detuvo unos instantes pues este metodo init no tendra efecto 


# Método preload()
este metodo sirve para pregarcar o "alistar" recursos que necesitaremos para una escena o para futuras escenas, asignarles ids para identificarlos a futuro, etc


## Método create()
este metodo se ejecuta despues de que los recursos se hallan precargado o "alistado", va construyendo la escena y lo que influya en ella, tambien definiremos comportamientos, animaciones, fisicas, ect.


# Método update()
este metodo estara en constante ejecucion ya que sera el encargado de responder a las acciones del usuario, como la pulsacion de teclas, mouse, etc
segun las acciones del usuario es que se ejecutara cualquier logica que creamos conveniente como mover un elemento de la escena del juego y mas.



## Colisiones y rebotes en Phaser ##


## Grupos de elementos en Phaser ## 
Esta parte nos ayudará a entender una de las posibilidades más útiles de Phaser, que es la creación de grupos de elementos. Estos grupos son tan interesantes porque permiten definir de una única vez acciones y comportamientos que compartirán todos los elementos del grupo
lo bueno de los grupos es que permiten configuraciones comunes para todos los elementos.



## Gestión de escenas en Juegos ##
Una escena es como una pantalla o una fase del juego independiente, que mantiene su propio flujo de ejecución también de manera independiente de otras escenas del juego.
colocando nuevas escenas : en el objeto config su propiedad scene: [Game, Gameover, Congratulations],
cada escena sera una clase distinta





## sprites ##
los sprites son distintos fotogramas de una imagen, que si los pasamos en secuencia producen animaciones, como el movimiento de un personaje.
