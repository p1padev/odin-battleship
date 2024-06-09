import pipeline, { gameEndedEvent, switchTurnEvent } from '../helper';
import disableCell from './disableCell';

const gameContainer = document.querySelector('#game-container');

const dispatchAttack = ({ coordinates, boardController, ...rest }) => {
  const wasShipHitted = boardController.receiveAttack({
    coordinates,
  });

  return { wasShipHitted, boardController, ...rest };
};

const dispatchEvent = (settings) => {
  gameContainer.dispatchEvent(switchTurnEvent);
  return settings;
};

const dispatchWinning = ({ boardController }) => {
  if (boardController.areAllShipsSunk()) {
    gameContainer.dispatchEvent(gameEndedEvent);
  }
};

const handleGameCellClick = pipeline(
  dispatchAttack,
  dispatchEvent,
  disableCell,
  dispatchWinning
);

export default handleGameCellClick;
