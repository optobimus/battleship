const Gameboard = () => {
    const board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    const hitBoard = new Array(10).fill(null).map(() => new Array(10).fill(null));
    const ships = [];

    const attacks = 0, missedAttacks = 0;
    function placeShip(ship, position, isHorizontal) {

        if (!canPlaceShip(ship, position, isHorizontal)) {
            return false;
        }
        let { row, col } = position;

        if (!ships.includes(ship)) {
            ships.push(ship);
        }

        if (isHorizontal) {
            for (let i = 0; i < ship.getLength(); i++) {
                board[row][col + i] = ship;
            }
        } else {
            for (let i = 0; i < ship.getLength(); i++) {
                board[row + i][col] = ship;
            }
        }
    }

    function receiveAttack(position) {
        let { row, col } = position;
        if (board[row][col] !== null && hitBoard[row][col] === null) {
            board[row][col].hit();
        } else
            missedAttacks++;

        hitBoard[row][col] = true;
        attacks++;
    }

    function canPlaceShip(ship, position, isHorizontal) {
        let { row, col } = position;

        if (isHorizontal) {
            for (let i = 0; i < ship.getLength(); i++) {
                if (board[row][col + i] !== null || col > 10)
                    return false;
            }
        } else {
            for (let i = 0; i < ship.getLength(); i++) {
                if (board[row + i][col] !== null || row > 10) 
                    return false;
            }
        }
        return true;
    }
    
    function gameOver() {
        ships.forEach((ship) => {
            if (!ship.isSunk()) {
                return false;
            }
        })
        return true;
    }

    const getBoard = () => board;

    return { placeShip, receiveAttack, gameOver, getBoard, canPlaceShip }
}

export default Gameboard;