import InitialForm from '../components/InitialForm';
import PromptBoard from '../components/PromptBoard';
import passTurn from '../components/passTurn';
import victoryPopup from '../components/victoryPopup';
import handleInitialForm from '../dom/handleInitialForm';
import renderEnemyBoard from '../dom/renderEnemyBoard';
import renderPlayerBoard from '../dom/renderPlayerBoard';
import { asyncPipeline, clearChildren, getRandomSettings } from '../helper';
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
    let cancel;

    players.forEach((player) => {
      if (player.getController().areAllShipsSunk()) {
        cancel = true;
      }
      const booleanState = player.isAttacking();
      if (booleanState) {
        wasAttacking = player;
      } else {
        awaitingToAttack = player;
      }
    });

    if (cancel) {
      return null;
    }

    await passTurn(wasAttacking, awaitingToAttack);
    wasAttacking.toggleIsAttacking();
    awaitingToAttack.toggleIsAttacking();
    return true;
  };

  const switchTurnPipeline = asyncPipeline(togglePlayerTurn, renderBoards);

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

  const startGame = () => {
    players[0].toggleIsAttacking();
    renderBoards();
  };

  const enterSetupMode = asyncPipeline(
    removeFormUI,
    createPlayers,
    assignPlayers,
    startSetupMode,
    startGame
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

  const winningMessage = async ({ won, lost }) => {
    await victoryPopup(won, lost);
  };

  const resetApp = () => {
    players = null;
    init();
  };

  const gameEndedPipeline = asyncPipeline(
    checkWhoWon,
    winningMessage,
    resetApp
  );

  const addEventListeners = () => {
    gameContainer.addEventListener('switchTurn', switchTurnPipeline);
    gameContainer.addEventListener('gameEnded', gameEndedPipeline);
  };

  return {
    init,
    addEventListeners,
  };
};

export default App;
