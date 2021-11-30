const Game = new Phaser.Game(600, 600, Phaser.AUTO, 'GameCanvas', { create })

function create() {
    Game.stage.backgroundColor = '#5A0002'
    Game.scale.pageAlignHorizontally = true

    let text = 'Hello, World!'

    let fruits = ["Apple", "Orange", "Plum"]

    let singeFruite = fruits[1]
    // fruits[1] = "Banana"

    // fruits.length
    // fruits[length] = "grape"
    
    // let arr = [-2.1, "Mango", 36, true, function() {alert('fsadf')}]

    // fruits.pop()
     fruits.push("Strawberry", "RaspBerry")

    // fruits.shift()
    // fruits.unshift("Pear", "Pear_2")

    let pos = fruits.indexOf("Orange")
    //["Apple", "Orange", "Plum","Strawberry", "RaspBerry"]
    fruits.splice(1, 3, "Banana", "Mango")
    //["Apple", "Banana", "Mango",  "RaspBerry"]    -   fruits
    let fruits_2 = fruits
    //["Apple", "Banana", "Mango",  "RaspBerry"]    -   fruits, fruits_2
    let fruits_3 = fruits.slice(0)
    //["Apple", "Banana", "Mango",  "RaspBerry"]    -   fruits, fruits_2
    //["Apple", "Banana", "Mango",  "RaspBerry"]    -   fruits_3
    fruits.pop()
    //["Apple", "Banana", "Mango"]    -   fruits, fruits_2
    //["Apple", "Banana", "Mango",  "RaspBerry"]    -   fruits_3

    // fruits_4 =  fruits_3.slice(1, 3)
    // fruits_4 = fruits_3.slice(-3)
    // fruits_4 = fruits_3.slice(1, -2)
    
    // for(let i=fruits_3.length - 1; i>=0; i--) {
    //     console.log(fruits_3[i])
    // }

    // for(let f of fruits_3) {
    //     console.log(f)
    // }

    //fruits_3.forEach(myFunction)
    fruits.forEach(myFunction)

    function myFunction(item, index, arr) {
        let info = "Index: " + index + ", Element: " + item
        console.log(info)
    }

    Game.add.text(Game.width / 2, Game.height / 2, fruits_4, { font: '20px', align: 'center', fill: '#fff' }).anchor.setTo(0.5)
}