import basicBoard from '../components/basicBoard';
import createPlayerBoardCell from './createPlayerBoardCell';

const createPlayerBoard = ({ boardController, isComputer, ...rest }) => {
  const board = basicBoard(boardController, createPlayerBoardCell(isComputer));
  board.classList.add('player');
  return { board, ...rest };
};

export default createPlayerBoard;
