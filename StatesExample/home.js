const HomeState = {
    preload: function () {
        
    },
    create: function () {
        Game.stage.backgroundColor = '#00FFFF'
        Game.add.text(Game.width / 2, Game.height / 2, "This is Home screen", { font: '40px', align: 'center', fill: '#000' }).anchor.setTo(0.5)
        // Game.input.onDown.add(function () {
        //     console.log('Going to first level')
        //     Game.state.start('FirstLevel')
        // })
        let startButton = Game.add.text(Game.width / 2, Game.height / 2 + 100, "START", { font: '20px', align: 'center', fill: '#000' })
        startButton.anchor.setTo(0.5)
        startButton.inputEnabled = true
        startButton.events.onInputDown.add(goToFirstLevel)
    }
}

