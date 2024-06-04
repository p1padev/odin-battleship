import DisabledCell from '../components/DisabledCell';
import EnemyCell from '../components/EnemyCell';
import PCEnemyCell from '../components/PCEnemyCell';
import checkers from './checkers';

const handleEnemyCell =
  (isFacingComputer) =>
  ({ coordinates, boardController }) => {
    const settings = { coordinates, boardController };
    const { checkForMissedShot, checkForSuccessfulShot } =
      checkers(boardController);

    if (checkForMissedShot(coordinates)) {
      settings.missedShot = true;
      return DisabledCell(settings);
    }

    if (checkForSuccessfulShot(coordinates)) {
      settings.wasShipHitted = true;
      return DisabledCell(settings);
    }

    if (isFacingComputer) {
      return PCEnemyCell(settings);
    }

    return EnemyCell(settings);
  };

export default handleEnemyCell;
