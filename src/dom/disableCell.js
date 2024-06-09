const disableCell = ({
  cell,
  wasShipHitted = false,
  missedShot = false,
  ...rest
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
  return { cell: newCell, ...rest };
};

export default disableCell;
