const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update }) 

let velosity = 10
let shurikenSpeed = 20;
let p1_canShoot = true;
let p2_canShoot = true;
let p1_shurikens = []; //шурикени, които се изстрелват от player_1
let p2_shurikens = []; //шурикени, които се изстрелват от player_2
let p1_blood = 100;
let p2_blood = 100;
const damage = 15       // поражението, което нанася един шурикен при сблъсък с играч
let result = p1_blood + " :: " + p2_blood   //текст с резултата 
let text_result

function preload() {
    Game.load.image("ninja", "ninja3.png")
    Game.load.image("shuriken","shuriken.png")
}

let randomNumber = 0

function create() {
    Game.stage.backgroundColor = Phaser.Color.getRandomColor()
    text_result = Game.add.text(Game.width / 2, 0, result, {font: "50px Arial", fill: "#ffffff"}) //визуалният обект, който изобразява резултата
    text_result.anchor.x = 0.5
    player_1 = Game.add.sprite(0, 0, "ninja")
    player_1.scale.setTo(.5)
    Game.physics.enable(player_1)
    player_1.body.collideWorldBounds = true

    player_2 = Game.add.sprite(0, 0, "ninja")
    player_2.scale.setTo(0.5)
    player_2.x = Game.width - player_2.width
    Game.physics.enable(player_2)

    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP)
    keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyShift = Game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    keyLeft = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
}

function update() {
    checkIfPlayersAreDead()
    updatePlayerOnePosition() 
    updatePlayerTwoPosition()
    updateShurikens()
    for(let shuriken of p2_shurikens) {
        Game.physics.arcade.collide(player_1, shuriken, P1_Sh2_collision)
    }
    for(let shuriken of p1_shurikens) {
        Game.physics.arcade.collide(player_2, shuriken, P2_Sh1_collision)
    }

    result = p1_blood + " :: " + p2_blood   //обновяваме текст с резултата 
    text_result.setText(result) //поставяме това да бъде текста, който се показва от визулния обект text_result
}

function updatePlayerOnePosition() {
    if(keyW.isDown) {
        player_1.y -= velosity
    }

    if(keyS.isDown) {
        player_1.y += velosity
    }
}

function updatePlayerTwoPosition() {
    if(keyUp.isDown) {
        player_2.y -= velosity
        if(player_2.y < 0) {
            player_2.y = 0
        }
    }

    if(keyDown.isDown) {
        player_2.y += velosity
        if(player_2.y + player_2.height > 600) {
            player_2.y = 600 - player_1.height
        }
    }
}

function updateShurikens() {
    if((keyD.isDown || keyShift.isDown) && p1_shurikens.length < 3) {
        //player_1 изтрелва шурикен
        shuriken = Game.add.sprite(player_1.width, player_1.y, "shuriken")
        shuriken.scale.setTo(0.05)
        Game.physics.enable(shuriken)
        p1_shurikens.push(shuriken)
    }
 
    for(let i=0; i<p1_shurikens.length; i++) {
        p1_shurikens[i].x += shurikenSpeed
        if(p1_shurikens[i].x > Game.width) {    //проверка дали шурикенът е излязъл от играта
            p1_shurikens[i].destroy()       //ако да: унищожаваме го 
            p1_shurikens.splice(i, 1)       // и го премахваме от масива с шурикени на играч 1
        }
    }

    if(keyLeft.isDown && p2_shurikens.length < 3) {
        //player_1 изтрелва шурикен
            shuriken = Game.add.sprite(Game.width - player_2.width, player_2.y, "shuriken")
            shuriken.scale.setTo(0.05)
            shuriken.x -= shuriken.width
            Game.physics.enable(shuriken)
            p2_shurikens.push(shuriken)
    }

    for(let i=0; i<p2_shurikens.length; i++) {
        p2_shurikens[i].x -= shurikenSpeed 
        if(p2_shurikens[i].x + p2_shurikens[i].width < 0) {     //проверка дали шурикенът е излязъл от играта
            p2_shurikens[i].destroy()                       //ако да: унищожаваме го 
            p2_shurikens.splice(i, 1)                       // и го премахваме от масива с шурикени на играч 1
        }
    }
}

function P1_Sh2_collision(object1, object2) {
    p1_blood -= damage  //намаляваме кръвта на играч 1
    object2.destroy()   //унищожаваме шурикена
    pos = p2_shurikens.indexOf(object2) //намираме индекса на шурикена в масива от шурикени на играч 2
    p2_shurikens.splice(pos, 1)         // и го премахваме от масива с шурикени на играч 2
}

function P2_Sh1_collision(object1, object2) {
    p2_blood -= damage  //намаляваме кръвта на играч 2
    object2.destroy()   //унищожаваме шурикена
    pos = p1_shurikens.indexOf(object2) //намираме индекса на шурикена в масива от шурикени на играч 1
    p1_shurikens.splice(pos, 1)         // и го премахваме от масива с шурикени на играч 2
}

function checkIfPlayersAreDead() {
    if(p1_blood <= 0 && p2_blood <= 0) {
        alert("It's a draw")
    }
    if(p1_blood <= 0) {
        alert("Player 2 wins. Press F5 to start a new game...")
    }
    if(p2_blood <= 0) {
        alert("Player 1 wins. Press F5 to start a new game...")
    }    
}

function timerEventActinos() {    
}