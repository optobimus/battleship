const Ship = (length) => {
    let hits = 0, sunk = false;
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

    return { getLength, getHits, hit, isSunk }
}

export default Ship;