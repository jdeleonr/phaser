var fondoJuego;
var boton;
var flappy;
var y=1;
var x=0;


/*
var teclaDerecha;
var teclaizquierda;
var teclaarriba;
var teclaabajo;
*/

var ANCHO_WIN=370;
var ALTO_WIN=550;
var ALTOPERSONAJE=42;
var ANCHOPERSONAJE=30;

// Definimos la variable juego, y la instanciamos con Phaser.Game
// Los parámetros de entrada son: ancho y alto de la pantalla, un rendering  compilador para el juego,
// y el bloque dentro de index.html donde queremos que se muestre el juego;

// Ver 1.0 var juego = new Phaser.Game(200,300, Phaser.AUTO,'bloque_juego')
var juego = new Phaser.Game(ANCHO_WIN,ALTO_WIN, Phaser.CANVAS,'bloque_juego');



//Lo primero es crear el primer estado del juego

var estadoPrincipal = {

    preload: function() {
        //carga todos los recursos de nuestro juego.

        //juego.stage.backgroundColor = "#000";
        juego.load.image('fondo','img/bg.jpeg');
        juego.load.image('pajaro','img/pajaro1.png');
        //juego.load.image('btn','img/btn.png');

        // spritesheet permite cargar una imagen con varios frames
        juego.load.spritesheet('pajaros','img/pajaro.png',43,30);
        
        
    },

    create: function(){
        //se ejecutará una vez se inicie el juego, y mostrará todos los recursos cargados en la función preload
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');
        //juego.add.sprite(0,0,'pajaro');

        //boton = juego.add.sprite(juego.width/2,juego.height/2, 'btn');
        //boton.anchor.setTo(0.5);
        flappy = juego.add.sprite(juego.width/2,juego.height/2,'pajaros');
        //Esto fija el primer frame de la imagen compuesta.
        flappy.frame=0;
        flappy.anchor.setTo(0.5,0.5);
        flappy.scale.setTo(1,1);
        // Vamos a crear la animacion del pájaro. Se le pone un nombre a la
        // animación, luego el orden de los frames que queremos ver de la imagen
        // el número de frames por segundo, y true
        flappy.animations.add('vuelo', [0,1,2], 10, true );
        /*
        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        */


        // Para generar todas las teclas del cursor y poder controlarlas en vez de una a una
        cursores = juego.input.keyboard.createCursorKeys();

        // Para controlar el límite de la pantalla, y que el personaje no se salga de los margenes, colisiones,
        //condiciones físicas como la gravedad, etc.
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Asignamos las propiedades físicas al personaje
        juego.physics.arcade.enable(flappy);

        flappy.body.collideWorldBounds = true;  //Activamos los límites de la pantalla al personaje

    },

    update: function(){
        //Animamos el juego. Movimiento del personaje, acciones que se producen ante colisiones, ...
        
        fondoJuego.tilePosition.x -= 1;
        /*
        x +=1;
        if (x==50) {
            y *=-1;
            flappy.scale.setTo(1,y);
            x=0;
        }
        flappy.angle+=0.2;
        */

        // para ejecutar la animación
        flappy.animations.play('vuelo');

        /*
        if (teclaDerecha.isDown) {
            
            if( flappy.position.x < (ANCHO_WIN-(ANCHOPERSONAJE/2)-5))
             flappy.position.x += 1;
            //flappy.angle = 90;

        }

        */


        if (cursores.right.isDown) {
            
           // if( flappy.position.x < (ANCHO_WIN-(ANCHOPERSONAJE/2)-5)) // El control manual no es necesario una vez se ha añadido el Sistema Físico
             flappy.position.x += 1;
            //flappy.angle = 90;

        }
        if (cursores.left.isDown) {

            //if( flappy.position.x > (ANCHOPERSONAJE/2)+5)            
            flappy.position.x -= 1;
            

        }
        if (cursores.up.isDown) {
            
            //if( flappy.position.y > (ALTOPERSONAJE/2)-4)
            flappy.position.y -= 1;
            

        }
        if (cursores.down.isDown) {
            
            //if( flappy.position.y < ALTO_WIN-(ALTOPERSONAJE/2)+4)
            flappy.position.y += 1;
            

        }        
    }

};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');