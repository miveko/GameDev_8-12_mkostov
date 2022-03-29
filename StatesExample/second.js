const SecondState = {
    create: function () {
        Game.stage.backgroundColor = '#FFFF00'
        Game.add.text(Game.width / 2, Game.height / 2, "This is Second Level", { font: '40px', align: 'center', fill: '#000' }).anchor.setTo(0.5)
        keyLeft = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        keyEscape = Game.input.keyboard.addKey(Phaser.Keyboard.ESC)
        console.log('Score: ' + CommonData.score)
        console.log('Lives: ' + CommonData.lives)
    },
    update: function() {
        if(keyEscape.isDown) {
            CommonData.goToHomeScreen()
        }
        if(keyLeft.isDown) {
            goToFirstLevel()
        }
    } 
}
