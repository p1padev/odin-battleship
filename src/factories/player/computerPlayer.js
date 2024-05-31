import pipeline, { containsCoordinates } from '../../helper';

const pickCell = ({ coordinates, enemyBoard }) => {
  const cell = enemyBoard.querySelector(
    `.board-cell[data-coordinates="[${coordinates}]"]`
  );
  return cell;
};

const getRandomCoordinates = ({ computerShots, enemyBoard }) => {
  const checkComputerShots = containsCoordinates(computerShots);
  const checkEnemyCellIsDisabled = (coordinates) => {
    const cell = pickCell({ coordinates, enemyBoard });
    return cell.disabled;
  };

  const randomCoordinates = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];

  if (
    checkComputerShots(randomCoordinates) ||
    checkEnemyCellIsDisabled(randomCoordinates)
  ) {
    return getRandomCoordinates({ computerShots, enemyBoard });
  }

  return { coordinates: randomCoordinates, enemyBoard };
};

const triggerAttack = (cell) => {
  cell.click();
};

const computerPlayer = (state) => ({
  computerAttack: () =>
    pipeline(getRandomCoordinates, pickCell, triggerAttack)(state),
});

export default computerPlayer;
