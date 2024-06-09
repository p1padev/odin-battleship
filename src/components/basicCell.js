const basicCell = ({ coordinates, ...rest }) => {
  const cell = document.createElement('button');
  cell.classList.add('board-cell');
  cell.setAttribute('data-coordinates', `[${coordinates}]`);
  return { cell, coordinates, ...rest };
};

export default basicCell;
