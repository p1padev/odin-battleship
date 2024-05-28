const insertShips = (player) => {
  const shipsCoords = player.getController().getPlacedShips();
  const DOMBoard = player.getDOMBoardRef();

  shipsCoords.forEach(([coordX, coordY]) => {
    const cell = DOMBoard.querySelector(
      `.board-cell[data-coord="[${coordX},${coordY}]"]`
    );

    cell.textContent = 'X';
  });
};

export default insertShips;
