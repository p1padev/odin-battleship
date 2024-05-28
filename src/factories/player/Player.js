import GameboardFactory from '../gameboard/GameboardFactory';

const PlayerFactory = ({
  playerName = 'Anonymous',
  isComputer = false,
} = {}) => {
  let DOMBoardRef;

  const boardController = GameboardFactory();
  const getName = () => (isComputer ? 'Computer' : playerName);
  const getBoard = () => boardController.getBoard();
  const getController = () => boardController;
  const setDOMBoardRef = (reference) => {
    DOMBoardRef = reference;
  };
  const getDOMBoardRef = () => DOMBoardRef;

  return {
    getBoard,
    getController,
    getName,
    getDOMBoardRef,
    setDOMBoardRef,
  };
};

export default PlayerFactory;
