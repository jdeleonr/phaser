var fondoJuego;

var y=1;
var x=0;
var persona;

var ANCHO_WIN=370;
var ALTO_WIN=550;
var ALTOPERSONAJE=42;
var ANCHOPERSONAJE=30;

var mirando="arriba";

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

        // spritesheet permite cargar una imagen con varios frames
        juego.load.spritesheet('personas','img/persona.png',64,64);

        
    },

    create: function(){
        //se ejecutará una vez se inicie el juego, y mostrará todos los recursos cargados en la función preload
        fondoJuego = juego.add.tileSprite(0, 0, ANCHO_WIN,ALTO_WIN, 'fondo');
        persona=juego.add.sprite(juego.width/2,juego.height/2,'personas');
        persona.anchor.setTo(0.5,0.5);

        persona.animations.add('arriba', [0,1,2,3,4,5,6,7,8], 10, true); 
        persona.animations.add('izquierda', [9,10,11,12,13,14,15,16,17], 10, true); 
        persona.animations.add('abajo', [18,19,20,21,22,23,24,25,26], 10, true); 
        persona.animations.add('derecha', [27,28,29,30,31,32,33,34], 10, true); 

        // Para generar todas las teclas del cursor y poder controlarlas en vez de una a una
        cursores = juego.input.keyboard.createCursorKeys();

        // Para controlar el límite de la pantalla, y que el personaje no se salga de los margenes, colisiones,
        //condiciones físicas como la gravedad, etc.
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Asignamos las propiedades físicas al personaje
        juego.physics.arcade.enable(persona);

        persona.body.collideWorldBounds = true;  //Activamos los límites de la pantalla al personaje

    },

    update: function(){
        //Animamos el juego. Movimiento del personaje, acciones que se producen ante colisiones, ...
        
        fondoJuego.tilePosition.x -= 1;

        // para ejecutar la animación
        //persona.animations.play('vuelo');


        if (cursores.right.isDown) {
            persona.animations.play('derecha');
            persona.position.x += 1;
           
            if(mirando != "derecha") {
                mirando="derecha";
            }

        }
        else if (cursores.left.isDown) {

           persona.animations.play('izquierda');
            persona.position.x -= 1;
            
            if(mirando != "izquierda") {
                mirando="izquierda";
            }

        }
        else if (cursores.up.isDown) {
            
            persona.animations.play('arriba');
            persona.position.y -= 1;
            
            if(mirando != "arriba") {
                mirando="arriba";
            }

        }
        else if (cursores.down.isDown) {
            
           persona.animations.play('abajo');
            persona.position.y += 1;
            
            if(mirando != "abajo") {
                mirando="abajo";
            }

        }    
        else {
            if (mirando != "espera") {
                persona.animations.stop();
            }
            mirando="espera";
        }    
    }

};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');