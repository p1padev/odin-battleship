const pipeline =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const switchTurnEvent = new Event('switchTurn');

export default pipeline;
