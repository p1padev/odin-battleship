import GameboardFactory from '../gameboard/GameboardFactory';
import basicPlayer from './basicPlayer';
import computerPlayer from './computerPlayer';

const createBaseState = (playerName, DOMBoard, isFacingComputer) => ({
  playerName,
  playerBoard: DOMBoard,
  boardController: GameboardFactory(),
  isAttacking: false,
  isComputer: false,
  isFacingComputer,
});

export const PlayerFactory = ({
  playerName = 'Anonymous',
  DOMBoard = null,
  isFacingComputer = false,
} = {}) => {
  const state = createBaseState(playerName, DOMBoard, isFacingComputer);
  return {
    ...basicPlayer(state),
  };
};

export const ComputerFactory = ({
  playerName = 'Computer',
  DOMBoard = null,
  enemyDOMBoard = null,
  isFacingComputer = false,
} = {}) => {
  const state = {
    ...createBaseState(playerName, DOMBoard, isFacingComputer),
    isComputer: true,
    computerShots: [],
    enemyBoard: enemyDOMBoard,
  };
  return {
    ...basicPlayer(state),
    ...computerPlayer(state),
  };
};

export default PlayerFactory;
