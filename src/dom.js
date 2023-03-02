function createGame() {
    const main = document.querySelector(".main");
    main.innerHTML = "";
    createInitLayout(main);
    placeShips();
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
    let highlightColor = "#EFF6E0";
    return new Promise((resolve, reject) => {
        text.textContent = "Place your " + type;

        const fields = document.querySelectorAll(".field");

        const mouseoverHandler = (event) => {
            if (isHorizontal) {
                for (let i = 0; i < length; i++) {
                    console.log(parseInt(event.target.dataset.positiony) + length)
                        if (parseInt(event.target.dataset.positiony) + length > 11) {
                            highlightColor = "#FF0000";
                        } else {
                            highlightColor = "#EFF6E0";
                        }
                    fields.forEach(fieldToChange => {
                        if (fieldToChange.dataset.positionx === event.target.dataset.positionx 
                            && parseInt(fieldToChange.dataset.positiony) === parseInt(event.target.dataset.positiony) + i) {
                            fieldToChange.style.backgroundColor = highlightColor;
                        }
                    });
                }
            } else {
                for (let i = 0; i < length; i++) {
                    if (parseInt(event.target.dataset.positionx) + length > 11) {
                        highlightColor = "#FF0000";
                    } else {
                        highlightColor = "#EFF6E0";
                    }
                    fields.forEach(fieldToChange => {
                        if (fieldToChange.dataset.positiony === event.target.dataset.positiony 
                            && parseInt(fieldToChange.dataset.positionx) === parseInt(event.target.dataset.positionx) + i) {
                            fieldToChange.style.backgroundColor = highlightColor;
                        }
                    });
                }
            }
        };
        
        const clickHandler = (event) => {
            fields.forEach(field => {
                field.removeEventListener("mouseover", mouseoverHandler);
                field.removeEventListener("mouseout", mouseoutHandler);
            });
            resolve();
        };
        
        const mouseoutHandler = () => {
            fields.forEach(fieldToChange => {
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


function highlightPotentialShip(field, length) {
    console.log("highlight");

 
    
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