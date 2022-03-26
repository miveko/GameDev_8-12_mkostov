const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update})

let myPlayer;
let speed = 300;

function preload() {
    Game.load.spritesheet('player','Images/ninja_walk.png', 264 / 4, 300 / 4)
    Game.load.image('background', 'Images/landscape.jpg')
}

function create() {
    Game.add.sprite(0,0,'background')
    Game.world.setBounds(0,0, 1920, 1080)
    myPlayer = Game.add.sprite(Game.width / 2, Game.height / 2, "player")
    Game.physics.enable(myPlayer)
    myPlayer.body.collideWorldBounds = true
    myPlayer.animations.add("walkDown", [0, 1, 2, 3], 5, true)
    myPlayer.animations.add("walkLeft", [4, 5, 6, 7], 5, true)
    myPlayer.animations.add("walkRight", [8, 9, 10, 11], 5, true)
    myPlayer.animations.add("walkUp", [12, 13, 14, 15], 5, true)
    myPlayer.frame = 2

    Game.camera.follow(myPlayer, Phaser.Camera.FOLLOW_PLATFORMER, 0.5, 0.5)
    cursors = Game.input.keyboard.createCursorKeys()
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D)
}

function update() {
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

  if(keyW.isDown) {
    Game.camera.y -= 10;
  } 
  if(keyS.isDown) {
    Game.camera.y += 10;
  } 
  if(keyA.isDown) {
    Game.camera.x -= 10;
  } 
  if(keyD.isDown) {
    Game.camera.x += 10;
  } 
}