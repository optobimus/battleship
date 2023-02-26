import Gameboard from '../src/factories/gameboard'
import Ship from '../src/factories/ship'

const gameboard = new Gameboard();
const ship1 = new Ship(4);

gameboard.placeShip(ship1, { row: 4, col: 3}, true);
const board = gameboard.getBoard();
test('placeShip function', () => {
    expect(board[4][3]).toBe(ship1);
    expect(board[4][4]).toBe(ship1);
    expect(board[4][5]).toBe(ship1);
    expect(board[4][7]).toBe(null);
})

test('canPlaceShip function', () => {
    expect(gameboard.canPlaceShip(ship1, { row: 1, col: 6}, false)).toBe(false);
})


gameboard.placeShip(new Ship(2), { row: 3, col: 7}, true);
gameboard.placeShip(new Ship(3), { row: 6, col: 7}, false);

test('receiveAttack function', () => {
    gameboard.receiveAttack({row: 5, col: 8});
    expect(gameboard.getHitBoard()[5][8]).toBe(true);
    expect(gameboard.getHitBoard()[5][7]).toBe(false);
})

test('gameOver function', () => {
    gameboard.receiveAttack({row: 4, col: 3});
    gameboard.receiveAttack({row: 4, col: 4});
    gameboard.receiveAttack({row: 4, col: 5});
    gameboard.receiveAttack({row: 4, col: 6});

    expect(gameboard.gameOver()).toBe(false);

    gameboard.receiveAttack({row: 3, col: 7});
    gameboard.receiveAttack({row: 3, col: 8});

    expect(gameboard.gameOver()).toBe(false);

    gameboard.receiveAttack({row: 6, col: 7});
    gameboard.receiveAttack({row: 7, col: 7});
    gameboard.receiveAttack({row: 8, col: 7});

    expect(gameboard.gameOver()).toBe(true);
})