import css from './styles.css';
import Player from './factories/player';
import Gameboard from './factories/gameboard';
import Ship from './factories/ship';
import { createGame, placeShips, placeShipDOM, loadMainGame }  from './dom'


async function initialize(name) {
    // Create Player
    const player1 = Player(name);
    const computer = Player("Computer");

    let currentShip = null;

    createGame();

    currentShip = await placeShipDOM("Carrier", 5).then();
    player1.getGameboard().placeShip(Ship(5), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Battleship", 4).then();
    player1.getGameboard().placeShip(Ship(4), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Destroyer", 3).then();
    player1.getGameboard().placeShip(Ship(3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Submarine", 3).then();
    player1.getGameboard().placeShip(Ship(3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Patrol Boat", 2).then();
    player1.getGameboard().placeShip(Ship(2), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    createComputerShips(computer);

    loadMainGame(player1.getName(), player1.getGameboard());
}

function createComputerShips(computer) {
    const board = computer.getGameboard();

    callFunctionUntilTrue(() => board.placeShip(Ship(5), { row: generateRandomNumber(5), col: generateRandomNumber(5) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship(4), { row: generateRandomNumber(4), col: generateRandomNumber(4) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship(3), { row: generateRandomNumber(3), col: generateRandomNumber(3) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship(3), { row: generateRandomNumber(3), col: generateRandomNumber(3) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship(2), { row: generateRandomNumber(2), col: generateRandomNumber(2) }, getRandomBoolean()));
}

function generateRandomNumber(length) {
    return Math.floor(Math.random() * (11 - length)) + 1;
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}
  
function callFunctionUntilTrue(func) {
    let result = false;
    while (!result) {
        result = func();
    }
    return result;
}


const startButton = document.querySelector(".start-button");
startButton.addEventListener(("click"), (e) =>  {
    const name = document.querySelector(".name-field").value;
    initialize(name);

})

const inputBox = document.querySelector(".name-field");
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement === inputBox) {
        const name = document.querySelector(".name-field").value;
        initialize(name);
    }
})

