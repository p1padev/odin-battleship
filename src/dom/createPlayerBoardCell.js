import DisabledCell from '../components/DisabledCell';
import ShipCell from '../components/ShipCell';
import checkers from './checkers';

const createPlayerBoardCell =
  (isComputer) =>
  ({ coordinates, boardController }) => {
    const settings = { coordinates, boardController };
    if (isComputer) return DisabledCell(settings);
    const { checkForMissedShot, checkForSuccessfulShot, checkForPlacedShip } =
      checkers(boardController);

    if (checkForPlacedShip(coordinates)) {
      if (checkForSuccessfulShot(coordinates)) {
        settings.wasShipHitted = true;
      }
      return ShipCell(settings);
    }
    if (checkForMissedShot(coordinates)) {
      settings.missedShot = true;
    }

    return DisabledCell(settings);
  };

export default createPlayerBoardCell;
