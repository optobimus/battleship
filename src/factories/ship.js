const Ship = (name, length) => {
    let hits = 0, sunk = false;
    const getName = () => name;
    const getLength = () => length;
    const getHits = () => hits;

    function hit() {
        hits++;
    }

    function isSunk() {
        if (hits >= length) {
            return true;
        }
        return false;
    }

    return { getLength, getHits, hit, isSunk, getName }
}

export default Ship;