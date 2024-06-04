const basicCell = ({ coordinates, ...args }) => {
  const cell = document.createElement('button');
  cell.classList.add('board-cell');
  cell.setAttribute('data-coordinates', `[${coordinates}]`);
  return { cell, coordinates, ...args };
};

export default basicCell;
