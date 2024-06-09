import basicCell from '../components/basicCell';
import ShipCell from '../components/ShipCell';
import checkers from './checkers';

const createPromptBoardCell = ({ coordinates, boardController }) => {
  const settings = { coordinates, boardController };
  const { checkForPlacedShip } = checkers(boardController);

  if (checkForPlacedShip(coordinates)) {
    return ShipCell(settings);
  }

  const { cell } = basicCell(settings);
  cell.classList.add('prompt-cell');
  return cell;
};

export default createPromptBoardCell;
