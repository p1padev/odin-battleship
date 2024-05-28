import insertPlayerBoard from '../dom/insertPlayerBoard';
import PlayerFactory from '../factories/player/Player';

const gameContainer = document.querySelector('#game-container');

const App = () => {
  const players = [PlayerFactory('Test1'), PlayerFactory('Test2')];

  const togglePlayerTurn = () => {};

  const init = () => {
    // TODO:  playerOne = PlayerFactory({ playerOneSettings });
    // playerTwo = PlayerFactory({ playerTwoSettings });
    gameContainer.addEventListener('switchTurn', togglePlayerTurn);
    players.forEach((player, index) => {
      const boardContainer = gameContainer.querySelector(
        `.player-${index}-container`
      );
      insertPlayerBoard(boardContainer, player.getBoard());
    });
  };

  return {
    init,
  };
};

export default App;
