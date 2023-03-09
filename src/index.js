import css from './styles.css';
import Player from './factories/player';
import Gameboard from './factories/gameboard';
import Ship from './factories/ship';
import { createGame, placeShipDOM, loadMainGame, updateGameBoard }  from './dom'


async function initialize(name) {
    // Create Player
    const player1 = Player(name);
    const computer = Player("Computer");

    let currentShip = null;

    createGame();

    currentShip = await placeShipDOM("Carrier", 5).then();
    player1.getGameboard().placeShip(Ship("Carrier", 5), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Battleship", 4).then();
    player1.getGameboard().placeShip(Ship("Battleship", 4), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Destroyer", 3).then();
    player1.getGameboard().placeShip(Ship("Destroyer", 3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Submarine", 3).then();
    player1.getGameboard().placeShip(Ship("Submarine", 3), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    currentShip = await placeShipDOM("Patrol Boat", 2).then();
    player1.getGameboard().placeShip(Ship("Patrol Boat", 2), { row: parseInt(currentShip.position[0].dataset.positionx), col: parseInt(currentShip.position[0].dataset.positiony) }, currentShip.isHorizontal);

    createComputerShips(computer);

    loadMainGame(player1.getName(), player1.getGameboard());

    playGame(player1, computer);
}

async function playGame(player, computer) {
    const computerBoard = document.querySelector(".computer-board");
    const computerFields = computerBoard.querySelectorAll(".field");

    while (!returnWinner(player, computer)) {
        await playerTurn(computer, computerFields);
        console.log(computer.getGameboard().getBoard());
        await computerTurn(player);
    }
    return;
    
}

function playerTurn(computer, fields) {
    return new Promise((resolve, reject) => {
        function handleClick(e) {
            computer.getGameboard().receiveAttack({ row: parseInt(e.target.dataset.positionx), col: parseInt(e.target.dataset.positiony) });
            updateGameBoard(computer);
            fields.forEach(field => {
                field.removeEventListener("click", handleClick);
            });
            resolve();
        }
        
        fields.forEach(field => {
            field.addEventListener("click", handleClick)
        });
    });
}

function computerTurn(player) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            player.getGameboard().receiveAttack({ row: generateRandomNumber(), col: generateRandomNumber() });
            updateGameBoard(player);
            resolve();
        }, 2000);
    });
}

function returnWinner(player, computer) {
    if (player.getGameboard().gameOver()) {
        return computer;
    } else if (computer.getGameboard().gameOver()) {
        return player;
    }
    return false;
}

function createComputerShips(computer) {
    const board = computer.getGameboard();

    callFunctionUntilTrue(() => board.placeShip(Ship("Carrier", 5), { row: generateRandomPlacement(5), col: generateRandomPlacement(5) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship("Battleship", 4), { row: generateRandomPlacement(4), col: generateRandomPlacement(4) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship("Destroyer", 3), { row: generateRandomPlacement(3), col: generateRandomPlacement(3) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship("Submarine", 3), { row: generateRandomPlacement(3), col: generateRandomPlacement(3) }, getRandomBoolean()));
    callFunctionUntilTrue(() => board.placeShip(Ship("Patrol Boat", 2), { row: generateRandomPlacement(2), col: generateRandomPlacement(2) }, getRandomBoolean()));
}

function generateRandomPlacement(length) {
    return Math.floor(Math.random() * (10 - length));
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
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
    if (name) {
        initialize(name);
    } else {
        alert("Name is required");
    }
})



const inputBox = document.querySelector(".name-field");
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement === inputBox) {
        const name = document.querySelector(".name-field").value;
        if (name) {
            initialize(name);
        } else {
            alert("Name is required");
        }
    }
})

