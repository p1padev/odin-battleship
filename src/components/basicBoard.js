const basicBoard = (boardController, cellCallback) => {
  const container = document.createElement('div');
  container.classList.add('board-container');

  boardController.getBoard().forEach((row, coordX) => {
    row.forEach((_, coordY) => {
      const cell = cellCallback({
        coordinates: [coordX, coordY],
        boardController,
      });
      container.appendChild(cell);
    });
  });

  return container;
};

export default basicBoard;
