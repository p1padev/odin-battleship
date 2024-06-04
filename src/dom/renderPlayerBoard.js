import pipeline from '../helper';
import createPlayerBoard from './createPlayerBoard';
import insertBoard from './insertBoard';
import organizePlayerData from './organizePlayerData';

const renderPlayerBoard = pipeline(
  organizePlayerData,
  createPlayerBoard,
  insertBoard
);

export default renderPlayerBoard;
