const pipeline =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const switchTurnEvent = new Event('switchTurn');

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

export default pipeline;
