import GameboardFactory from '../gameboard/GameboardFactory';
import basicPlayer from './basicPlayer';
import computerPlayer from './computerPlayer';

export const PlayerFactory = ({
  playerName = 'Anonymous',
  DOMBoardReference = null,
} = {}) => {
  const state = {
    playerName,
    playerBoard: DOMBoardReference,
    boardController: GameboardFactory(),
    isAttacking: false,
    isComputer: false,
  };
  return {
    ...basicPlayer(state),
  };
};

export const ComputerFactory = ({
  DOMBoardReference = null,
  enemyDOMBoardReference = null,
} = {}) => {
  const state = {
    playerName: 'Computer',
    playerBoard: DOMBoardReference,
    boardController: GameboardFactory(),
    isAttacking: false,
    isComputer: true,
    computerShots: [],
    enemyBoard: enemyDOMBoardReference,
  };
  return {
    ...basicPlayer(state),
    ...computerPlayer(state),
  };
};

export default PlayerFactory;
