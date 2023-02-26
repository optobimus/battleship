import Ship from '../src/factories/ship'

let testSubmarine = new Ship(3);

test('accepts a hit', () => {
    testSubmarine.hit();
    expect(testSubmarine.getHits()).toBe(1);
})

test('check isSunk function', () => {
    testSubmarine.hit();
    expect(testSubmarine.isSunk()).toBe(false);
    testSubmarine.hit();
    expect(testSubmarine.isSunk()).toBe(true);

})