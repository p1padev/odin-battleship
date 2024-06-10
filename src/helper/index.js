const pipeline =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const asyncPipeline =
  (...fns) =>
  async (initialValue) =>
    fns.reduce(
      async (acc, func) => func(await acc),
      Promise.resolve(initialValue)
    );

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

export const getRandomSettings = (alreadyUsedCoordinates, shipLength) => {
  const alreadyUsedChecker = containsCoordinates(alreadyUsedCoordinates);

  const randomVertical = Boolean(Math.floor(Math.random() * 2));
  let x;
  let y;
  if (randomVertical) {
    x = Math.floor(Math.random() * (10 - shipLength));
    y = Math.floor(Math.random() * 10);
  } else {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * (10 - shipLength));
  }
  const randomShipCoordinates = [];

  for (let i = 0; i < shipLength; i += 1) {
    if (randomVertical) {
      randomShipCoordinates.push([x + i, y]);
    } else {
      randomShipCoordinates.push([x, y + i]);
    }
  }

  const checkers = randomShipCoordinates.map((coordinates) =>
    alreadyUsedChecker(coordinates)
  );

  const appliedCheckers = checkers.some((value) => value === true);

  if (appliedCheckers) {
    return getRandomSettings(alreadyUsedCoordinates, shipLength);
  }

  return {
    coordinates: [Number(x), Number(y)],
    isVertical: randomVertical,
  };
};

export default pipeline;
