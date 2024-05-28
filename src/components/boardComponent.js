const boardComponent = (board) => {
  const container = document.createElement('div');
  container.classList.add('board-container');

  board.forEach((row, coordX) => {
    row.forEach((cell, coordY) => {
      const cellDiv = document.createElement('div');
      cellDiv.setAttribute('data-coord', `[${coordX},${coordY}]`);
      cellDiv.classList.add('board-cell');
      container.appendChild(cellDiv);
    });
  });

  return container;
};

export default boardComponent;
