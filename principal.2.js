var fondoJuego;

var nave;
var enemigo;


var balas;
var tiempoBala = 0;
var botonDisparo;

var ANCHO_WIN=370;
var ALTO_WIN=550;
var ALTOPERSONAJE=30;
var ANCHOPERSONAJE=38;

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
        juego.load.image('fondo' , 'img/space.png'); 
        juego.load.image('personaje' , 'img/nave.png');
        juego.load.image('laser' , 'img/laser.png');
        juego.load.image('enemigo', 'img/pajaro2.png');   

       
        
    },

    create: function(){
        //se ejecutará una vez se inicie el juego, y mostrará todos los recursos cargados en la función preload
        fondoJuego = juego.add.tileSprite(0, 0, ANCHO_WIN,ALTO_WIN, 'fondo');
        nave = juego.add.sprite(juego.width/2,juego.height/2,'personaje');
        nave.anchor.setTo(0.5,0.5);
        cursores = juego.input.keyboard.createCursorKeys();
        botonDisparo= juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //VAmos a crear un grupo de balas. Con esto no tenemos que crear balas cada vez que disparemos
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20,'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);

        var bala;
        
        // Vamos a crear un grupo de enemigos
     
        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
      

        for (var z = 0;z < 6; z++) {
            for (var p = 0;p < 7; p++) {
                var enemigo = enemigos.create(p*40, z*20,'enemigo');
                enemigo.anchor.setTo(0.5,0.5);
            }
        }

        enemigos.x = 110;
        enemigos.y = 50;

        var animacion = 
        juego.add.tween(enemigos).to({x:10}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
        animacion.onRepat.add(descender, this);

    },

    update: function(){
        //Animamos el juego. Movimiento del personaje, acciones que se producen ante colisiones, ...
        

        if(cursores.right.isDown) {
            nave.position.x +=3;
        }
        else if (cursores.left.isDown){
            nave.position.x -=3;
        }
        else if (cursores.up.isDown) {
            nave.position.y -=3;
        } 
        else if (cursores.down.isDown) {
            nave.position.y +=3;
        } 
           if (botonDisparo.isDown) {
           
            if (juego.time.now > tiempoBala){
                bala = balas.getFirstExists(false);
            }
            if (bala){
                bala.reset(nave.x,nave.y);
                bala.body.velocity.y= -300;
                tiempoBala = juego.time.now + 100;
            }
        }
 
    }

};

function descender() {
    
    enemigos.y += 10;
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');