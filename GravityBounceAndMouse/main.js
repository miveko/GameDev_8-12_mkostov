const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'GameCanvas', { preload, create, update }) 

let textObject, ball;
let text = "";

function preload() {
    Game.load.image("ball", "basketBall.png")
}

let randomNumber = 0

function create() {
    Game.stage.backgroundColor = Phaser.Color.getRandomColor();
    textObject = Game.add.text(Game.width / 2, 0, text, {font: "20px Arial", fill: "#ffffff"});
    textObject.anchor.setTo(0.5, 0);
    Game.physics.enable(textObject);
    //textObject.body.gravity.y = 300;
    //textObject.body.bounce.y = 0.8;
    textObject.body.collideWorldBounds = true;

    ball = Game.add.sprite(Game.width / 2, Game.height /2, "ball")
    ball.scale.setTo(0.1)
    ball.anchor.setTo(0.5)
    Game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    //ball.body.gravity.setTo(0, 150)
    //ball.body.gravity.setTo(150);
    // ball.body.gravity.x = 0;
    // ball.body.gravity.y = 250
    //ball.body.bounce.setTo(1)
    ball.inputEnabled = true;
    ball.events.onInputDown.add(onMouseClick);
    ball.input.enableDrag(true);
    // ball.body.velocity.x = 50

    console.log(Game.input.mousePointer)

    Game.input.onTap.add(function () {
        click(Game.input.mousePointer);
    })

    cursors = Game.input.keyboard.createCursorKeys()
}

function update() {
    moveBall();
    text = "The mouse position is X=" + Game.input.mousePointer.x + " Y= " + Game.input.mousePointer.y;
    textObject.setText(text);
   // Game.physics.arcade.moveToObject(textObject, ball, 50, 2000);

   if(cursors.up.isDown) {       
    tween = Game.add.tween(textObject).to({ x: textObject.x, y: textObject.y - 100 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
   }
}

function click(position) {
    if(Game.input.mousePointer.x >   ball.x) {
        ball.angle += 45;
    } else {
        ball.angle -= 45;
    }
    console.log(ball.angle);

   // tween = Game.add.tween(textObject).to({ x: position.x, y: position.y }, 2000, Phaser.Easing.Bounce.InOut, true, 0, -1, true)
   tween = Game.add.tween(textObject).to({ x: position.x, y: position.y }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false)
}

function onMouseClick() {
   ball.body.velocity.x *= -1;
}

function moveBall() {
    if(cursors.down.isDown) {
        ball.body.velocity.y = 25;
    } else if(cursors.up.isDown) {
        ball.body.velocity.y = -25;
    } else {
        ball.body.velocity.y = 0;
    }
}