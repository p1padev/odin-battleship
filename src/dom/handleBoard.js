import { clearChildren } from '../helper';
import createBoard from './createBoard';

const handleBoard = (player) => {
  const DOMBoardRef = player.getBoardRef();
  const isAttacking = player.isAttacking();
  const boardController = player.getController();
  const board = createBoard(boardController, isAttacking);
  clearChildren(DOMBoardRef);
  DOMBoardRef.appendChild(board);
};

export default handleBoard;
