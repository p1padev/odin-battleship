const ShipFactory = (length) => {
  if (typeof length !== 'number') {
    throw new Error('Error: Argument provided was not a number');
  }

  let numberOfHits = 0;

  const hit = () => {
    numberOfHits += 1;
  };

  const isSunk = () => numberOfHits >= length;
  const getNumberOfHits = () => numberOfHits;

  return {
    length,
    getNumberOfHits,
    isSunk,
    hit,
  };
};

export default ShipFactory;
