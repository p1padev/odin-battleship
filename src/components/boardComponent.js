const boardComponent = (board) => {
  const container = document.createElement('div');
  container.classList.add('board-container');

  board.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.setAttribute('data-cell', cell);
      cellDiv.classList.add('board-cell');
      container.appendChild(cellDiv);
    });
  });

  return container;
};

export default boardComponent;
