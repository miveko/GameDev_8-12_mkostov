const Game = new Phaser.Game(600, 600, Phaser.AUTO, 'GameCanvas')

Game.state.add('HomeScreen', HomeState)
Game.state.add('FirstLevel', FirstState)
Game.state.add('SecondLevel', SecondState)

Game.state.start('HomeScreen')
