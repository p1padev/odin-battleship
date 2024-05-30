import boardComponent from '../../components/boardComponent';
import { clearChildren } from '../../helper';
import GameboardFactory from '../gameboard/GameboardFactory';

const PlayerFactory = ({
  playerName = 'Anonymous',
  isComputer = false,
} = {}) => {
  let DOMBoardRef;

  const boardController = GameboardFactory();
  const getName = () => (isComputer ? 'Computer' : playerName);
  const getBoard = () => boardController.getBoard();
  const getController = () => boardController;
  const setDOMBoardRef = (reference) => {
    DOMBoardRef = reference;
  };

  const setupBoard = (isAttacking) => {
    const board = boardComponent(boardController, isAttacking);
    board.classList.add(isAttacking ? 'player' : 'enemy');
    clearChildren(DOMBoardRef);
    DOMBoardRef.appendChild(board);
  };

  return {
    getBoard,
    getController,
    getName,
    setDOMBoardRef,
    setupBoard,
  };
};

export default PlayerFactory;
