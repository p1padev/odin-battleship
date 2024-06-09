import InitialForm from '../components/InitialForm';
import PromptBoard from '../components/PromptBoard';
import handleInitialForm from '../dom/handleInitialForm';
import renderEnemyBoard from '../dom/renderEnemyBoard';
import renderPlayerBoard from '../dom/renderPlayerBoard';
import pipeline, { clearChildren, containsCoordinates } from '../helper';
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

  const removeFormUI = ({ event, ...rest }) => {
    gameContainer.classList.remove('player-initial-form');
    event.target.remove();
    document.querySelectorAll('.form-player').forEach((form) => {
      form.remove();
    });
    return { ...rest };
  };

  const switchTurnPipeline = pipeline(togglePlayerTurn, renderBoards);
  const gameEndedPipeline = pipeline(checkWhoWon, winningMessage);

  const initGame = () => {
    gameContainer.addEventListener('switchTurn', switchTurnPipeline);
    gameContainer.addEventListener('gameEnded', gameEndedPipeline);
    players[0].toggleIsAttacking();
    renderBoards();
  };

  const assignPlayers = (ArrayOfPlayers) => {
    players = ArrayOfPlayers;
  };

  const getRandomSettings = (alreadyUsedCoordinates, shipLength) => {
    const alreadyUsedChecker = containsCoordinates(alreadyUsedCoordinates);

    const randomVertical = Boolean(Math.floor(Math.random() * 2));
    let x;
    let y;
    if (randomVertical) {
      x = Math.floor(Math.random() * (10 - shipLength));
      y = Math.floor(Math.random() * 10);
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - shipLength));
    }
    const randomShipCoordinates = [];

    for (let i = 0; i < shipLength; i += 1) {
      if (randomVertical) {
        randomShipCoordinates.push([x + i, y]);
      } else {
        randomShipCoordinates.push([x, y + i]);
      }
    }

    const checkers = randomShipCoordinates.map((coordinates) =>
      alreadyUsedChecker(coordinates)
    );

    const appliedCheckers = checkers.some((value) => value === true);

    if (appliedCheckers) {
      return getRandomSettings(alreadyUsedCoordinates, shipLength);
    }

    return {
      coordinates: [Number(x), Number(y)],
      isVertical: randomVertical,
    };
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
    initGame();
  };

  const enterSetupMode = pipeline(
    removeFormUI,
    createPlayers,
    assignPlayers,
    startSetupMode
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
