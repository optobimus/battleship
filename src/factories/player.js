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

    const getGameboard = () => gameboard;

    return { getName, attack, getGameboard}
}

export default Player;