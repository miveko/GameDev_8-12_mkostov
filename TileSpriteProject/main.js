const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update})

let myPlayer;
let speed = 300;
let fon;

function preload() {
    Game.load.spritesheet('player','Images/ninja_walk.png', 264 / 4, 300 / 4)
    Game.load.image('background', 'Images/download2.png')
    Game.load.image('background_2', 'Images/download_800_600.png')
    Game.load.image('back_star', 'Images/star.png')
    Game.load.image('back_star2', 'Images/star_2.png')
}

function create() {
    fon = Game.add.tileSprite(0,0, Game.width, Game.height, 'background')
    const fonstar = Game.add.tileSprite(0,0, Game.width, Game.height, 'back_star')
    const fonstar2 = Game.add.tileSprite(0,0, Game.width, Game.height, 'back_star2')
    const fon2 = Game.add.tileSprite(0,0, Game.width, Game.height, 'background_2')
    fon.autoScroll(50,50)
    fon2.autoScroll(50,0)
    fonstar.autoScroll(0, 100)
    fonstar2.autoScroll(0, 100)
    fon.alpha = 0.8
    myPlayer = Game.add.sprite(Game.width / 2, Game.height / 2, "player")
    Game.physics.enable(myPlayer)
    myPlayer.body.collideWorldBounds = true
    myPlayer.animations.add("walkDown", [0, 1, 2, 3], 5, true)
    myPlayer.animations.add("walkLeft", [4, 5, 6, 7], 5, true)
    myPlayer.animations.add("walkRight", [8, 9, 10, 11], 5, true)
    myPlayer.animations.add("walkUp", [12, 13, 14, 15], 5, true)
    myPlayer.frame = 2

    cursors = Game.input.keyboard.createCursorKeys()
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D)
}

function update() {
  // fon.tilePosition.x -= 5
  // fon.tilePosition.y += 5

  if(cursors.up.isDown) {
    myPlayer.body.velocity.y = -speed;
    myPlayer.animations.play("walkUp")
  } else if(cursors.down.isDown) {
    myPlayer.body.velocity.y = speed;    
    myPlayer.animations.play("walkDown")
  } else myPlayer.body.velocity.y = 0;

  if(cursors.right.isDown) {
    myPlayer.body.velocity.x = speed;
    myPlayer.animations.play("walkRight")
  } else if(cursors.left.isDown) {
    myPlayer.body.velocity.x = -speed;
    myPlayer.animations.play("walkLeft")
  } else myPlayer.body.velocity.x = 0;

  if(myPlayer.body.velocity.x == 0 && myPlayer.body.velocity.y == 0) {
    myPlayer.frame = 2
  }

}