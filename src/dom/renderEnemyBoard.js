import pipeline from '../helper';
import createEnemyBoard from './createEnemyBoard';
import insertBoard from './insertBoard';
import organizePlayerData from './organizePlayerData';

const renderEnemyBoard = pipeline(
  organizePlayerData,
  createEnemyBoard,
  insertBoard
);

export default renderEnemyBoard;
