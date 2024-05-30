import pipeline, { switchTurnEvent } from '../helper';

const gameContainer = document.querySelector('#game-container');

const dispatchAttack = ({ coordinates, boardController, ...args }) => {
  const wasShipHitted = boardController.receiveAttack({
    coordinates,
  });

  return { wasShipHitted, ...args };
};

const dispatchEvent = ({ ...args }) => {
  gameContainer.dispatchEvent(switchTurnEvent);
  return { ...args };
};

export const disableCell = ({
  cell,
  wasShipHitted = false,
  missedShot = false,
}) => {
  const newCell = cell;
  newCell.disabled = true;
  newCell.classList.add('disabled');
  if (wasShipHitted) {
    newCell.textContent = 'X';
    newCell.classList.add('hitted-ship');
  }
  if (missedShot) {
    newCell.classList.add('missed-shot');
  }
  return newCell;
};

const handleCellClick = pipeline(dispatchAttack, dispatchEvent, disableCell);

export default handleCellClick;
