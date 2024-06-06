import InitialForm from '../components/InitialForm';
import renderEnemyBoard from '../dom/renderEnemyBoard';
import renderPlayerBoard from '../dom/renderPlayerBoard';
import ShipFactory from '../factories/ship/ShipFactory';
import pipeline from '../helper';
import createPlayers from './createPlayers';

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
  let players;

  const renderBoards = () => {
    players.forEach((player) => {
      if (player.isAttacking()) {
        renderPlayerBoard(player);
      } else {
        renderEnemyBoard(player);
      }
    });
  };

  const togglePlayerTurn = () => {
    players.forEach((player) => {
      player.toggleIsAttacking();
    });
  };

  const checkWhoWon = () => {
    let won;
    let lost;
    players.forEach((player) => {
      if (player.getController().areAllShipsSunk()) {
        lost = player;
      } else {
        won = player;
      }
    });
    return { won, lost };
  };

  const winningMessage = ({ won, lost }) => {
    alert(`${won.getName()} has won ${lost.getName()}`);
  };

  const createSetupUI = ({ event, ...args }) => {
    gameContainer.classList.remove('player-initial-form');
    event.target.remove();
    return { ...args };
  };

  const startSetupMode = (ArrayOfPlayers) => {
    players = ArrayOfPlayers;
  };

  const fakeInserts = () => {
    fakeInsertPlayerOne.forEach((insert) => {
      players[0].getController().insertShip(insert);
    });
    fakeInsertPlayerTwo.forEach((insert) => {
      players[1].getController().insertShip(insert);
    });
    players[0].toggleIsAttacking();
  };

  const switchTurnPipeline = pipeline(togglePlayerTurn, renderBoards);

  const gameEndedPipeline = pipeline(checkWhoWon, winningMessage);

  const enterSetupMode = pipeline(
    createSetupUI,
    createPlayers,
    startSetupMode,
    fakeInserts,
    renderBoards
  );

  const init = () => {
    const [startButton, playerOneForm, playerTwoForm] =
      InitialForm(enterSetupMode);
    gameContainer.addEventListener('switchTurn', switchTurnPipeline);
    gameContainer.addEventListener('gameEnded', gameEndedPipeline);
    gameContainer.classList.add('player-initial-form');
    gameContainer.append(startButton, playerOneForm, playerTwoForm);
  };

  return {
    init,
  };
};

export default App;
