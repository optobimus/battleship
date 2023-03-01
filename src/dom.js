function createGame() {
    const main = document.querySelector(".main");
    main.innerHTML = "";
    placeShips(main);
}

function placeShips(main) {
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

    placeShip("Carrier", instructionText);
    placeShip("Battleship", instructionText);
    placeShip("Destroyer", instructionText);
    placeShip("Submarine", instructionText);
    placeShip("Patrol Boat", instructionText);

}

function placeShip(type, text) {
    text.textContent = "Place your " + type;
    let length = 0;

    switch (type) {
        case "Carrier":
            length = 5;

            break;
        case "Battleship":
            length = 4;

            break;
        case "Destroyer":
            length = 3;

            break;
        case "Submarine":
            length = 3;

            break;
        case "Patrol Boat":
            length = 2;

            break;
    }

    const fields = document.querySelectorAll(".field");
    fields.forEach(field => {
        field.addEventListener(("hover"), () => {
            if (isHorizontal) {
                for (let i = 0; i < length; i++) {
                    fields.forEach(field => {
                        if (field.dataset.positionX === i) {
                            field.style.backgroundColor = "#EFF6E0";
                        }
                    })
                }
            }
        })
    });
}



let isHorizontal = true;

export { createGame }