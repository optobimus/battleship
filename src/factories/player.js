import Gameboard from './gameboard'

const Player = (username) => {
    const getName = () => username;

    const gameboard = Gameboard();

    function attack(position, gameboard) {
        let {row, col} = position;
        if (!gameboard.getHitBoard()[row][col]) {
            gameboard.receiveAttack(position);
        }
    }

    return { getName, attack }
}

export default Player;