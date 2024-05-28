import GameboardFactory from '../gameboard/GameboardFactory';

const PlayerFactory = ({
  playerName = 'Anonymous',
  isComputer = false,
} = {}) => {
  const boardController = GameboardFactory();
  const { board } = boardController;
  const getName = () => (isComputer ? 'Computer' : playerName);
  const getBoard = () => board;
  const getController = () => boardController;

  return {
    getBoard,
    getController,
    getName,
  };
};

export default PlayerFactory;
