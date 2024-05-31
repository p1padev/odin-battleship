import boardComponent from '../components/boardComponent';

const createBoard = (boardController, isAttacking) => {
  const board = boardComponent(boardController, isAttacking);
  board.classList.add(isAttacking ? 'player' : 'enemy');
  return board;
};

export default createBoard;
