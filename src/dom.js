import Player from "./factories/player";
import Gameboard from "./factories/gameboard";
import { initialize } from "./index";


function createGame() {
    const main = document.querySelector(".main");
    main.innerHTML = "";
    createInitLayout(main);
}

function createInitLayout(main) {
    const instructionText = document.createElement("h1");
    instructionText.classList.add("instruction-text");
    const axisButton = document.createElement("button");
    axisButton.classList.add("axis-button");
    axisButton.textContent = "AXIS: X";
    const board = document.createElement("div");
    board.classList.add("board");

    createBoard(board);

    main.appendChild(instructionText);
    main.appendChild(axisButton);
    main.appendChild(board);

    axisButton.addEventListener("click", () => {
        if (axisButton.textContent === "AXIS: X") {
            axisButton.textContent = "AXIS: Y";
            isHorizontal = false;
        } else {
            axisButton.textContent = "AXIS: X";
            isHorizontal = true;
        }
    });

}

async function placeShips() {
 
    await placeShip("Carrier", 5);
    await placeShip("Battleship", 4);
    await placeShip("Destroyer", 3);
    await placeShip("Submarine", 3);
    await placeShip("Patrol Boat", 2);

}

function placeShip(type, length) {
    const text = document.querySelector(".instruction-text");
    return new Promise((resolve, reject) => {
        text.textContent = "Place your " + type;

        const fields = document.querySelectorAll(".field");

        const mouseoverHandler = (event) => {
            highlightPotentialShip(event, length, false);
        };
        
        const clickHandler = (event) => {
            let currentShip = null;
            if (!isPlaced.includes(event.target)) {
                currentShip = highlightPotentialShip(event, length, true);
            }

            console.log(currentShip);
            if (highlightColor !== "#FF0000") {
                fields.forEach(field => {
                    field.removeEventListener("mouseover", mouseoverHandler);
                    field.removeEventListener("mouseout", mouseoutHandler);
                    field.removeEventListener("click", clickHandler);
                });

                resolve(currentShip);
            }

        };
        
        const mouseoutHandler = () => {
            fields.forEach(fieldToChange => {
                if(!checkIsPlaced(fieldToChange)) 
                    fieldToChange.style.backgroundColor = "#124459";
            });
        };
        
        fields.forEach(field => {
            field.addEventListener("mouseover", mouseoverHandler);
            field.addEventListener("click", clickHandler);
            field.addEventListener("mouseout", mouseoutHandler);
        });
    });
}


function highlightPotentialShip(event, length, definitive) {
    let currentShip = {
        position: [],
        isHorizontal: true
    }
    const fields = document.querySelectorAll(".field");
    if (isHorizontal) {
        currentShip.isHorizontal = true;
        for (let i = 0; i < length; i++) {
                if (parseInt(event.target.dataset.positiony) + length > 11) {
                    highlightColor = "#FF0000";
                } else {
                    highlightColor = "#EFF6E0";
                }
            fields.forEach(fieldToChange => {
                if (fieldToChange.dataset.positionx === event.target.dataset.positionx 
                    && parseInt(fieldToChange.dataset.positiony) === parseInt(event.target.dataset.positiony) + i) {
                    if (!isPlaced.includes(fieldToChange))
                        fieldToChange.style.backgroundColor = highlightColor;
                    if (definitive && highlightColor !== "#FF0000")
                        isPlaced.push(fieldToChange);
                        currentShip.position.push(fieldToChange);
                }
            });
        }
    } else {
        currentShip.isHorizontal = false;
        for (let i = 0; i < length; i++) {
            if (parseInt(event.target.dataset.positionx) + length > 11) {
                highlightColor = "#FF0000";
            } else {
                highlightColor = "#EFF6E0";
            }
            fields.forEach(fieldToChange => {
                if (fieldToChange.dataset.positiony === event.target.dataset.positiony 
                    && parseInt(fieldToChange.dataset.positionx) === parseInt(event.target.dataset.positionx) + i) {
                    if (!isPlaced.includes(fieldToChange))
                        fieldToChange.style.backgroundColor = highlightColor;
                    if (definitive && highlightColor !== "#FF0000")
                        isPlaced.push(fieldToChange);
                        currentShip.position.push(fieldToChange);
                }
            });
        }
    }
    
    return currentShip;
}

function loadMainGame(gameboard) {
    const main = document.querySelector(".main");
    main.innerHTML = "";

    const instructionBox = document.createElement("h1");
    instructionBox.classList.add("instruction-box");

    const playArea = document.createElement("div");
    playArea.classList.add("play-area");

    const playerArea = document.createElement("div");
    playerArea.classList.add("player-area");
    const computerArea = document.createElement("div");
    computerArea.classList.add("computer-area");

    const playerText = document.createElement("h2");
    playerText.classList.add("player-text");
    playerText.textContent = "Friendly Waters";
    
    const computerText = document.createElement("h2");
    computerText.classList.add("computer-text");
    computerText.textContent = "Enemy Waters";
    
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("player-board");
    playerBoard.classList.add("active-game-board");

    const computerBoard = document.createElement("div");
    computerBoard.classList.add("computer-board");
    computerBoard.classList.add("active-game-board");

    createBoard(playerBoard);
    createBoard(computerBoard);

    const playerFields = playerBoard.querySelectorAll(".field");

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameboard.getBoard()[i][j] !== null) {
                playerFields.forEach(field => {
                    if (parseInt(field.dataset.positionx) === i && parseInt(field.dataset.positiony) === j) {
                        field.style.backgroundColor = "#EFF6E0";
                    }
                })
            }
        }
    }

    playerArea.appendChild(playerText);
    playerArea.appendChild(playerBoard);
    computerArea.appendChild(computerText);
    computerArea.appendChild(computerBoard);
    playArea.appendChild(playerArea);
    playArea.appendChild(computerArea);
    main.appendChild(instructionBox);
    main.appendChild(playArea);
}

function createBoard(board) {
    for (let i = 1; i <= 10; i++){
        for (let j = 1; j <= 10; j++) {
            const field = document.createElement("div");
            field.classList.add("field");
            field.setAttribute("data-positionX", i);
            field.setAttribute("data-positionY", j);
            board.appendChild(field);
        }
    }
}

function checkIsPlaced(field) {
    if (isPlaced.includes(field))
        return true;
    return false;
}


let isHorizontal = true;
const isPlaced = [];
let highlightColor;

export { createGame, placeShips, placeShip, loadMainGame }