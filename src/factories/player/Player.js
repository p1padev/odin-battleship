import GameboardFactory from '../gameboard/GameboardFactory';

const PlayerFactory = ({
  playerName = 'Anonymous',
  isComputer = false,
} = {}) => {
  const board = GameboardFactory();
  const getName = () => (isComputer ? 'Computer' : playerName);
  const getBoard = () => board;

  return {
    getBoard,
    getName,
  };
};

export default PlayerFactory;
