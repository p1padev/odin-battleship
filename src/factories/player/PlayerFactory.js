import GameboardFactory from '../gameboard/GameboardFactory';
import basicPlayer from './basicPlayer';
import computerPlayer from './computerPlayer';

const createBaseState = (playerName, DOMBoardReference) => ({
  playerName,
  playerBoard: DOMBoardReference,
  boardController: GameboardFactory(),
  isAttacking: false,
  isComputer: false,
  isFacingComputer: false,
});

export const PlayerFactory = ({
  playerName = 'Anonymous',
  DOMBoardReference = null,
} = {}) => {
  const state = createBaseState(playerName, DOMBoardReference);
  return {
    ...basicPlayer(state),
  };
};

export const ComputerFactory = ({
  DOMBoardReference = null,
  enemyDOMBoardReference = null,
} = {}) => {
  const state = {
    ...createBaseState('Computer', DOMBoardReference),
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
