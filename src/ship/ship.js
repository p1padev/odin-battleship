const shipFactory = (length) => {
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

export default shipFactory;
