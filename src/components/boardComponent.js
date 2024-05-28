import cellComponent from './cellComponent';

const boardComponent = (player) => {
  const container = document.createElement('div');
  container.classList.add('board-container');

  player.getBoard().forEach((row, coordX) => {
    row.forEach((cell, coordY) => {
      container.appendChild(cellComponent({ coordX, coordY, player }));
    });
  });

  return container;
};

export default boardComponent;
