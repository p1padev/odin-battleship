import pipeline, { gameEndedEvent, switchTurnEvent } from '../helper';
import disableCell from './disableCell';

const gameContainer = document.querySelector('#game-container');

const dispatchAttack = ({ coordinates, boardController, ...args }) => {
  const wasShipHitted = boardController.receiveAttack({
    coordinates,
  });

  return { wasShipHitted, boardController, ...args };
};

const dispatchEvent = ({ ...args }) => {
  gameContainer.dispatchEvent(switchTurnEvent);
  return { ...args };
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
