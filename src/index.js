import css from './styles.css';
import Player from './factories/player';
import Gameboard from './factories/gameboard';
import Ship from './factories/ship';
import { createGame, placeShips, placeShip, loadMainGame }  from './dom'


async function initialize(name) {
    // Create Player
    const player1 = Player(name);
    const computer = Player("Computer");

    let currentShip = null;

    createGame();

    currentShip = await placeShip("Carrier", 5).then();
    player1.getGameboard().placeShip(Ship(5), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShip("Battleship", 4).then();
    player1.getGameboard().placeShip(Ship(4), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShip("Destroyer", 3).then();
    player1.getGameboard().placeShip(Ship(3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShip("Submarine", 3).then();
    player1.getGameboard().placeShip(Ship(3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShip("Patrol Boat", 2).then();
    player1.getGameboard().placeShip(Ship(2), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    loadMainGame();
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener(("click"), (e) =>  {
    const name = document.querySelector(".name-field").value;
    initialize(name);

})

