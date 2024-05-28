import cellComponent from './cellComponent';

const boardComponent = (board) => {
  const container = document.createElement('div');
  container.classList.add('board-container');

  board.forEach((row, coordX) => {
    row.forEach((cell, coordY) => {
      container.appendChild(cellComponent(coordX, coordY));
    });
  });

  return container;
};

export default boardComponent;
