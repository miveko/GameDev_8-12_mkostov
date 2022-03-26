const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update})

let myPlayer, mapObjects;
let speed = 200;

function preload() {
    Game.load.image('tileset_1_terrain_2','Images/32x32_tileset_terrains_2.png')
    Game.load.image('tileset_2_woodland','Images/32x32_tileset_woodland.png')
    Game.load.tilemap('tilemap', 'MyMap_addLayer3.json', null, Phaser.Tilemap.TILED_JSON)
    Game.load.spritesheet('player','Images/ninja_walk.png', 264 / 4, 300 / 4)
}

function create() {
    // Game.stage.backgroundColor = '#ffffff'
    Game.add.sprite(0,0,'background')
    Game.world.setBounds(0,0, 1920, 1080)

    const map = Game.add.tilemap('tilemap')
    map.addTilesetImage('32x32_tileset_terrains_2', 'tileset_1_terrain_2')
    map.addTilesetImage('32x32_tileset_woodland', 'tileset_2_woodland')

    map.createLayer(1)  //map.createLayer("Tile Layer 2")

    myPlayer = Game.add.sprite(Game.width / 2, Game.height / 2, "player")
    myPlayer.scale.setTo(0.6)
    Game.physics.enable(myPlayer)
    myPlayer.animations.add("walkDown", [0, 1, 2, 3], speed / 20, true)
    myPlayer.animations.add("walkLeft", [4, 5, 6, 7], speed / 20, true)
    myPlayer.animations.add("walkRight", [8,9,10,11],  speed / 20, true)
    myPlayer.animations.add("walkUp", [12,13,14,15],  speed / 20, true)
    myPlayer.frame = 2
    
    mapObjects = map.createLayer(0) //map.createLayer("Tile Layer 1")
    map.setCollisionByExclusion([])
    map.createLayer(2) //map.createLayer("Tile Layer 3")

    Game.camera.follow(myPlayer, Phaser.Camera.FOLLOW_PLATFORMER, 0.5, 0.5)
    cursors = Game.input.keyboard.createCursorKeys()
}

function update() {

  if(cursors.up.isDown) {
    myPlayer.body.velocity.y = -speed;
    myPlayer.animations.play("walkUp")
  } else if(cursors.down.isDown) {
    myPlayer.body.velocity.y = speed;
    myPlayer.animations.play("walkDown")
  } else {
    myPlayer.body.velocity.y = 0;
  }

  if(cursors.right.isDown) {
    myPlayer.body.velocity.x = speed;
    myPlayer.animations.play("walkRight")
  } else if(cursors.left.isDown) {
    myPlayer.body.velocity.x = -speed;
    myPlayer.animations.play("walkLeft")
  } else {
    myPlayer.body.velocity.x = 0;
  }

  if(myPlayer.body.velocity.x == 0 && myPlayer.body.velocity.y == 0) {
    myPlayer.frame = 2
  }


  Game.physics.arcade.collide(myPlayer, mapObjects)

  // console.log("velocity.x" + myPlayer.body.velocity.x);
  // console.log("velocity.y" + myPlayer.body.velocity.y);
}