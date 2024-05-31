import handleCellClick, { disableCell } from '../dom/handleCellClick';
import pipeline from '../helper';

const createCellComponent = ({ coordinates, ...args }) => {
  const cell = document.createElement('button');
  cell.classList.add('board-cell');
  cell.setAttribute('data-coordinates', `[${coordinates}]`);
  return { cell, coordinates, ...args };
};

const attachPlayerShip = (cell) => {
  const newCell = cell;
  newCell.textContent = 'S';
  newCell.classList.add('player-ship');
  return newCell;
};

const attachEventListener = ({ coordinates, cell, boardController }) => {
  cell.addEventListener('click', () => {
    handleCellClick({ coordinates, cell, boardController });
  });
  return cell;
};

const getShipPlayerCellComponent = pipeline(
  createCellComponent,
  disableCell,
  attachPlayerShip
);

const getDisabledCellComponent = pipeline(createCellComponent, disableCell);

const getEnemyCellComponent = pipeline(
  createCellComponent,
  attachEventListener
);

export {
  getDisabledCellComponent,
  getEnemyCellComponent,
  getShipPlayerCellComponent,
};
