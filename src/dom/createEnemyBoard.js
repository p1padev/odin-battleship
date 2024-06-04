import basicBoard from '../components/basicBoard';
import handleEnemyCell from './handleEnemyCell';

const createEnemyBoard = ({ boardController, isFacingComputer, ...args }) => {
  const board = basicBoard(boardController, handleEnemyCell(isFacingComputer));
  board.classList.add('enemy');
  return { board, ...args };
};

export default createEnemyBoard;
