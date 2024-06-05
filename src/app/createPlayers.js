import {
  ComputerFactory,
  PlayerFactory,
} from '../factories/player/PlayerFactory';

const playerOneDOM = document.querySelector('.player-one-container');
const playerTwoDOM = document.querySelector('.player-two-container');

const createFactory = (
  player,
  playerDOMBoard,
  enemyDOMBoard,
  isFacingComputer
) =>
  player.isComputer
    ? ComputerFactory({
        DOMBoard: playerDOMBoard,
        enemyDOMBoard,
        isFacingComputer,
      })
    : PlayerFactory({
        playerName: player.playerName,
        DOMBoard: playerDOMBoard,
        isFacingComputer,
      });

const createPlayers = ({ playersForm: { player1, player2 } }) => {
  const player1Factory = createFactory(
    player1,
    playerOneDOM,
    playerTwoDOM,
    player2.isComputer
  );
  const player2Factory = createFactory(
    player2,
    playerTwoDOM,
    playerOneDOM,
    player1.isComputer
  );

  return [player1Factory, player2Factory];
};

export default createPlayers;
