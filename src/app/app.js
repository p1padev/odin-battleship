import InitialForm from '../components/InitialForm';
import PromptBoard from '../components/PromptBoard';
import passTurn from '../components/passTurn';
import handleInitialForm from '../dom/handleInitialForm';
import renderEnemyBoard from '../dom/renderEnemyBoard';
import renderPlayerBoard from '../dom/renderPlayerBoard';
import pipeline, {
  asyncPipeline,
  clearChildren,
  getRandomSettings,
} from '../helper';
import createPlayers from './createPlayers';
import defaultShips from './defaultShips';

const gameContainer = document.querySelector('#game-container');

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

  const togglePlayerTurn = async () => {
    let wasAttacking;
    let awaitingToAttack;

    players.forEach((player) => {
      const booleanState = player.isAttacking();
      if (booleanState) {
        wasAttacking = player;
      } else {
        awaitingToAttack = player;
      }
    });

    await passTurn(wasAttacking, awaitingToAttack);
    wasAttacking.toggleIsAttacking();
    awaitingToAttack.toggleIsAttacking();
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

  const switchTurnPipeline = asyncPipeline(togglePlayerTurn, renderBoards);
  const gameEndedPipeline = pipeline(checkWhoWon, winningMessage);

  const removeFormUI = ({ event, ...rest }) => {
    gameContainer.classList.remove('player-initial-form');
    event.target.remove();
    document.querySelectorAll('.form-player').forEach((form) => {
      form.remove();
    });
    return { ...rest };
  };

  const assignPlayers = (ArrayOfPlayers) => {
    players = ArrayOfPlayers;
  };

  const initGame = () => {
    gameContainer.addEventListener('switchTurn', switchTurnPipeline);
    gameContainer.addEventListener('gameEnded', gameEndedPipeline);
    players[0].toggleIsAttacking();
    renderBoards();
  };

  const startSetupMode = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const player of players) {
      const ships = defaultShips();
      const playerBoard = player.getController();

      // eslint-disable-next-line no-restricted-syntax
      for (const ship of ships) {
        let settingsOfShip;
        if (player.isComputer()) {
          settingsOfShip = getRandomSettings(
            playerBoard.getPlacedShips(),
            Number(ship.length)
          );
        } else {
          // eslint-disable-next-line no-await-in-loop
          settingsOfShip = await PromptBoard(player, ship);
        }
        settingsOfShip.ship = ship;
        playerBoard.insertShip(settingsOfShip);
      }
    }
  };

  const enterSetupMode = asyncPipeline(
    removeFormUI,
    createPlayers,
    assignPlayers,
    startSetupMode,
    initGame
  );

  const handleStartButton = (event) => {
    const playersForm = handleInitialForm(event);
    if (playersForm) {
      enterSetupMode({ event, playersForm });
    }
  };

  const init = () => {
    const [startButton, playerOneForm, playerTwoForm] = InitialForm();
    startButton.addEventListener('click', handleStartButton);
    gameContainer.classList.add('player-initial-form');
    clearChildren(gameContainer);
    gameContainer.append(startButton, playerOneForm, playerTwoForm);
  };

  return {
    init,
  };
};

export default App;
