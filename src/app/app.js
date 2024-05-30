import PlayerFactory from '../factories/player/Player';
import ShipFactory from '../factories/ship/ShipFactory';

const gameContainer = document.querySelector('#game-container');

// FIXME: Temporary

const ship1 = ShipFactory(2);
const ship2 = ShipFactory(3);
const ship3 = ShipFactory(4);
const ship4 = ShipFactory(3);
const fakeInsertPlayerOne = [
  { coordinates: [1, 2], ship: ship1, isVertical: false },
  { coordinates: [5, 6], ship: ship2, isVertical: true },
];
const fakeInsertPlayerTwo = [
  { coordinates: [3, 4], ship: ship3, isVertical: false },
  { coordinates: [6, 6], ship: ship4, isVertical: true },
];

const App = () => {
  const players = [
    PlayerFactory({ playerName: 'Test1', isComputer: false }),
    PlayerFactory({ playerName: 'Test2', isComputer: false }),
  ];
  let playerAttacking = players[0];
  let enemyPlayer = players[1];
  // FIXME: Temporary
  fakeInsertPlayerOne.forEach((insert) => {
    players[0].getController().insertShip(insert);
  });
  fakeInsertPlayerTwo.forEach((insert) => {
    players[1].getController().insertShip(insert);
  });

  const attachDOMReferences = () => {
    players.forEach((player, index) => {
      const boardContainer = gameContainer.querySelector(
        `.player-${index}-container`
      );
      player.setDOMBoardRef(boardContainer);
    });
  };

  const renderBoards = () => {
    playerAttacking.setupBoard(true);
    enemyPlayer.setupBoard(false);
  };

  const togglePlayerTurn = () => {
    const temp = playerAttacking;
    playerAttacking = enemyPlayer;
    enemyPlayer = temp;
    renderBoards();
  };

  const init = () => {
    // TODO:  playerOne = PlayerFactory({ playerOneSettings });
    // playerTwo = PlayerFactory({ playerTwoSettings });
    gameContainer.addEventListener('switchTurn', togglePlayerTurn);
    attachDOMReferences();
    renderBoards();
  };

  return {
    init,
  };
};

export default App;
