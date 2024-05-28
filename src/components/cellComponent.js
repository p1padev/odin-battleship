import handleCellClick from '../dom/handleCellClick';
import pipeline from '../helper';

const getCellComponent = ({ ...args }) => {
  const cell = document.createElement('button');
  cell.classList.add('board-cell');
  return { cell, ...args };
};

const getPlayerController = ({ player, ...args }) => {
  const controller = player.getController();
  return { controller, ...args };
};

const attachEventListener = ({ cell, ...args }) => {
  cell.addEventListener('click', () => {
    handleCellClick({ cell, ...args });
  });
  return cell;
};

const cellComponent = pipeline(
  getCellComponent,
  getPlayerController,
  attachEventListener
);

export default cellComponent;
