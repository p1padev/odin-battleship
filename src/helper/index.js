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

export default pipeline;
