import basicBoard from '../components/basicBoard';
import createEnemyBoardCell from './createEnemyBoardCell';

const createEnemyBoard = ({ boardController, isFacingComputer, ...rest }) => {
  const board = basicBoard(
    boardController,
    createEnemyBoardCell(isFacingComputer)
  );

  board.classList.add('enemy');
  return { board, ...rest };
};

export default createEnemyBoard;
