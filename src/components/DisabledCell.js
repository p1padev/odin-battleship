import disableCell from '../dom/disableCell';
import pipeline from '../helper';
import { extractCell } from './EnemyCell';
import basicCell from './basicCell';

const DisabledCell = pipeline(basicCell, disableCell, extractCell);

export default DisabledCell;
