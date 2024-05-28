const insertMissedShots = (player) => {
  const missedShots = player.getController().getMissedShots();
  const DOMBoard = player.getDOMBoardRef();

  missedShots.forEach(([coordX, coordY]) => {
    const cell = DOMBoard.querySelector(
      `.board-cell[data-coord="[${coordX},${coordY}]"]`
    );

    cell.textContent = 'O';
  });
};

export default insertMissedShots;
