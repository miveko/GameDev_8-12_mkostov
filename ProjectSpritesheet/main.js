const Game = new Phaser.Game(600, 600, Phaser.AUTO, 'GameCanvas', {preload, create, update })
let explosion
let player
let velocity = 8
let keyLeft, keyRight
let animExploper

function preload() {
    // Game.load.image("bee", "bee.160x160.2x2.png")
    Game.load.spritesheet("bee", "bee.160x160.2x2.png", 160 / 2, 160 / 2)
    Game.load.spritesheet("explosion","explosion.320x320.5x5.png", 320 / 5, 320 / 5)
    Game.load.spritesheet("dude","dude-blue.288x40.9x1.png", 288 / 9, 40 /1)
}

function create() {
    Game.stage.backgroundColor = Phaser.Color.getRandomColor()

    let myHero = Game.add.sprite(100,200, "bee")
    // myHero.frame = 2;
    // let animaciq = myHero.animations.add("beeFlies", [], 10, true).play()
    myHero.animations.add("beeFlies", [], 1, true)
    myHero.animations.add("beeFlies", [], 10, true)
    myHero.animations.play("beeFlies")
    player = Game.add.sprite(Game.width / 2, Game.height / 2, "dude")
    player.frame = 4
    player.animations.add("walkLeft", [0, 1, 2, 3], 5, true)
    player.animations.add("stay", [4], 1, false)
    player.animations.add("walkRight", [5,6,7,8], 5, true)


    explosion = Game.add.sprite(0,0, "explosion")
    animExploper = explosion.animations.add("blow", [], 25, true)
    animExploper.play()
    keyLeft = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    keyRight = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

}

function update() {
    if(keyLeft.isDown) {
        player.x -= velocity
        player.animations.play("walkLeft")
    } 
    if(keyRight.isDown) {
        player.x += velocity
        player.animations.play("walkRight")
    } 
    if((!keyLeft.isDown && !keyRight.isDown) || (keyLeft.isDown && keyRight.isDown)) {
        player.animations.play("stay")
    }


    explosion.x++
    explosion.y--
}