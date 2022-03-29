CommonData = {
    lives: 4,
    score: 0,
    goToHomeScreen : function() {
        console.log('Going back to Home Screen')
        Game.state.start('HomeScreen')
    } 
}

function goToFirstLevel() {
    console.log('Going to First Level')
    Game.state.start('FirstLevel')
}