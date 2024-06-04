import basicBoard from '../components/basicBoard';
import handlePlayerCell from './handlePlayerCell';

const createPlayerBoard = ({ boardController, ...args }) => {
  const board = basicBoard(boardController, handlePlayerCell);
  board.classList.add('player');
  return { board, ...args };
};

export default createPlayerBoard;
