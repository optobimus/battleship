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

    for (let i = 1; i <= 10; i++){

        for (let j = 1; j <= 10; j++) {
            const field = document.createElement("div");
            field.classList.add("field");
            field.setAttribute("data-positionX", i);
            field.setAttribute("data-positionY", j);
            board.appendChild(field);
        }
    }

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



let isHorizontal = true;

export { createGame, placeShips, placeShip }