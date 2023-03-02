function createGame() {
    const main = document.querySelector(".main");
    main.innerHTML = "";
    createInitLayout(main);
    placeShips();
}

function clearMain() {
    
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

    loadMainGame();

}

function placeShip(type, length) {
    const text = document.querySelector(".instruction-text");
    return new Promise((resolve, reject) => {
        text.textContent = "Place your " + type;

        const fields = document.querySelectorAll(".field");
        fields.forEach(field => {

            highlightPotentialShip(fields, field, length);
            field.addEventListener("click", () => {
                resolve();
            });
            field.style.backgroundColor = "#124459";
        });

        
    });
}

function highlightPotentialShip(fields, field, length) {

    field.addEventListener("mouseover", () => {
    if (isHorizontal) {
            for (let i = 0; i < length; i++) {
                console.log(length);
                fields.forEach(fieldToChange => {
                    if (fieldToChange.dataset.positionx === field.dataset.positionx 
                        && parseInt(fieldToChange.dataset.positiony) === parseInt(field.dataset.positiony) + i) {
                        fieldToChange.style.backgroundColor = "#EFF6E0";
                    }
                });
            }
        } else {
            for (let i = 0; i < length; i++) {
                fields.forEach(fieldToChange => {
                    if (fieldToChange.dataset.positiony === field.dataset.positiony 
                        && parseInt(fieldToChange.dataset.positionx) === parseInt(field.dataset.positionx) + i) {
                        fieldToChange.style.backgroundColor = "#EFF6E0";
                    }
                });
            }
        }
        field.addEventListener("click", () => {
            return;
        });
    });
    
    return;
}

function loadMainGame() {
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


let isHorizontal = true;

export { createGame, placeShips, placeShip }