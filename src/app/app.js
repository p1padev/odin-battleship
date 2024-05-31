import handleBoard from '../dom/handleBoard';
import {
  ComputerFactory,
  PlayerFactory,
} from '../factories/player/PlayerFactory';
import ShipFactory from '../factories/ship/ShipFactory';
import pipeline from '../helper';

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
    PlayerFactory({
      playerName: 'Test1',
      DOMBoardReference: gameContainer.querySelector(`.player-${0}-container`),
    }),
    ComputerFactory({
      playerName: 'Test2',
      DOMBoardReference: gameContainer.querySelector(`.player-${1}-container`),
      enemyDOMBoardReference: gameContainer.querySelector(
        `.player-${0}-container`
      ),
    }),
  ];
  // FIXME: Temporary
  fakeInsertPlayerOne.forEach((insert) => {
    players[0].getController().insertShip(insert);
  });
  fakeInsertPlayerTwo.forEach((insert) => {
    players[1].getController().insertShip(insert);
  });

  const renderBoards = () => {
    players.forEach((player) => {
      handleBoard(player);
    });
  };

  const togglePlayerTurn = () => {
    players.forEach((player) => {
      player.toggleIsAttacking();
    });
  };

  const checkForComputerAttack = () => {
    players.forEach((player) => {
      if (player.isComputer() && player.isAttacking()) {
        setTimeout(() => player.computerAttack(), 1000);
      }
    });
  };

  const switchTurnPipeline = pipeline(
    togglePlayerTurn,
    renderBoards,
    checkForComputerAttack
  );

  const init = () => {
    // TODO:  playerOne = PlayerFactory({ playerOneSettings });
    // playerTwo = PlayerFactory({ playerTwoSettings });
    gameContainer.addEventListener('switchTurn', switchTurnPipeline);
    players[0].toggleIsAttacking();
    renderBoards();
  };

  return {
    init,
  };
};

export default App;
