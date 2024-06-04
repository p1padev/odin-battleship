import { containsCoordinates } from '../helper';

const checkers = (boardController) => ({
  checkForMissedShot: containsCoordinates(boardController.getMissedShots()),
  checkForSuccessfulShot: containsCoordinates(
    boardController.getSuccessfulShots()
  ),
  checkForPlacedShip: containsCoordinates(boardController.getPlacedShips()),
});

export default checkers;
