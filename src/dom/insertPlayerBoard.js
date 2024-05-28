import boardComponent from '../components/boardComponent';

const insertPlayerBoard = (player) => {
  const board = boardComponent(player);
  const DOMSelector = player.getDOMBoardRef();
  DOMSelector.appendChild(board);
};

export default insertPlayerBoard;
