import css from './styles.css';
import Player from './factories/player';
import Gameboard from './factories/gameboard';
import Ship from './factories/ship';
import { createGame, placeShips, placeShip, loadMainGame }  from './dom'


async function initialize(name) {
    // Create Player
    const player1 = Player(name);
    const computer = Player("Computer");

    const domToLogic = (currentShip) => {
        player1.getGameboard().placeShip(Ship(5),4 ,true)
    }

    createGame();

    await placeShip("Carrier", 5);
    await placeShip("Battleship", 4);
    await placeShip("Destroyer", 3);
    await placeShip("Submarine", 3);
    await placeShip("Patrol Boat", 2);
    loadMainGame();
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener(("click"), (e) =>  {
    const name = document.querySelector(".name-field").value;
    initialize(name);

})

