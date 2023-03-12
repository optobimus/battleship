
function generateRandomPlacement(length) {
    return Math.floor(Math.random() * (10 - length));
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function generateRandomAdjacent(position) {
    const { row, col } = position;
    if (getRandomBoolean()) {     // modify x position
        let randomCol = null;
        do {
            if (getRandomBoolean()) {
                randomCol = col + 1;
            } else {
                randomCol = col - 1;
            }
        } while (randomCol > 9 || randomCol < 0);
        return { row: row, col: randomCol } 
    } else {                    // modify y position
        let randomRow = null;
        do {
            if (getRandomBoolean()) {
                randomRow = row + 1;
            } else {
                randomRow = row - 1;
            }
        } while (randomRow > 9 || randomRow < 0);
        return { row: randomRow, col: col } 
    }
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

export { generateRandomPlacement, generateRandomNumber, generateRandomAdjacent, getRandomBoolean, callFunctionUntilTrue}