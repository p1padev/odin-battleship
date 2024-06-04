import disableCell from '../dom/disableCell';
import pipeline from '../helper';
import basicCell from './basicCell';

const addPlayerShip = ({ cell }) => {
  cell.textContent = 'S';
  cell.classList.add('player-ship');
  return cell;
};

const ShipCell = pipeline(basicCell, disableCell, addPlayerShip);

export default ShipCell;
