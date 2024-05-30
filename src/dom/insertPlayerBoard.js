import boardComponent from '../components/boardComponent';
import { clearChildren } from '../helper';

const setupBoard = (player, isEnemy) => {
  const board = boardComponent(player, isEnemy);
  board.classList.add(isEnemy ? 'enemy' : 'player');
  const domSelector = player.getDOMBoardRef();
  clearChildren(domSelector);
  domSelector.appendChild(board);
};

const insertPlayersBoard = (playerAttacking, enemyPlayer) => {
  setupBoard(playerAttacking, false);
  setupBoard(enemyPlayer, true);
};

export default insertPlayersBoard;
