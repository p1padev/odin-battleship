const pipeline =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const switchTurnEvent = new Event('switchTurn');
export const gameEndedEvent = new Event('gameEnded');

export const clearChildren = (element) => {
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
};

export const containsCoordinates = (containerArray) => (cellCoordinates) =>
  containerArray.some((coordinates) =>
    coordinates.every((val, index) => val === cellCoordinates[index])
  );

export const containsShip = (cell) => cell.classList.contains('player-ship');

export const getCoordinates = (cell) => JSON.parse(cell.dataset.coordinates);

export const isOutOfBoundaries = (cell, shipLength, getIsVertical) => {
  const [x, y] = getCoordinates(cell);
  if (
    (getIsVertical() && x + shipLength > 10) ||
    (!getIsVertical() && y + shipLength > 10)
  ) {
    return true;
  }
  return false;
};

export default pipeline;
