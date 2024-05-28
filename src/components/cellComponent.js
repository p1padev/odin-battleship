import handleCellClick from '../dom/cellEventListener';

const cellComponent = (coordX, coordY) => {
  const cell = document.createElement('button');
  cell.setAttribute('data-coord', `[${coordX},${coordY}]`);
  cell.classList.add('board-cell');
  cell.addEventListener('click', handleCellClick);
  return cell;
};

export default cellComponent;
