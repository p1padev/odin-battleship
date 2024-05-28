import pipeline, { switchTurnEvent } from '../helper';

const gameContainer = document.querySelector('#game-container');

const dispatchAttack = ({ coordX, coordY, controller, ...args }) => {
  const wasShipHitted = controller.receiveAttack({
    coordinates: [coordX, coordY],
  });
  return { wasShipHitted, ...args };
};

const dispatchEvent = ({ ...args }) => {
  gameContainer.dispatchEvent(switchTurnEvent);
  return { ...args };
};

export const updateCell = ({ cell, wasShipHitted = false }) => {
  // eslint-disable-next-line no-param-reassign
  cell.disabled = true;
  cell.classList.add('disabled');
  if (wasShipHitted) {
    // eslint-disable-next-line no-param-reassign
    cell.textContent = 'X';
    cell.classList.add('hittedShip');
  }
};

const handleCellClick = pipeline(dispatchAttack, dispatchEvent, updateCell);

export default handleCellClick;
