import css from './styles.css';
import Player from './factories/player';
import Gameboard from './factories/gameboard';
import Ship from './factories/ship';
import { createGame }  from './dom'

function initialize(name) {
    // Create Player
    const player1 = Player(name);
    const computer = Player("Computer");

    createGame();
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener(("click"), (e) =>  {
    const name = document.querySelector(".name-field").value;
    initialize(name);

})