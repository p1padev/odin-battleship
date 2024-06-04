const disableCell = ({
  cell,
  wasShipHitted = false,
  missedShot = false,
  ...args
}) => {
  const newCell = cell;
  newCell.disabled = true;
  newCell.classList.add('disabled');
  if (wasShipHitted) {
    newCell.textContent = 'X';
    newCell.classList.add('hitted-ship');
  }
  if (missedShot) {
    newCell.classList.add('missed-shot');
  }
  return { cell: newCell, ...args };
};

export default disableCell;
