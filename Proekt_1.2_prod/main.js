const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update }) 

let velosity = 10
let shurikenSpeed = 20;
let p1_canShoot = true;
let p2_canShoot = true;
let p1_shuriken; //шурикен, който се изстрелва от player_1
let p2_shuriken; //шурикен, който се изстрелва от player_2
let result = "0 - 0"
let text_result

function preload() {
    Game.load.image("ninja", "ninja3.png")
    Game.load.image("shuriken","shuriken.png")
}

let randomNumber = 0

function create() {
    Game.stage.backgroundColor = Phaser.Color.getRandomColor()
    text_result = Game.add.text(Game.width / 2, 0, result, {font: "50px Arial", fill: "#ffffff"})
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
    updatePlayerOnePosition() 
    updatePlayerTwoPosition()
    updateShurikens()
    Game.physics.arcade.collide(player_1, p2_shuriken, P1_Sh2_collision)
    Game.physics.arcade.collide(player_2, p1_shuriken, P2_Sh1_collision)
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
    if((keyD.isDown || keyShift.isDown) && (p1_canShoot)) {
        //player_1 изтрелва шурикен
        p1_shuriken = Game.add.sprite(player_1.width, player_1.y, "shuriken")
        p1_shuriken.scale.setTo(0.05)
        p1_canShoot = false
        Game.physics.enable(p1_shuriken)
    }

    if(!p1_canShoot) {
        p1_shuriken.x += shurikenSpeed
        if(p1_shuriken.x > Game.width) {
            p1_canShoot = true
        }
    }

    if(keyLeft.isDown && p2_canShoot) {
        //player_1 изтрелва шурикен
            p2_shuriken = Game.add.sprite(Game.width - player_2.width, player_2.y, "shuriken")
            p2_shuriken.scale.setTo(0.05)
            p2_shuriken.x -= p2_shuriken.width
            p2_canShoot = false
            Game.physics.enable(p2_shuriken)
    }

    if(!p2_canShoot) {
        p2_shuriken.x -= shurikenSpeed 
        if(p2_shuriken.x + p2_shuriken.width < 0) {
            p2_canShoot = true
        }
    }
}

function P1_Sh2_collision() {
    player_1.destroy()
    player_1 = null
    p2_canShoot = true
    alert("Player 2 wins. Press F5 to start a new game...")
}

function P2_Sh1_collision() {
    player_2.destroy()
    player_2 = null
    p1_canShoot = true
    alert("Player 1 wins. Press F5 to start a new game...")
}