import {
  getDisabledCellComponent,
  getEnemyCellComponent,
  getShipPlayerCellComponent,
} from './cellComponent';

import { containsCoordinates } from '../helper';

const pickCellComponent = ({
  coordinates,
  boardController,
  isAttacking,
  checkers,
}) => {
  const settings = { coordinates, boardController };
  const { checkForMissedShot, checkForSuccessfulShot, checkForPlacedShip } =
    checkers;

  if (checkForMissedShot(coordinates)) {
    settings.missedShot = true;
    return getDisabledCellComponent(settings);
  }
  if (isAttacking && checkForPlacedShip(coordinates)) {
    if (checkForSuccessfulShot(coordinates)) {
      settings.wasShipHitted = true;
    }
    return getShipPlayerCellComponent(settings);
  }
  if (checkForSuccessfulShot(coordinates)) {
    settings.wasShipHitted = true;
    return getDisabledCellComponent(settings);
  }
  return isAttacking
    ? getDisabledCellComponent(settings)
    : getEnemyCellComponent(settings);
};

const boardComponent = (boardController, isAttacking) => {
  const checkers = {
    checkForMissedShot: containsCoordinates(boardController.getMissedShots()),
    checkForSuccessfulShot: containsCoordinates(
      boardController.getSuccessfulShots()
    ),
    checkForPlacedShip: containsCoordinates(boardController.getPlacedShips()),
  };

  const container = document.createElement('div');
  container.classList.add('board-container');

  boardController.getBoard().forEach((row, coordX) => {
    row.forEach((_, coordY) => {
      const cell = pickCellComponent({
        coordinates: [coordX, coordY],
        boardController,
        isAttacking,
        checkers,
      });
      container.appendChild(cell);
    });
  });

  return container;
};

export default boardComponent;
