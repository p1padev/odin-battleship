import boardComponent from '../components/boardComponent';

const insertPlayerBoard = (player) => {
  player.getDOMBoardRef().appendChild(boardComponent(player.getBoard()));
};

export default insertPlayerBoard;
