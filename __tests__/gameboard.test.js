import { execPath } from 'process';
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