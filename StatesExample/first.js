
const FirstState = {
    create: function () {
        Game.stage.backgroundColor = '#FF00FF'
        Game.add.text(Game.width / 2, Game.height / 2, "This is First Level", { font: '40px', align: 'center', fill: '#000' }).anchor.setTo(0.5)
        keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP)
        keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        console.log('Score: ' + CommonData.score)
        console.log('Lives: ' + CommonData.lives)
        CommonData.score += 50;
        CommonData.lives--;
    },
    update: function() {
        if(keyUp.isDown) {
            CommonData.goToHomeScreen()
        }
        if(keyDown.isDown) {
            console.log('Going to Second Level')
            Game.state.start('SecondLevel')
        }
    } 
}
