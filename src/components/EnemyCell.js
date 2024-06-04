import handleGameCellClick from '../dom/handleGameCellClick';
import pipeline from '../helper';
import basicCell from './basicCell';

export const addClickListener = ({ coordinates, cell, boardController }) => {
  cell.addEventListener('click', () => {
    handleGameCellClick({ coordinates, cell, boardController });
  });
  return { cell };
};

export const extractCell = ({ cell }) => cell;

const EnemyCell = pipeline(basicCell, addClickListener, extractCell);

export default EnemyCell;
