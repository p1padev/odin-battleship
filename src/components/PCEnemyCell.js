import disableCell from '../dom/disableCell';
import pipeline from '../helper';
import { addClickListener, extractCell } from './EnemyCell';
import basicCell from './basicCell';

const PCEnemyCell = pipeline(
  basicCell,
  addClickListener,
  disableCell,
  extractCell
);

export default PCEnemyCell;
