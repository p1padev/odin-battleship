import {
  getDisabledCellComponent,
  getEnemyCellComponent,
  getShipPlayerCellComponent,
} from './cellComponent';

const pickCellComponent = ({
  coordinates,
  playerController,
  isEnemy,
  checkers,
}) => {
  const settings = { coordinates, playerController };
  const { checkForMissedShot, checkForSuccessfulShot, checkForPlacedShip } =
    checkers;

  if (checkForMissedShot(coordinates)) {
    settings.missedShot = true;
    return getDisabledCellComponent(settings);
  }
  if (!isEnemy && checkForPlacedShip(coordinates)) {
    if (checkForSuccessfulShot(coordinates)) {
      settings.wasShipHitted = true;
    }
    return getShipPlayerCellComponent(settings);
  }
  if (checkForSuccessfulShot(coordinates)) {
    settings.wasShipHitted = true;
    return getDisabledCellComponent(settings);
  }
  return isEnemy
    ? getEnemyCellComponent(settings)
    : getDisabledCellComponent(settings);
};

const containsCoordinates = (containerArray) => (cellCoordinates) =>
  containerArray.some((coordinates) =>
    coordinates.every((val, index) => val === cellCoordinates[index])
  );

const boardComponent = (player, isEnemy = false) => {
  const playerController = player.getController();
  const checkers = {
    checkForMissedShot: containsCoordinates(playerController.getMissedShots()),
    checkForSuccessfulShot: containsCoordinates(
      playerController.getSuccessfulShots()
    ),
    checkForPlacedShip: containsCoordinates(playerController.getPlacedShips()),
  };

  const container = document.createElement('div');
  container.classList.add('board-container');

  player.getBoard().forEach((row, coordX) => {
    row.forEach((square, coordY) => {
      const cell = pickCellComponent({
        coordinates: [coordX, coordY],
        playerController,
        isEnemy,
        checkers,
      });
      container.appendChild(cell);
    });
  });

  return container;
};

export default boardComponent;
