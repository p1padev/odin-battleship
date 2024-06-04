import pipeline, { containsCoordinates } from '../../helper';

const pickCell = ({ coordinates, enemyBoard }) => {
  const cell = enemyBoard.querySelector(
    `.board-cell[data-coordinates="[${coordinates}]"]`
  );
  return cell;
};

const getRandomCoordinates = ({ computerShots, enemyBoard }) => {
  const checkComputerShots = containsCoordinates(computerShots);
  const checkEnemyCellAlreadyShot = (coordinates) => {
    const cell = pickCell({ coordinates, enemyBoard });
    return cell.classList.contains('missed-shot');
  };
  if (computerShots.length >= 100) {
    throw new Error('No more coordinates available');
  }

  const randomCoordinates = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];

  if (
    checkComputerShots(randomCoordinates) ||
    checkEnemyCellAlreadyShot(randomCoordinates)
  ) {
    return getRandomCoordinates({ computerShots, enemyBoard });
  }

  computerShots.push(randomCoordinates);
  return { coordinates: randomCoordinates, enemyBoard };
};

const triggerAttack = (cell) => {
  cell.dispatchEvent(new Event('click'));
};

const computerPlayer = (state) => ({
  computerAttack: () =>
    pipeline(getRandomCoordinates, pickCell, triggerAttack)(state),
});

export default computerPlayer;
